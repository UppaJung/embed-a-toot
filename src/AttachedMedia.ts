import type { MediaAttachment, Status } from "./MastodonApiV1Entities";
import { TemplateClass } from "./TemplateConstants";

const KnownMediaTypes = [
	"image", //  Static image
	"gifv", //  Looping, soundless animation
	"video", //  Video clip
	"audio" //  Audio track
] as const;
export type KnownMediaType = (typeof KnownMediaTypes)[number];

export const renderMediaPreviews = (status: Status) => {
	const mediaAttachments = status.media_attachments as (MediaAttachment & { type: KnownMediaType | "unknown"; })[];
	return mediaAttachments.map((ma) => {
		switch (ma.type) {
			case "image": return `<img class="${TemplateClass.fediverseAttachment}" src="${encodeURI(ma.url)}" alt="${encodeURIComponent(ma.description)}" />`;
			case "gifv": return `<video class="${TemplateClass.fediverseAttachment}" video" alt="${encodeURIComponent(ma.description)}" role="application" src="${encodeURI(ma.url)}" controls playsinline autoplay loop></video>`;
			case "video": return `<video class="${TemplateClass.fediverseAttachment}" gifv" alt="${encodeURIComponent(ma.description)}" role="application" src="${encodeURI(ma.url)}" controls playsinline autoplay loop></video>`;
			case "audio": return ``;
		}
		return;
	}).join("");
};
