import { TemplateClass } from "../TemplateConstants";
const css = String.raw;

export const shadesOfBlue = css`
.${TemplateClass.fediverseStatus} {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	max-width: 80vw;
}

/*
 Emoji in user display names and image content are converted to images,
 which should be rendered at the same size (height) as the content.
 Those are both 1rem high, so we limit the height of emoji to 1rem.
*/
.${TemplateClass.fediverseStatus} .${TemplateClass.emoji} {
	max-height: 1rem;
}

.${TemplateClass.fediverseStatus} .${TemplateClass.fediverseAttachment} {
	max-width: calc(80vw - 2rem);
}

/*
	Common traits of both the header and the footer of a status.
*/
.${TemplateClass.fediverseStatus} header, .${TemplateClass.fediverseStatus} footer {
	/* data placed in a row */
	display: flex;
	flex-direction: row;
	align-items: center;
	/* separated by small gaps */
	gap: .5rem;
	/* with padding on both sides */
	padding-left: 0.5rem;
	padding-right: 0.5rem;
	/* and a background color common to headers and footers */
	background-color: rgba(196, 196, 255, 0.25);
	/* Take up full width minus padding left/right */
	width: calc(100% - 1rem);
}
/* Links within headers and footers should not be underlined */
.${TemplateClass.fediverseStatus} header a, .${TemplateClass.fediverseStatus} footer a {
	text-decoration: none;
	box-shadow: none;
	justify-content: flex-start;
}

.${TemplateClass.fediverseStatus} footer {
	/* footer content is less critical, so in a smaller font */
	font-size: 0.75rem;
}

.${TemplateClass.fediverseStatus} main {
	/* background color less strong than header/footer */
	background-color: rgba(196, 196, 255, 0.125);
	/* pad left to align with header/footer content, but do not pad right (go to edge) */
	padding-left: 0.5rem;
	padding-right: 0.5rem;
	/* pad top and bottom */
	padding-top: 0.25rem;
	padding-bottom: 0.25rem;
}

/* use small margins for content */
.${TemplateClass.fediverseStatus} main p {
	margin: 0;
	margin-top: .25rem;
}
/* no need to separate the first paragraph from the non-existent ones above it */
.${TemplateClass.fediverseStatus} main p:first-child {
	margin-top: 0;
}

/*
	The avatar image representing the comment's author
*/
.${TemplateClass.fediverseStatus} header picture, .${TemplateClass.fediverseStatus} header img {
	/* restrict size by limiting height */
	max-height: 3rem;
}

.${TemplateClass.fediverseStatus} header .${TemplateClass.postAuthor} {
	/* put the display name above the fediverse id, with both formatted to the left margin */
	display: flex;
	flex-direction: column;
	align-items: start;
}

.${TemplateClass.fediverseStatus} .${TemplateClass.postAuthorsDisplayName} {
	/* Boldface the author's display name to make it salient */
	display: inline-flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
}

.${TemplateClass.fediverseStatus} header .${TemplateClass.postAuthorsFediverseIdentity} {
	/* create a card-appearance with a gentle background color and rounded corners */
	background-color: rgba(128,128,128, 0.125);
	border-radius: 0.5rem;
	padding-left: 0.5rem;
	padding-right: 0.5rem;
}

/* De-emphasize the parts of the author's identity other than their username */
.${TemplateClass.fediverseStatus} authors-fediverse-, .${TemplateClass.fediverseStatus} .at-symbol {
	color: rgba(128,128,128, 0.75)
}

.${TemplateClass.fediverseStatus} footer .${TemplateClass.counterFavourites}::before {
	content: "★";
	color: rgb(96 ,96 ,96 ,1);
	margin-inline-end: .25em;          
}

.${TemplateClass.fediverseStatus} footer .${TemplateClass.counterReblogs}::before {
	/* copied from Mastodon website */
	content: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='22' height='15'><path d='M4.97 3.16c-.1.03-.17.1-.22.18L.8 8.24c-.2.3.03.78.4.8H3.6v2.68c0 4.26-.55 3.62 3.66 3.62h7.66l-2.3-2.84c-.03-.02-.03-.04-.05-.06H7.27c-.44 0-.72-.3-.72-.72v-2.7h2.5c.37.03.63-.48.4-.77L5.5 3.35c-.12-.17-.34-.25-.53-.2zm12.16.43c-.55-.02-1.32.02-2.4.02H7.1l2.32 2.85.03.06h5.25c.42 0 .72.28.72.72v2.7h-2.5c-.36.02-.56.54-.3.8l3.92 4.9c.18.25.6.25.78 0l3.94-4.9c.26-.28 0-.83-.37-.8H18.4v-2.7c0-3.15.4-3.62-1.25-3.66z' fill='%23606984' stroke-width='0'/><path d='M7.78 19.66c-.24.02-.44.25-.44.5v2.46h-.06c-1.08 0-1.86-.03-2.4-.03-1.64 0-1.25.43-1.25 3.65v4.47c0 4.26-.56 3.62 3.65 3.62H8.5l-1.3-1.06c-.1-.08-.18-.2-.2-.3-.02-.17.06-.35.2-.45l1.33-1.1H7.28c-.44 0-.72-.3-.72-.7v-4.48c0-.44.28-.72.72-.72h.06v2.5c0 .38.54.63.82.38l4.9-3.93c.25-.18.25-.6 0-.78l-4.9-3.92c-.1-.1-.24-.14-.38-.12zm9.34 2.93c-.54-.02-1.3.02-2.4.02h-1.25l1.3 1.07c.1.07.18.2.2.33.02.16-.06.3-.2.4l-1.33 1.1h1.28c.42 0 .72.28.72.72v4.47c0 .42-.3.72-.72.72h-.1v-2.47c0-.3-.3-.53-.6-.47-.07 0-.14.05-.2.1l-4.9 3.93c-.26.18-.26.6 0 .78l4.9 3.92c.27.25.82 0 .8-.38v-2.5h.1c4.27 0 3.65.67 3.65-3.62v-4.47c0-3.15.4-3.62-1.25-3.66zM10.34 38.66c-.24.02-.44.25-.43.5v2.47H7.3c-1.08 0-1.86-.04-2.4-.04-1.64 0-1.25.43-1.25 3.65v4.47c0 3.66-.23 3.7 2.34 3.66l-1.34-1.1c-.1-.08-.18-.2-.2-.3 0-.17.07-.35.2-.45l1.96-1.6c-.03-.06-.04-.13-.04-.2v-4.48c0-.44.28-.72.72-.72H9.9v2.5c0 .36.5.6.8.38l4.93-3.93c.24-.18.24-.6 0-.78l-4.94-3.92c-.1-.08-.23-.13-.36-.12zm5.63 2.93l1.34 1.1c.1.07.18.2.2.33.02.16-.03.3-.16.4l-1.96 1.6c.02.07.06.13.06.22v4.47c0 .42-.3.72-.72.72h-2.66v-2.47c0-.3-.3-.53-.6-.47-.06.02-.12.05-.18.1l-4.94 3.93c-.24.18-.24.6 0 .78l4.94 3.92c.28.22.78-.02.78-.38v-2.5h2.66c4.27 0 3.65.67 3.65-3.62v-4.47c0-3.66.34-3.7-2.4-3.66zM13.06 57.66c-.23.03-.4.26-.4.5v2.47H7.28c-1.08 0-1.86-.04-2.4-.04-1.64 0-1.25.43-1.25 3.65v4.87l2.93-2.37v-2.5c0-.44.28-.72.72-.72h5.38v2.5c0 .36.5.6.78.38l4.94-3.93c.24-.18.24-.6 0-.78l-4.94-3.92c-.1-.1-.24-.14-.38-.12zm5.3 6.15l-2.92 2.4v2.52c0 .42-.3.72-.72.72h-5.4v-2.47c0-.3-.32-.53-.6-.47-.07.02-.13.05-.2.1L3.6 70.52c-.25.18-.25.6 0 .78l4.93 3.92c.28.22.78-.02.78-.38v-2.5h5.42c4.27 0 3.65.67 3.65-3.62v-4.47-.44zM19.25 78.8c-.1.03-.2.1-.28.17l-.9.9c-.44-.3-1.36-.25-3.35-.25H7.28c-1.08 0-1.86-.03-2.4-.03-1.64 0-1.25.43-1.25 3.65v.7l2.93.3v-1c0-.44.28-.72.72-.72h7.44c.2 0 .37.08.5.2l-1.8 1.8c-.25.26-.08.76.27.8l6.27.7c.28.03.56-.25.53-.53l-.7-6.25c0-.27-.3-.48-.55-.44zm-17.2 6.1c-.2.07-.36.3-.33.54l.7 6.25c.02.36.58.55.83.27l.8-.8c.02 0 .04-.02.04 0 .46.24 1.37.17 3.18.17h7.44c4.27 0 3.65.67 3.65-3.62v-.75l-2.93-.3v1.05c0 .42-.3.72-.72.72H7.28c-.15 0-.3-.03-.4-.1L8.8 86.4c.3-.24.1-.8-.27-.84l-6.28-.65h-.2zM4.88 98.6c-1.33 0-1.34.48-1.3 2.3l1.14-1.37c.08-.1.22-.17.34-.2.16 0 .34.08.44.2l1.66 2.03c.04 0 .07-.03.12-.03h7.44c.34 0 .57.2.65.5h-2.43c-.34.05-.53.52-.3.78l3.92 4.95c.18.24.6.24.78 0l3.94-4.94c.22-.27-.02-.76-.37-.77H18.4c.02-3.9.6-3.4-3.66-3.4H7.28c-1.08 0-1.86-.04-2.4-.04zm.15 2.46c-.1.03-.2.1-.28.2l-3.94 4.9c-.2.28.03.77.4.78H3.6c-.02 3.94-.45 3.4 3.66 3.4h7.44c3.65 0 3.74.3 3.7-2.25l-1.1 1.34c-.1.1-.2.17-.32.2-.16 0-.34-.08-.44-.2l-1.65-2.03c-.06.02-.1.04-.18.04H7.28c-.35 0-.57-.2-.66-.5h2.44c.37 0 .63-.5.4-.78l-3.96-4.9c-.1-.15-.3-.23-.47-.2zM4.88 117.6c-1.16 0-1.3.3-1.3 1.56l1.14-1.38c.08-.1.22-.14.34-.16.16 0 .34.04.44.16l2.22 2.75h7c.42 0 .72.28.72.72v.53h-2.6c-.3.1-.43.54-.2.78l3.92 4.9c.18.25.6.25.78 0l3.94-4.9c.22-.28-.02-.77-.37-.78H18.4v-.53c0-4.2.72-3.63-3.66-3.63H7.28c-1.08 0-1.86-.03-2.4-.03zm.1 1.74c-.1.03-.17.1-.23.16L.8 124.44c-.2.28.03.77.4.78H3.6v.5c0 4.26-.55 3.62 3.66 3.62h7.44c1.03 0 1.74.02 2.28 0-.16.02-.34-.03-.44-.15l-2.22-2.76H7.28c-.44 0-.72-.3-.72-.72v-.5h2.5c.37.02.63-.5.4-.78L5.5 119.5c-.12-.15-.34-.22-.53-.16zm12.02 10c1.2-.02 1.4-.25 1.4-1.53l-1.1 1.36c-.07.1-.17.17-.3.18zM5.94 136.6l2.37 2.93h6.42c.42 0 .72.28.72.72v1.25h-2.6c-.3.1-.43.54-.2.78l3.92 4.9c.18.25.6.25.78 0l3.94-4.9c.22-.28-.02-.77-.37-.78H18.4v-1.25c0-4.2.72-3.63-3.66-3.63H7.28c-.6 0-.92-.02-1.34-.03zm-1.72.06c-.4.08-.54.3-.6.75l.6-.74zm.84.93c-.12 0-.24.08-.3.18l-3.95 4.9c-.24.3 0 .83.4.82H3.6v1.22c0 4.26-.55 3.62 3.66 3.62h7.44c.63 0 .97.02 1.4.03l-2.37-2.93H7.28c-.44 0-.72-.3-.72-.72v-1.22h2.5c.4.04.67-.53.4-.8l-3.96-4.92c-.1-.13-.27-.2-.44-.2zm13.28 10.03l-.56.7c.36-.07.5-.3.56-.7zM17.13 155.6c-.55-.02-1.32.03-2.4.03h-8.2l2.38 2.9h5.82c.42 0 .72.28.72.72v1.97H12.9c-.32.06-.48.52-.28.78l3.94 4.94c.2.23.6.22.78-.03l3.94-4.9c.22-.28-.02-.77-.37-.78H18.4v-1.97c0-3.15.4-3.62-1.25-3.66zm-12.1.28c-.1.02-.2.1-.28.18l-3.94 4.9c-.2.3.03.78.4.8H3.6v1.96c0 4.26-.55 3.62 3.66 3.62h8.24l-2.36-2.9H7.28c-.44 0-.72-.3-.72-.72v-1.97h2.5c.37.02.63-.5.4-.78l-3.96-4.9c-.1-.15-.3-.22-.47-.2zM5.13 174.5c-.15 0-.3.07-.38.2L.8 179.6c-.24.27 0 .82.4.8H3.6v2.32c0 4.26-.55 3.62 3.66 3.62h7.94l-2.35-2.9h-5.6c-.43 0-.7-.3-.7-.72v-2.3h2.5c.38.03.66-.54.4-.83l-3.97-4.9c-.1-.13-.23-.2-.38-.2zm12 .1c-.55-.02-1.32.03-2.4.03H6.83l2.35 2.9h5.52c.42 0 .72.28.72.72v2.34h-2.6c-.3.1-.43.53-.2.78l3.92 4.9c.18.24.6.24.78 0l3.94-4.9c.22-.3-.02-.78-.37-.8H18.4v-2.33c0-3.15.4-3.62-1.25-3.66zM4.97 193.16c-.1.03-.17.1-.22.18l-3.94 4.9c-.2.3.03.78.4.8H3.6v2.68c0 4.26-.55 3.62 3.66 3.62h7.66l-2.3-2.84c-.03-.02-.03-.04-.05-.06H7.27c-.44 0-.72-.3-.72-.72v-2.7h2.5c.37.03.63-.48.4-.77l-3.96-4.9c-.12-.17-.34-.25-.53-.2zm12.16.43c-.55-.02-1.32.03-2.4.03H7.1l2.32 2.84.03.06h5.25c.42 0 .72.28.72.72v2.7h-2.5c-.36.02-.56.54-.3.8l3.92 4.9c.18.25.6.25.78 0l3.94-4.9c.26-.28 0-.83-.37-.8H18.4v-2.7c0-3.15.4-3.62-1.25-3.66z' fill='%238C8DFF' stroke-width='0'/></svg>");
	margin-inline-end: .25em;     
}
`.trim();