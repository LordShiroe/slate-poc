import isUrl from "is-url";
import { Editor, Element, Range, Transforms } from "slate";
import { CustomLink } from "../types";
import { ELEMENT_TYPE } from "../types/ELEMENT_TYPE";

export const withLink = (editor: Editor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) => ELEMENT_TYPE.LINK === element.type || isInline(element);

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

export const insertLink = (editor: Editor, url: string) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

export const isLinkActive = (editor: Editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) => !Editor.isEditor(n) && "type" in n && Element.isElement(n) && n.type === ELEMENT_TYPE.LINK,
  });
  return !!link;
};

const wrapLink = (editor: Editor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: CustomLink = {
    type: ELEMENT_TYPE.LINK,
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

export const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && Element.isElement(n) && "type" in n && n.type === "link",
  });
};
