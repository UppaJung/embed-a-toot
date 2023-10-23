import { updateEmbeddedPosts } from "./updateEmbeddedPosts"

let updateInProgress = false;
let updateAgainCompletionOfInProgress = true;
/**
 * Call update-embedded-posts if there are changes to elements that load in posts (toots)
 * 
 * If called when already in progress, it queues up at most one future run in case any
 * DOM changes were missed during the current run.
 */
const updateEmbeddedPostsSerial = () => {
	if (updateInProgress) {
		updateAgainCompletionOfInProgress = true;
		return;
	}
	do  {
		updateAgainCompletionOfInProgress = false;
		updateInProgress = true;
		updateEmbeddedPosts().finally( () => {
			updateInProgress = false;
		});
	} while (updateAgainCompletionOfInProgress);
}

document.addEventListener('DOMContentLoaded', () => {
	updateEmbeddedPostsSerial();

	// Listen for any Toots added by code after the DOM content was loaded
	new MutationObserver(updateEmbeddedPostsSerial)
		.observe(document.body, {
			childList: true,
			attributeFilter: ["data-mastodon-host", "data-status", "data-update-counters", "data-update-content"]
		})
})
