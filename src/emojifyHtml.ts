import type { CustomEmoji } from "./MastodonApiV1Entities.js";

export const emojifyHtml = (html: string, emojis: CustomEmoji[]): string => {
	let emojifiedHtml = html;
	emojis.forEach(emoji => {

		const source = document.createElement("source");
		source.setAttribute("srcset", emoji.url);
		source.setAttribute("media", "(prefers-reduced-motion: no-preference)");

		const img = document.createElement("img");
		img.classList.add("emoji");
		img.setAttribute("src", emoji.static_url);
		img.setAttribute("alt", `:${emoji.shortcode}:`);
		img.setAttribute("title", `:${emoji.shortcode}:`);

		const picture = document.createElement("picture");
		picture.classList.add("emoji");
		picture.appendChild(source);
		picture.append(img);

		emojifiedHtml = emojifiedHtml.replace(`:${emoji.shortcode}:`, picture.outerHTML);
	});
	return emojifiedHtml;
};
