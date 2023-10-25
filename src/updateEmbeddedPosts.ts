import { renderMediaPreviews } from "./AttachedMedia";
import { Status } from "./MastodonApiV1Entities";
import { TemplateClass } from "./TemplateConstants";
import { emojifyHtml } from "./emojifyHtml";
import { fetchStatus } from "./fetchFromMastodonApi";

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

interface DataToUpdate {
	counters: boolean;
	content: boolean;
}

const updateEmbeddedPost = (
	postsOutermostElement: Element,
	dataToUpdate: DataToUpdate,
	status: Status,
) => {
	const contentMainElement = postsOutermostElement.querySelector(`main`);
	const counterReblogsElement = postsOutermostElement.querySelector(`.${TemplateClass.counterReblogs}`);
	const counterRepliesElement = postsOutermostElement.querySelector(`.${TemplateClass.counterReplies}`);
	const counterFavouritesElement = postsOutermostElement.querySelector(`.${TemplateClass.counterFavourites}`);
	const editedDateTimeElement = postsOutermostElement.querySelector(`.${TemplateClass.editTime}`) as HTMLTimeElement;
	if (dataToUpdate.content && contentMainElement && "setHTML" in contentMainElement) {
		contentMainElement.setHTML(
			emojifyHtml(status.content, status.emojis) +
			renderMediaPreviews(status)
		);
		if (status.edited_at && editedDateTimeElement) {
			editedDateTimeElement.removeAttribute('display');
			const editedAtDate = new Date(status.edited_at);
			editedDateTimeElement.dateTime = editedAtDate.toISOString();
			editedDateTimeElement.textContent = editedAtDate.toLocaleString(undefined, {
				month: "short", day: "numeric", year: "numeric",
				hour: "numeric", minute: "2-digit"
			});

		}
	}
	if (dataToUpdate.counters) {
		if (counterReblogsElement != null) {
			counterReblogsElement.textContent = `${status.reblogs_count}`;
		}
		if (counterFavouritesElement != null) {
			counterFavouritesElement.textContent = `${status.favourites_count}`;
		}
		if (counterRepliesElement != null) {
			counterRepliesElement.textContent = `${status.replies_count}`;
		}
	}
}

export const updateEmbeddedPosts = () => {
	return Promise.allSettled(
		[...document.querySelectorAll('[data-mastodon-host][data-status]')]
		.map( async (postsOutermostElement) => {
		if (postsOutermostElement instanceof HTMLElement) {
			const {mastodonHost, status, update, updateContent, updateCounters} = postsOutermostElement.dataset as {
				mastodonHost: string;
				status: string;
				update?: string;
				updateCounters?: string;
				updateContent?: string;
				secondsUntilRefresh?: string; // FIXME TODO
			};
			const dataToUpdate: DataToUpdate = {
				counters: update != null || updateCounters != null,
				content: update != null || updateContent != null,
			};
			if (dataToUpdate.content || dataToUpdate.counters) {
				const statusObj = await fetchStatus({host: mastodonHost, status}, {
					headers: {
						"Request-Purpose": "update rendered post on the referring page",
						"Request-Module": `https://github.com/UppaJung/embed-a-toot v${__VERSION__}`,
					}
				});
				updateEmbeddedPost(postsOutermostElement, dataToUpdate, statusObj );
			};
		}
	}));
}
