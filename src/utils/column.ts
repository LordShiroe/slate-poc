import { Editor, Element, Transforms } from "slate";
import { ColumnGroupElement, CustomElement, ImageElement } from "../types";
import { ELEMENT_TYPE } from "../types/ELEMENT_TYPE";

// TODO: this plugin breaks if you delete the image. It needs to ensure it *always* has an empty paragraph in that case.
export const withColumns = (editor: Editor) => {
  const { isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === ELEMENT_TYPE.COLUMN_GROUP ? false : isVoid(element);
  };

  return editor;
};

// TODO: make sure you can't a group inside a group
export const insertImageTextRow = (editor: Editor) => {
  const text = { text: "" };
  const image: ImageElement = { type: ELEMENT_TYPE.IMAGE, url: "https://via.placeholder.com/150", children: [text] };
  const paragraph: CustomElement = { type: ELEMENT_TYPE.PARAGRAPH, children: [{ text: "hello" }] };
  const imageParagraph: CustomElement = { type: ELEMENT_TYPE.PARAGRAPH, children: [image] };
  const group: ColumnGroupElement = {
    type: ELEMENT_TYPE.COLUMN_GROUP,
    children: [
      { type: ELEMENT_TYPE.COLUMN_ELEMENT, position: "left", children: [imageParagraph] },
      { type: ELEMENT_TYPE.COLUMN_ELEMENT, position: "right", children: [paragraph] },
    ],
  };
  Transforms.insertNodes(editor, group);
};

export const isGroupActive = (editor: Editor) => {
  const [button] = Editor.nodes(editor, {
    match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === ELEMENT_TYPE.COLUMN_GROUP,
  });
  return !!button;
};
