import { TemplateClass } from "../TemplateConstants";
const css = String.raw;

const maxWidthOfPost = `min(80vw, 40rem)` as const;
const paddingEachEdge = `0.25rem` as const;
const maxWidthInsidePadding = `calc(${maxWidthOfPost} - 2 * ${paddingEachEdge})` as const;

export const boxed = css`
.${TemplateClass.fediverseStatus} {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	max-width: ${maxWidthOfPost};
	border-radius: 0.5rem;
	border-width: 1px;
	border-color: rgba(128, 128, 128, 1);
	border-style: solid;
	box-sizing: content-box;
	margin-left: auto;
  margin-right: auto;
	margin-bottom: 1rem;
}

.${TemplateClass.fediverseStatus}::before, .${TemplateClass.fediverseStatus}::after {
	box-sizing: content-box;
}
/*
 Emoji in user display names and image content are converted to images,
 which should be rendered at the same size (height) as the content.
 Those are both 1rem high, so we limit the height of emoji to 1rem.
*/
.${TemplateClass.fediverseStatus} .${TemplateClass.emoji} {
	max-height: 1rem;
}

.${TemplateClass.fediverseStatus} header, .${TemplateClass.fediverseStatus} footer, .${TemplateClass.fediverseStatus} main {
	box-sizing: content-box;
	padding-left: ${paddingEachEdge};
	padding-right: ${paddingEachEdge};
	width: 100%;
}

.${TemplateClass.fediverseStatus} header, .${TemplateClass.fediverseStatus} footer {
	padding-top: ${paddingEachEdge};
}


/*
	Common traits of both the header and the footer of a status.
*/
.${TemplateClass.fediverseStatus} header, .${TemplateClass.fediverseStatus} footer {
	background-color: rgba(128, 128, 128, 0.1);
	/* data placed in a row */
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	/* separated by small gaps */
	gap: .5rem;
}
/* Links within headers and footers should not be underlined */
.${TemplateClass.fediverseStatus} header a, .${TemplateClass.fediverseStatus} footer a {
	text-decoration: none;
	box-shadow: none;
	justify-content: flex-start;
}

.${TemplateClass.fediverseStatus} header a {
	color: inherit;
}

.${TemplateClass.fediverseStatus} footer {
	/* footer content is less critical, so in a smaller font */
	align-items: baseline;
	font-size: 0.75rem;
}

.${TemplateClass.fediverseStatus} main {
	/* background-color: rgba(128, 128, 128, 0.05); */
	/* pad left to align with header/footer content, but do not pad right (go to edge) */
	/* pad top and bottom */
	padding-top: ${paddingEachEdge};
	padding-bottom: ${paddingEachEdge};
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
	height: 3rem;
	border-radius: 1.5rem;
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
	color: inherit;
	margin-inline-end: .25em;          
}

.${TemplateClass.fediverseStatus} footer .${TemplateClass.counterReblogs}::before {
	/* copied from Mastodon website */
	content: "🔁";
	margin-inline-end: .25em;
	max-height: 0.75rem;
}

.${TemplateClass.fediverseStatus} footer .${TemplateClass.counterReplies}::before {
	content: "💬";
	color: inherit;
	margin-inline-end: .25em;          
}

/**
	Center attached media and scale down to size of toot
*/
.${TemplateClass.fediverseStatus} .${TemplateClass.fediverseAttachment} {
	max-width: ${maxWidthOfPost};
	object-fit: contain;
	box-sizing: content-box;
	border-radius: 0;
	margin: 0;
	padding-top: 0.5rem;
	display: block;
  margin-left: auto;
  margin-right: auto;
	width: 100%;
}

`.trim();
