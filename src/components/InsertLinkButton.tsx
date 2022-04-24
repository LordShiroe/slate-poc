import { SyntheticEvent } from "react";
import { useSlate } from "slate-react";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import { insertLink, isLinkActive, unwrapLink } from "../utils/link";
import { Button } from "./Button";

export const InsertLinkButton = () => {
  const editor = useSlate();
  return (
    <Button
      reversed={false}
      active={isLinkActive(editor)}
      onMouseDown={(event: SyntheticEvent) => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the link:");
        if (!url) return;
        insertLink(editor, url);
      }}
    >
      <LinkIcon />
    </Button>
  );
};

export const RemoveLinkButton = () => {
  const editor = useSlate();

  return (
    <Button
      reversed={false}
      active={isLinkActive(editor)}
      onMouseDown={() => {
        if (isLinkActive(editor)) {
          unwrapLink(editor);
        }
      }}
    >
      <LinkOffIcon />
    </Button>
  );
};
