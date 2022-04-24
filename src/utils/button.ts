import { Editor, Element, Range, Transforms } from "slate";
import { CustomButton } from "../types";
import { ELEMENT_TYPE } from "../types/ELEMENT_TYPE";

export const withButton = (editor: Editor) => {
  const { isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === ELEMENT_TYPE.BUTTON ? true : isVoid(element);
  };

  return editor;
};

export const insertButton = (editor: Editor) => {
  if (editor.selection) {
    wrapButton(editor);
  }
};

export const isButtonActive = (editor: Editor) => {
  const [button] = Editor.nodes(editor, {
    match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === ELEMENT_TYPE.BUTTON,
  });
  return !!button;
};

const unwrapButton = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === ELEMENT_TYPE.BUTTON,
  });
};

const wrapButton = (editor: Editor) => {
  if (isButtonActive(editor)) {
    unwrapButton(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const button: CustomButton = {
    type: ELEMENT_TYPE.BUTTON,
    children: isCollapsed ? [{ text: "Edit me!" }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, button);
  } else {
    Transforms.wrapNodes(editor, button, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};
