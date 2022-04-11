import React, { useCallback, useMemo } from "react";
// Import the Slate editor factory.
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";
import styled from "styled-components";
import { Element } from "./components/Element";
import { HoveringToolbar } from "./components/FloatingToolbar";
import { InsertImageButton } from "./components/InsertImageButton";
import { Leaf } from "./components/Leaf";
import { Toolbar } from "./components/Toolbar";
import { toggleFormat } from "./utils/format";
import { withImages } from "./utils/image";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        text: "This example shows how you can make a hovering menu appear above your content, which you can use to make text ",
      },
      { text: "bold", bold: true },
      { text: ", " },
      { text: "italic", italic: true },
      { text: ", or anything else you might want to do!" },
    ],
  },
  {
    type: "image",
    url: "https://source.unsplash.com/kFrdX5IeQzI",
    children: [{ text: "" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "Try it out yourself! Just " },
      { text: "select any piece of text and the menu will appear", bold: true },
      { text: "." },
    ],
  },
];

const Container = styled.div`
  margin: 10rem;
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 0.5rem;
`;

function App() {
  const editor = useMemo(() => withImages(withHistory(withReact(createEditor()))), []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  return (
    <Container>
      <Slate editor={editor} value={initialValue}>
        <Toolbar>
          <InsertImageButton />
        </Toolbar>
        <HoveringToolbar />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some text..."
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
