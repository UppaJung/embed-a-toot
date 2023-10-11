// Short & simple observable computations similar to mobx
// 2023-10-05

const computationStack: ObservableComputation<any>[] = [];
const computationsRequiringRecalculation = new Set<ObservableComputation<any>>();

let alreadyRecomputingInvalidatedValues = false;
const recomputeInvalidatedValues = () => {
	if (!alreadyRecomputingInvalidatedValues) {
		try {
			alreadyRecomputingInvalidatedValues = true;
			while (computationsRequiringRecalculation.size > 0) {
				const [computation] = [...computationsRequiringRecalculation];
				computation?.compute();
			}
		} finally {
			alreadyRecomputingInvalidatedValues = false;
		}
	}
}


abstract class Observable<T> {
	#changeHandlers = new Set<(newValue: T, oldValue: T | undefined) => void>;
	#dependentComputations = new Set<ObservableComputation<unknown>>();

	abstract value: T;

	#addDependentComputations = (...dependentComputations: ObservableComputation<unknown>[]) => {
		for (const dependentComputation of dependentComputations) {
			this.#dependentComputations.add(dependentComputation);
		}
	}

	protected callBeforeGetValue = () => {
		const [topOfComputationStack] = computationStack;
		if (topOfComputationStack != null) {
			this.#addDependentComputations(topOfComputationStack);
		}
	}

	protected callAfterSetChangesValue = (newValue: T, oldValue: T | undefined) => {
		for (const dependentComputation of this.#dependentComputations) {
			dependentComputation.invalidate();
		}
		this.#signalChange(newValue, oldValue);
		recomputeInvalidatedValues();
	}

	#signalChange = (newValue: T, oldValue: T | undefined) => {
		for (const changeHandler of this.#changeHandlers) {
			try {
				changeHandler(newValue, oldValue);
			} catch {}
		}
	}

	onChange = (listener: (newValue: T, oldValue: T | undefined) => void) => this.#changeHandlers.add(listener);

	listen = (listener: (newValue: T, oldValue: T | undefined) => void) => {
		this.onChange(listener);
		listener(this.value, this.value);
	}

	constructor() {
	}
}

export class ObservableHTMLInputElementValue<T extends string = string> extends Observable<T> {
	#element: HTMLInputElement;
	#cachedValue: T | undefined;

	get value(): T {
		this.callBeforeGetValue();
		return this.#element.value as T;
	}

	set value(newValue: T) {
		const oldValue = this.#element.value as T;
		if (newValue !== oldValue) {
			this.#element.value = this.#cachedValue = newValue;
			this.callAfterSetChangesValue(newValue, oldValue);
		}
	}

	#changeListener = () => {
		const oldValue = this.#cachedValue;
		this.#cachedValue = this.#element.value as T;
		this.callAfterSetChangesValue(this.#element.value as T, oldValue);
	}

	constructor({initialValue, element}:{
		element: HTMLInputElement,
		initialValue?: T
	}) {
		super();
		this.#element = element;
		if (initialValue != null) {
			this.#element.value = initialValue;
		}
		this.#element.addEventListener('input', () => this.#changeListener() );
		this.#element.addEventListener('change', () => this.#changeListener() );
	}
}

export class ObservableValue<T> extends Observable<T> {
	#value: T;

	get value(): T {
		this.callBeforeGetValue();
		return this.#value;
	}

	set value(newValue: T) {
		const oldValue = this.#value;
		if (oldValue !== newValue) {
			this.#value = newValue;
			this.callAfterSetChangesValue(newValue, oldValue);
		}
	}

	constructor(initialValue: T) {
		super();
		this.#value = initialValue;
	}
}

export class ObservableComputation<T> extends Observable<T> {
	#cachedResult: T | undefined;
	#valid = false;

	get valid(): boolean {
		return !this.#valid;
	}

	invalidate() {
		this.#valid = false;
		computationsRequiringRecalculation.add(this);
	}

	compute = () => {
		const oldValue = this.#cachedResult;
		computationStack.unshift(this);
		let newResult: T | undefined;
		try {
			this.#cachedResult = newResult = this.#computation();
			this.#valid = true;
			return newResult;
		} finally {
			computationStack.shift();
			computationsRequiringRecalculation.delete(this);
			if (this.#valid && newResult !== oldValue) {
				this.callAfterSetChangesValue(newResult!, oldValue!);
			}
		}
	}

	get value(): T {
		this.callBeforeGetValue();
		if (this.#valid) {
			return this.#cachedResult!;
		} else {
			return this.compute();
		}
	}

	#computation: () => T;

	constructor(computation: () => T, computeImmediately: boolean = false) {
		super();
		this.#computation = computation;
		if (computeImmediately) {
			this.compute();
		}
	}
}

