// TypeScript users only add this code
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

type CustomText = { text: string; bold?: boolean; italic?: boolean; underlined?: boolean };
type CustomElement = { type: "paragraph"; children: CustomText[] };
type ImageElement = { type: "image"; url: string; children: [CustomText] };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement | ImageElement;
    Text: CustomText;
  }
}
