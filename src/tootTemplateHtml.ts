import {TemplateDataKey, TemplateClass} from "./TemplateConstants";

const html = String.raw;
export const templateHtml = html`
<article class="${TemplateClass.fediverseStatus}" data-mastodon-host="${TemplateDataKey.server}" data-status="${TemplateDataKey.statusId}" data-created-by="https://github.com/UppaJung/embed-a-toot;v${TemplateDataKey.embedATootVersion};${TemplateDataKey.whenEmbedGeneratedDateTimeIso}"${TemplateDataKey.optionAttributes}>
	<header>
		<a href="${TemplateDataKey.authorLink}" rel="external nofollow" title="view profile at @${TemplateDataKey.authorUserName}@${TemplateDataKey.server}" class="${TemplateClass.authorsAvatarLink}">
			<picture class="${TemplateClass.authorsAvatar}">
				<source srcset="${TemplateDataKey.avatarUrl}" media="(prefers-reduced-motion: no-preference)"/>
				<img src="${TemplateDataKey.avatarUrl}" alt="@${TemplateDataKey.authorUserName}@${TemplateDataKey.server} avatar" class="${TemplateClass.authorsAvatar}"/>
			</picture>
		</a>
		<div class="${TemplateClass.postAuthor}">
			<span class="${TemplateClass.postAuthorsDisplayName}">${TemplateDataKey.authorName}</span>
				<a href="${TemplateDataKey.authorLink}" title="@${TemplateDataKey.authorUserName}@${TemplateDataKey.server}" rel="external nofollow" class="${TemplateClass.postAuthorsFediverseIdentity}">
					<span class="${TemplateClass.atSymbol} ${TemplateClass.usernameAtSymbol}">@</span>
					<span class="${TemplateClass.postAuthorsFediverseUsername}">${TemplateDataKey.authorUserName}</span>
					<span class="${TemplateClass.atSymbol} ${TemplateClass.serverAtSymbol}">@</span><span class="${TemplateClass.postAuthorsFediverseServer}">${TemplateDataKey.server}</span>
				</a>
		</div>
	</header>
	<main>${TemplateDataKey.contentHtml}</main>
	<footer>
		<time datetime="${TemplateDataKey.dateTimeIso}" class="${TemplateClass.postTime}">${TemplateDataKey.dateTimeText}</time>
		<time ${TemplateDataKey.displayNoneIfNotEdited} datetime="${TemplateDataKey.editedDateTimeIso}" class="${TemplateClass.editTime}">edited at ${TemplateDataKey.editedDateTimeText}</time>
		<a href="${TemplateDataKey.favoritesLink}" title="favourites" class="${TemplateClass.counterFavourites}">${TemplateDataKey.favoritesCount}</a>
		<a href="${TemplateDataKey.reblogsLink}" title="reblogs" class="${TemplateClass.counterReblogs}">${TemplateDataKey.reblogsCount}</a>
		<a href="${TemplateDataKey.repliesLink}" title="replies" class="${TemplateClass.counterReplies}">${TemplateDataKey.repliesCount}</a>
	</footer>
</article>
`.trim();