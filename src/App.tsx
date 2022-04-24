import { isKeyHotkey } from "is-hotkey";
import React, { useCallback, useMemo } from "react";
// Import the Slate editor factory.
import { createEditor, Descendant, Range, Transforms } from "slate";
import { withHistory } from "slate-history";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";
import styled from "styled-components";
import { Element } from "./components/Element";
import { HoveringToolbar } from "./components/FloatingToolbar";
import { ToggleEditableButtonButton } from "./components/InsertButtonButton";
import { InsertImageButton } from "./components/InsertImageButton";
import { InsertImageTextGroup } from "./components/InsertImageTextGroup";
import { Leaf } from "./components/Leaf";
import { Toolbar } from "./components/Toolbar";
import { ELEMENT_TYPE } from "./types/ELEMENT_TYPE";
import { withColumns } from "./utils/column";
import { toggleFormat } from "./utils/format";
import { withImages } from "./utils/image";
import { withLink } from "./utils/link";

const initialValue: Descendant[] = [
  {
    type: ELEMENT_TYPE.PARAGRAPH,
    children: [
      {
        text: "This example shows how you can make a hovering menu appear above your content, which you can use to make text ",
      },
      { text: "bold", bold: true },
      { text: ", " },
      { text: "italic", italic: true },
      { text: ", or anything else you might want to do! " },
      {
        type: ELEMENT_TYPE.LINK,
        url: "https://en.wikipedia.org/wiki/Hypertext",
        children: [{ text: "hyperlink" }],
      },
    ],
  },
  {
    type: ELEMENT_TYPE.IMAGE,
    url: "https://source.unsplash.com/kFrdX5IeQzI",
    children: [{ text: "" }],
  },
  {
    type: ELEMENT_TYPE.PARAGRAPH,
    children: [
      { text: "Try it out yourself! Just " },
      { text: "select any piece of text and the menu will appear", bold: true },
      { text: "." },
    ],
  },
  {
    type: ELEMENT_TYPE.COLUMN_GROUP,
    children: [
      {
        type: ELEMENT_TYPE.COLUMN_ELEMENT,
        position: "left",
        children: [
          {
            type: ELEMENT_TYPE.PARAGRAPH,
            children: [{ text: "This is a column" }],
          },
        ],
      },
      {
        type: ELEMENT_TYPE.COLUMN_ELEMENT,
        position: "right",
        children: [
          {
            type: ELEMENT_TYPE.PARAGRAPH,
            children: [
              {
                type: ELEMENT_TYPE.IMAGE,
                url: "https://via.placeholder.com/150",
                children: [{ text: "" }],
              },
            ],
          },
        ],
      },
    ],
  },
];

const Container = styled.div`
  margin: 10vw;
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 0.5rem;
  moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
`;

// disable the context menu so android shows the toolbar
window.oncontextmenu = function (event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};
function App() {
  const editor = useMemo(() => withColumns(withLink(withImages(withHistory(withReact(createEditor()))))), []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const renderElement = useCallback((props) => <Element {...props} />, []);

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    const { selection } = editor;

    // Default left/right behavior is unit:'character'.
    // This fails to distinguish between two cursor positions, such as
    // <inline>foo<cursor/></inline> vs <inline>foo</inline><cursor/>.
    // Here we modify the behavior to unit:'offset'.
    // This lets the user step into and out of the inline without stepping over characters.
    // You may wish to customize this further to only use unit:'offset' in specific cases.
    if (selection && Range.isCollapsed(selection)) {
      const { nativeEvent } = event;
      if (isKeyHotkey("left", nativeEvent)) {
        event.preventDefault();
        Transforms.move(editor, { unit: "offset", reverse: true });
        return;
      }
      if (isKeyHotkey("right", nativeEvent)) {
        event.preventDefault();
        Transforms.move(editor, { unit: "offset" });
        return;
      }
    }
  };

  return (
    <Container>
      <Slate editor={editor} value={initialValue}>
        <Toolbar>
          <InsertImageButton />
          <ToggleEditableButtonButton />
          <InsertImageTextGroup />
        </Toolbar>
        <HoveringToolbar />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some text..."
          onKeyDown={onKeyDown}
          onDOMBeforeInput={(event: InputEvent) => {
            switch (event.inputType) {
              case "formatBold":
                event.preventDefault();
                return toggleFormat(editor, "bold");
              case "formatItalic":
                event.preventDefault();
                return toggleFormat(editor, "italic");
              case "formatUnderline":
                event.preventDefault();
                return toggleFormat(editor, "underlined");
            }
          }}
        />
      </Slate>
    </Container>
  );
}

export default App;
