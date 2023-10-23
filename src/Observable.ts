// Short & simple observables similar to mobx
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

export interface Observable<T> {
	onChange: (listener: (newValue: T, oldValue: T | undefined) => void) => void;
	listen: (listener: (newValue: T, oldValue: T | undefined) => void) => void;
	value: T;
}

abstract class ObservableBase<T> implements Observable<T> {
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

export class ObservableHTMLInputElementValue<T extends string = string> extends ObservableBase<T> {
	readonly #element: HTMLInputElement;

	/**
	 * Returns the HTMLInputElement that is being observed.
	 * 
	 * Since the value of that element should always be read and written to
	 * using this class, we hide the value field from the element so that
	 * callers do not accidentally read or write it directly, which could
	 * lead to the value changing without being observed.
	 */
	get element() { return this.#element as Omit<HTMLInputElement, "value">}
	#cachedValue: T | undefined;

	get value(): T {
		this.callBeforeGetValue();
		return this.#element.value as T;
	}

	set value(newValue: T) {
		const oldValue = this.#element.value as T;
		if (this.#name != null) {
			console.log(`Update ${this.#name}`, newValue, oldValue);
		}
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

	readonly #name?: string;
	constructor({initialValue, element}:{
		element: HTMLInputElement,
		initialValue?: T
	}, name?: string) {
		super();
		this.#name = name;
		this.#element = element;
		if (initialValue != null) {
			this.#element.value = initialValue;
		}
		this.#element.addEventListener('input', () => this.#changeListener() );
		this.#element.addEventListener('change', () => this.#changeListener() );
		this.#element.addEventListener('paste', () => this.#changeListener() );
	}
}

export class ObservableHTMLInputCheckboxElementValue extends ObservableBase<boolean> {
	readonly #element: HTMLInputElement;

	/**
	 * Returns the HTMLInputElement that is being observed.
	 * 
	 * Since the value of that element should always be read and written to
	 * using this class, we hide the value field from the element so that
	 * callers do not accidentally read or write it directly, which could
	 * lead to the value changing without being observed.
	 */
	get element() { return this.#element as Omit<HTMLInputElement, "value">}
	#cachedValue: boolean;

	get value(): boolean {
		this.callBeforeGetValue();
		return this.#element.checked;
	}

	set value(newValue: boolean) {
		const oldValue = this.#element.checked;
		if (this.#name != null) {
			console.log(`Update ${this.#name}`, newValue, oldValue);
		}
		if (newValue !== oldValue) {
			this.#element.checked = this.#cachedValue = newValue;
			this.callAfterSetChangesValue(newValue, oldValue);
		}
	}

	#changeListener = () => {
		const oldValue = this.#cachedValue;
		this.#cachedValue = this.#element.checked;
		this.callAfterSetChangesValue(this.#element.checked, oldValue);
	}

	readonly #name?: string;
	constructor({initialValue, element}:{
		element: HTMLInputElement,
		initialValue?: boolean
	}, name?: string) {
		super();
		this.#name = name;
		this.#element = element;
		if (initialValue != null) {
			this.#element.checked = initialValue;
		}
		this.#cachedValue = this.#element.checked;
		this.#element.addEventListener('change', () => this.#changeListener() );
	}
}

export class ObservableValue<T> extends ObservableBase<T> {
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

export class ObservableComputation<T> extends ObservableBase<T> {
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
			if (this.logAs != null) {
				console.log(`Computed ${this.logAs}`, newResult)
			}
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

	constructor(computation: () => T, protected logAs?: string) {
		super();
		this.#computation = computation;
	}
}
