import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Editor, Range } from "slate";
import { useFocused, useSlate } from "slate-react";
import styled from "styled-components";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import { FormatButton } from "./FormatButton";
import { InsertLinkButton, RemoveLinkButton } from "./InsertLinkButton";

const Menu = styled.div`
  padding: 8px 7px 6px;
  position: absolute;
  z-index: 1;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  opacity: 0;
  background-color: #222;
  border-radius: 4px;
  transition: opacity 0.75s;
  display: flex;
  flex-flow: row;
`;

export const HoveringToolbar = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const editor = useSlate();
  const inFocus = useFocused();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (!selection || !inFocus || Range.isCollapsed(selection) || Editor.string(editor, selection) === "") {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection?.getRangeAt(0);
    const rect = domRange?.getBoundingClientRect() ?? { top: 0, left: 0, width: 0 };
    el.style.opacity = "1";
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`;
  });

  return ReactDOM.createPortal(
    <Menu
      ref={ref}
      onMouseDown={(e: React.SyntheticEvent) => {
        // prevent toolbar from taking focus away from editor
        e.preventDefault();
      }}
    >
      <FormatButton format="bold" Icon={FormatBoldIcon} />
      <FormatButton format="italic" Icon={FormatItalicIcon} />
      <FormatButton format="underlined" Icon={FormatUnderlinedIcon} />
      <InsertLinkButton />
      <RemoveLinkButton />
    </Menu>,
    document.body
  );
};
