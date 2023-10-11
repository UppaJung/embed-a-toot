import type { Status } from "./MastodonApiV1Entities.js";

export interface StatusQuery {
	host: string;
	status: string;
}

export interface ContextResponseJson {
	ancestors: Status[];
	descendants: Status[];
}

// Should take query of the form:
// https://mastodon.social/@MildlyAggrievedScientist/110826278791052494
// So that users can just paste URLs
export const urlToStatusQuery = (statusUrl: string): StatusQuery => {
	const { host, pathname } = new URL(statusUrl);
	const status = pathname.split('/')[2] ?? ""; //.filter( s => s.length > 0 && !s.startsWith('@') );
	return { host, status };
};

const fetchJson = async <T>(...args: Parameters<typeof fetch>): Promise<T> => {
	const response = await fetch(...args);
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return (await response.json()) as T;
};
export const fetchStatus = (urlOrStatusQuery: StatusQuery | string) => {
	const { host, status } = (typeof urlOrStatusQuery === "string") ?
		urlToStatusQuery(urlOrStatusQuery) :
		urlOrStatusQuery;
	return fetchJson<Status>(`https://${host}/api/v1/statuses/${status}, {});`);
}
