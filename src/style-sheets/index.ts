import { boxed } from "./boxed";
import { shadesOfBlue } from "./shades-of-blue";

export const StyleSheets = {
	"Boxed": boxed,
	"Shades of Blue": shadesOfBlue,
} as const satisfies {[key: string]: string};

export const styleSheetNameToFileName = (styleSheetName: string) =>
	styleSheetName.toLocaleLowerCase().replaceAll(' ','-') + ".css";

export type StyleSheetName = keyof typeof StyleSheets;
export const StyleSheetNames = Object.keys(StyleSheets) as StyleSheetName[];
