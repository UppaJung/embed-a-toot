import { MediaAttachment, Status } from "./MastodonApiV1Entities";
import { ObservableComputation, ObservableValue } from "./Observable";
import { fetchStatus } from "./fetchFromMastodonApi";

// @ts-ignore:
import templateHtml from "./tootTemplate.html?raw"; // with { type: "text/plain" };
// @ts-ignore:
import templateCss from "./tootTemplate.css?raw"; // with { type: "text/plain" };
import { emojifyHtml } from "./emojifyHtml";

const KnownMediaTypes = [
	"image", //  Static image
	"gifv", //  Looping, soundless animation
	"video", //  Video clip
	"audio" //  Audio track
] as const;
type KnownMediaType = (typeof KnownMediaTypes)[number];

// Support for the HTML Sanitizer API (not yet supported by Safari/FireFox)
// https://wicg.github.io/sanitizer-api/
// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API
declare global {
	class Sanitizer {
	}
	interface SetHTMLOptions {
		sanitizer: Sanitizer
	}
	interface Element {
		setHTML(input: string, options?: SetHTMLOptions): void;
	}
}

const elementIds = [
	"tootUrlTextInput",
	"embeddedCssContainer",
	"embeddedHtmlContainer",
	"embeddedTootContainer",
	"embeddedScriptContainer",
	"tootScript",
	"tootStyle",
] as const;

const addValuesToTemplate = (template: string, keyValuePairs: Record<string, string>) => {
	let result = template;
	Object.entries(keyValuePairs).forEach( ([key, value]) => {
		result = result.replaceAll(`{{${key}}}`, value)
	});
	return result;
}

const textAreaSelectAndCopyOnClick = (textAreaElement: HTMLTextAreaElement) => {
	textAreaElement.addEventListener('click', () => {
		textAreaElement.setSelectionRange(0, -1);
		const blob = new Blob([textAreaElement.value], { type: "text/plain" });
		const data = [new ClipboardItem({ ["text/plain"]: blob })];
		navigator.clipboard.write(data);
	})
}

class IndexPage {
	elements: Record<(typeof elementIds)[number], HTMLElement>

	statusCache = new Map<string, Status | undefined>();
	observableStatusUrl: ObservableValue<string>;
	observableStatus = new ObservableValue<Status | undefined>(undefined);

	// favoritesLink = https://mastodon.social/@MildlyAggrievedScientist/111059248419599712/favourites
	onStatusUrlChange = async (
		statusUrlAtInstantOfEvent: string = (this.elements.tootUrlTextInput as HTMLInputElement).value
	) => {
		this.observableStatusUrl.value = statusUrlAtInstantOfEvent;
		if (!this.statusCache.has(statusUrlAtInstantOfEvent) && statusUrlAtInstantOfEvent.length > 0) {
			try {
				this.statusCache.set(statusUrlAtInstantOfEvent, undefined);
				const cachedStatus = await fetchStatus(statusUrlAtInstantOfEvent);
				this.statusCache.set(statusUrlAtInstantOfEvent, cachedStatus);	
			} catch {}
		}
		this.observableStatus.value = this.statusCache.get(this.observableStatusUrl.value);
	}

	html = new ObservableComputation( (): string => {
		const status = this.observableStatus.value;
		if (status == null) return "";
		return addValuesToTemplate(templateHtml, {
			authorLink: `${status.account.url}`,
			authorUserName: status.account.username,
			authorServer: new URL(status.account.url).hostname,
			authorName: emojifyHtml(status.account.display_name, status.account.emojis),
			avatarUrl: `${status.account.avatar}`,
			contentHtml: emojifyHtml(status.content, status.emojis) + this.previews.value,
			dateTimeIso: new Date(status.created_at).toISOString(),
			dateTimeText: new Date(status.created_at).toLocaleString(undefined, {
				month: "short", day: "numeric", year: "numeric",
				hour: "numeric", minute: "2-digit"
			}),
			favoritesLink: `${status.url}/favourites`,
			reblogsLink: `${status.url}/reblogs`,
			favoritesCount: `${status.favourites_count}`,
			reblogsCount: `${status.reblogs_count}`,
		});
	});

	mediaAttachments = new ObservableComputation( (): (MediaAttachment & {type: KnownMediaType | "unknown"})[] => {
		return (this.observableStatus.value?.media_attachments ?? []) as (MediaAttachment & {type: KnownMediaType | "unknown"})[];;
	})
	hasVideos =  new ObservableComputation( () =>
		this.mediaAttachments.value.find( ma => ma.type === "gifv" || ma.type === "video") != null
	);

	previews = new ObservableComputation( (): string => {
		const status = this.observableStatus.value;
		console.log('media attachments', status?.media_attachments);
		if (status == null) return "";
		const mediaAttachments = status.media_attachments as (MediaAttachment & {type: KnownMediaType | "unknown"})[];
		return mediaAttachments.map( (ma) => {
			switch (ma.type) {
				case "image": return `<img class="fediverse-attachment" src="${ma.url}" />`;
				case "gifv": return `<video class="fediverse-attachment" role="application" src="${ma.url}" playsinline autoplay loop></video>`;
				case "video": return `<video class="fediverse-attachment" role="application" controls src="${ma.url}" playsinline autoplay loop></video>`;
				case "audio": return ``;
			}
			return;
		}).join("");
	});

	script = new ObservableComputation( () => {
		if (!this.hasVideos) return "";
		return `document.addEventListener('DOMContentLoaded', () => {
			document.querySelectorAll(".fediverse-status video").forEach( (video) => { video.play().catch( () => {} ) });
		});
		`;
	});


	constructor() {
		this.elements = elementIds.reduce((elements, elementId) => {
			elements[elementId] = document.getElementById(elementId) ?? (() => {throw new Error(`Missing element with id ${elementId}`)})();
			return elements;
		}, {} as Record<(typeof elementIds)[number], HTMLElement>);
		this.elements.tootUrlTextInput.addEventListener('change', () => this.onStatusUrlChange());
		this.elements.tootUrlTextInput.addEventListener('paste', (e) => this.onStatusUrlChange(e.clipboardData?.getData('text')));
		this.observableStatusUrl = new ObservableValue<string>("")
		this.elements.embeddedCssContainer.textContent = templateCss; //.replaceAll("\n","");
		this.script.listen( script => {
			this.elements.embeddedScriptContainer.innerText = script;
			this.elements.tootScript.replaceChildren(document.createTextNode(script));
		})
		this.html.listen( html => {
			this.elements.embeddedTootContainer.innerHTML = html;
			this.elements.embeddedHtmlContainer.textContent = html;
			this.elements.tootStyle.replaceChildren(document.createTextNode(templateCss));
			document.querySelectorAll(".fediverse-status video").forEach( (video) => { (video as HTMLVideoElement).play().catch( e => {
				console.log(`could not play`, e);
			})});
		});
		this.onStatusUrlChange();
		textAreaSelectAndCopyOnClick(this.elements.embeddedHtmlContainer as HTMLTextAreaElement);
		textAreaSelectAndCopyOnClick(this.elements.embeddedCssContainer as HTMLTextAreaElement);
		textAreaSelectAndCopyOnClick(this.elements.embeddedScriptContainer as HTMLTextAreaElement);
	}
}


document.addEventListener('DOMContentLoaded', () => {new IndexPage()});