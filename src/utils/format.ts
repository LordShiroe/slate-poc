import { Editor, Transforms, Text } from "slate";

export type Format = Exclude<keyof Text, "text">;

export const toggleFormat = (editor: Editor, format: Format) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(editor, { [format]: isActive ? null : true }, { match: Text.isText, split: true });
};

export const isFormatActive = (editor: Editor, format: Format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => format in n && "text" in n && n[format] === true, // makes it understand is a Text type
    mode: "all",
  });
  return !!match;
};
