import type { MediaAttachment, Status } from "./MastodonApiV1Entities";
import { ObservableComputation, ObservableHTMLInputCheckboxElementValue, ObservableHTMLInputElementValue, ObservableValue } from "./Observable";
import { fetchStatus } from "./fetchFromMastodonApi";
import DOMPurify from 'dompurify';

import {templateHtml} from "./tootTemplateHtml";
import { emojifyHtml } from "./emojifyHtml";
import { TemplateDataKey } from "./TemplateConstants";
import updatedEmbeddedPostsJs from "../public/updated-embedded-posts.js?raw";
import { KnownMediaType, renderMediaPreviews } from "./AttachedMedia";
import { StyleSheetName, StyleSheetNames, StyleSheets, styleSheetNameToFileName } from "./style-sheets";

type HtmlFormattingPreference = "none" | "spaces2" | "spaces4" | "tabs";

const elementIds = [
	"downloadCssLink",
	"embeddedCssContainer",
	"embeddedHtmlContainer",
	"embeddedScriptContainer",
	"embeddedScriptContainerBlock",
	"embeddedTootContainer",
	"htmlFormatting",
	"noContentUpdates",
	"noCounterUpdates",
	"selectStyleSheet",
	"tootScript",
	"tootStyle",
	"tootUrlTextInput",
] as const;

const addValuesToTemplate = (template: string, keyValuePairs: Record<string, string>) => {
	let result = template;
	Object.entries(keyValuePairs).forEach( ([key, value]) => {
		result = result.replaceAll(`{{${key}}}`, DOMPurify.sanitize(value))
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

	htmlFormattingPreference: ObservableHTMLInputElementValue<HtmlFormattingPreference>;
	noContentUpdates: ObservableHTMLInputCheckboxElementValue;
	noCounterUpdates: ObservableHTMLInputCheckboxElementValue;
	selectStyleSheet: ObservableHTMLInputElementValue<StyleSheetName>;

	onStatusUrlChange = async (
		statusUrlAtInstantOfEvent: string = (this.elements.tootUrlTextInput as HTMLInputElement).value
	) => {
		this.observableStatusUrl.value = statusUrlAtInstantOfEvent;
		if (!this.statusCache.has(statusUrlAtInstantOfEvent) && statusUrlAtInstantOfEvent.length > 0) {
			try {
				this.statusCache.set(statusUrlAtInstantOfEvent, undefined);
				const cachedStatus = await fetchStatus(statusUrlAtInstantOfEvent, {
					headers: {
						"Request-Purpose": "generate html to embed this post onto a webpage",
						"Request-Module": `https://github.com/UppaJung/embed-a-toot v${__VERSION__}`,
					}
				});
				this.statusCache.set(statusUrlAtInstantOfEvent, cachedStatus);	
			} catch {}
		}
		this.observableStatus.value = this.statusCache.get(this.observableStatusUrl.value);
	}

	optionAttributes = new ObservableComputation( (): string =>
		(this.noCounterUpdates.value ? "" : " data-update-counters") + 
		(this.noContentUpdates.value ? "" : " data-update-content")
	)


	unformattedHtml = new ObservableComputation( (): string => {
		const status = this.observableStatus.value;
		if (status == null) return "";
		return addValuesToTemplate(templateHtml, {
			attachedMedia: this.attachedMedia.value,
			authorLink: status.account.url,
			authorUserName: status.account.username,
			optionAttributes: this.optionAttributes.value,
			server: new URL(status.account.url).hostname,
			statusId: status.id,
			authorName: emojifyHtml(status.account.display_name, status.account.emojis),
			avatarUrl: status.account.avatar,
			contentHtml: emojifyHtml(status.content, status.emojis),
			dateTimeIso: new Date(status.created_at).toISOString(),
			dateTimeText: new Date(status.created_at).toLocaleString(undefined, {
				month: "short", day: "numeric", year: "numeric",
				hour: "numeric", minute: "2-digit"
			}),
			displayNoneIfNotEdited: status.edited_at == null ? `display="none"` : "",
			editedDateTimeIso: status.edited_at == null ? "" :
				new Date(status.edited_at).toISOString(),
			editedDateTimeText: status.edited_at == null ? "" :
				new Date(status.edited_at).toLocaleString(undefined, {
					month: "short", day: "numeric", year: "numeric",
					hour: "numeric", minute: "2-digit"
				}),
			embedATootVersion: __VERSION__,
			favoritesLink: `${status.url}/favourites`,
			reblogsLink: `${status.url}/reblogs`,
			repliesLink: `${status.url}`,
			favoritesCount: `${status.favourites_count}`,
			repliesCount: `${status.replies_count}`,
			reblogsCount: `${status.reblogs_count}`,
			whenEmbedGeneratedDateTimeIso: new Date().toISOString(),
		} satisfies Record<TemplateDataKey, string>);
	});
	
	html = new ObservableComputation( (): string => {
		const html = this.unformattedHtml.value;
		switch (this.htmlFormattingPreference.value) {
			case "none":
				return html.replaceAll("\t","").replaceAll("\n","");
			case "spaces2":
				return html.replaceAll("\t","  ");
			case "spaces4":
				return html.replaceAll("\t","    ");
			default:
				return html;
		}
	});

	styleSheetCss = new ObservableComputation( () =>
		StyleSheets[this.selectStyleSheet.value]
	)

	needsJavaScript = new ObservableComputation( (): boolean =>
		!(this.noContentUpdates.value && this.noCounterUpdates.value)
	)

	mediaAttachments = new ObservableComputation( (): (MediaAttachment & {type: KnownMediaType | "unknown"})[] =>
		(this.observableStatus.value?.media_attachments ?? []) as (MediaAttachment & {type: KnownMediaType | "unknown"})[]
	);

	hasVideos =  new ObservableComputation( () =>
		this.mediaAttachments.value.find( ma => ma.type === "gifv" || ma.type === "video") != null
	);

	attachedMedia = new ObservableComputation( (): string =>
		this.observableStatus.value == null ? "" : renderMediaPreviews(this.observableStatus.value)
	);

	script = new ObservableComputation( (): string => {
		return updatedEmbeddedPostsJs
		// if (!this.hasVideos.value) return "";
		// return `document.addEventListener('DOMContentLoaded', () => {
		// 	document.querySelectorAll(".fediverse-status video").forEach( (video) => { video.play().catch( () => {} ) });
		// });
		// `;
	});


	constructor() {
		this.elements = elementIds.reduce((elements, elementId) => {
			elements[elementId] = document.getElementById(elementId) ?? (() => {throw new Error(`Missing element with id ${elementId}`)})();
			return elements;
		}, {} as Record<(typeof elementIds)[number], HTMLElement>);
		(this.elements.tootUrlTextInput as HTMLInputElement).value = (window.location.search
			.substring(1) // skip '?'
			.split('&')
			.map( pair => pair.split('='))
			.find( ([key]) => key === "toot") ?? ["", ""])
			[1];
		this.htmlFormattingPreference = new ObservableHTMLInputElementValue<HtmlFormattingPreference>({
			element: this.elements.htmlFormatting as HTMLInputElement,
			initialValue: "none"
		});
		this.selectStyleSheet = new ObservableHTMLInputElementValue<StyleSheetName>({
			element: this.elements.selectStyleSheet as HTMLInputElement,
			initialValue: StyleSheetNames[0]
		})
		this.noContentUpdates = new ObservableHTMLInputCheckboxElementValue({
			element: this.elements.noContentUpdates as HTMLInputElement,
			initialValue: false
		});
		this.noCounterUpdates = new ObservableHTMLInputCheckboxElementValue({
			element: this.elements.noCounterUpdates as HTMLInputElement,
			initialValue: false
		});
		this.elements.selectStyleSheet.innerHTML = StyleSheetNames.map( styleName =>
			`<option value="${styleName}">${styleName}</option>`	
		).join("");

		this.elements.tootUrlTextInput.addEventListener('change', () => this.onStatusUrlChange());
		this.elements.tootUrlTextInput.addEventListener('paste', (e) => this.onStatusUrlChange(e.clipboardData?.getData('text')));
		this.observableStatusUrl = new ObservableValue<string>("")
		this.script.listen( script => {
			this.elements.embeddedScriptContainerBlock.style.visibility = (script.length === 0) ? 'hidden' : 'visible';
			this.elements.embeddedScriptContainer.innerText = script;
			this.elements.tootScript.replaceChildren(document.createTextNode(script));
		})
		this.html.listen( html => {
			this.elements.embeddedTootContainer.innerHTML = html;
			this.elements.embeddedHtmlContainer.textContent = html;
			this.elements.tootStyle.replaceChildren(document.createTextNode(this.styleSheetCss.value));
			// document.querySelectorAll(".fediverse-status video").forEach( (video) => { (video as HTMLVideoElement).play().catch( e => {
			// 	console.log(`could not play`, e);
			// })});
		});
		this.selectStyleSheet.listen( styleSheetName => {
			const fileName = styleSheetNameToFileName(styleSheetName);
			this.elements.downloadCssLink.setAttribute('href', fileName);
			this.elements.downloadCssLink.textContent = fileName;
		})
		this.styleSheetCss.listen( css => {
			this.elements.embeddedCssContainer.textContent = css;
			this.elements.tootStyle.replaceChildren(document.createTextNode(css));
		})
		this.needsJavaScript.listen( needsJs => {
			if (needsJs) {
				this.elements.embeddedScriptContainer.removeAttribute('disabled');
			} else {
				console.log('disabling');
				this.elements.embeddedScriptContainer.setAttribute('disabled', '');
			}
		})
		this.onStatusUrlChange();
		textAreaSelectAndCopyOnClick(this.elements.embeddedHtmlContainer as HTMLTextAreaElement);
		textAreaSelectAndCopyOnClick(this.elements.embeddedCssContainer as HTMLTextAreaElement);
		textAreaSelectAndCopyOnClick(this.elements.embeddedScriptContainer as HTMLTextAreaElement);
	}
}


document.addEventListener('DOMContentLoaded', () => {new IndexPage()});