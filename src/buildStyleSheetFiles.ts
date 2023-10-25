import {StyleSheets, styleSheetNameToFileName} from "./style-sheets";
import {writeFileSync} from "fs";

Object.entries(StyleSheets).forEach( ([name, css]) =>
	writeFileSync(`./public/${styleSheetNameToFileName(name)}`, css)
);