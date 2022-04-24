// TypeScript users only add this code
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { ELEMENT_TYPE } from "./types/ELEMENT_TYPE";

type CustomText = { text: string; bold?: boolean; italic?: boolean; underlined?: boolean };
type CustomLink = { type: ELEMENT_TYPE.LINK; url: string; children: CustomText[] };
type CustomButton = { type: ELEMENT_TYPE.BUTTON; children: CustomText[] };
type ImageElement = { type: ELEMENT_TYPE.IMAGE; url: string; children: [CustomText] };
type BaseColumnElement = { type: COLUMN_ELEMENT; children: [CustomElement] };
type ColumnLeftElement = BaseColumnElement & { position: "left" };
type ColumnRightElement = BaseColumnElement & { position: "right" };
type ColumnGroupElement = { type: ELEMENT_TYPE.COLUMN_GROUP; children: [ColumnLeftElement, ColumnRightElement] };
type ChildrentTypes = Array<CustomText | CustomLink | CustomButton | ImageElement | CustomElement>;
type CustomElement = { type: ELEMENT_TYPE.PARAGRAPH; children: ChildrentTypes };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement | ImageElement | CustomButton | CustomLink | ColumnGroupElement;
    Text: CustomText;
  }
}
