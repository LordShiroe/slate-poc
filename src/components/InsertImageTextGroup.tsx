import { SyntheticEvent } from "react";
import { useSlate } from "slate-react";
import { Button } from "./Button";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import { insertImageTextRow, isGroupActive } from "../utils/column";

export const InsertImageTextGroup = () => {
  const editor = useSlate();
  return (
    <Button
      reversed={false}
      active
      onMouseDown={(event: SyntheticEvent) => {
        event.preventDefault();
        if (!isGroupActive(editor)) {
          insertImageTextRow(editor);
        }
      }}
    >
      <ViewColumnIcon />
    </Button>
  );
};
