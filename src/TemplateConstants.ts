export const TemplateDataKeyList = [
	"authorLink",
	"authorName",
	"authorUserName",
	"avatarUrl",
	"contentHtml",
	"dateTimeIso",
	"editedDateTimeIso",
	"dateTimeText",
	"displayNoneIfNotEdited",
	"editedDateTimeText",
	"favoritesCount",
	"favoritesLink",
	"optionAttributes",
	"reblogsLink",
	"repliesLink",
	"reblogsCount",
	"repliesCount",
	"server",
	"statusId",
] as const;
export type TemplateDataKey = NonNullable<typeof TemplateDataKeyList[number]>;
export const TemplateDataKey = TemplateDataKeyList.reduce( (tk, k) => {
	tk[k] = `{{${k}}}` as `{{${typeof tk[typeof k]}}}`;
	return tk;
}, {} as Record<TemplateDataKey, string>) as {readonly [key in TemplateDataKey]: `{{${key}}}`};

export const TemplateClass = {
	fediverseStatus: "fediverse-status",
	emoji: "emoji",
	fediverseAttachment: "fediverse-attachment",
	authorsAvatar: "authors-avatar",
	authorsAvatarLink: "authors-avatar-link",
	counterFavourites: "counter-favourites",
	counterReblogs: "counter-reblogs",
	counterReplies: "counter-replies",
	editTime: "edit-time",
	postAuthor: "post-author",
	postAuthorsDisplayName: "post-authors-display-name",
	postAuthorsFediverseIdentity: "post-authors-fediverse-identity",
	postAuthorsFediverseUsername: "post-authors-fediverse-username",
	postAuthorsFediverseServer: "post-authors-fediverse-server",
	postTime: "post-time",
	atSymbol: "at-symbol",
	usernameAtSymbol: "username-at-symbol",
	serverAtSymbol: "server-at-symbol",
 } as const;
export type TemplateClass = NonNullable<keyof typeof TemplateClass>;
