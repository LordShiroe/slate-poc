import { SyntheticEvent } from "react";
import { useSlate } from "slate-react";
import { insertButton, isButtonActive } from "../utils/button";
import { Button } from "./Button";
import ButtonIcon from "@mui/icons-material/SmartButton";

export const ToggleEditableButtonButton = () => {
  const editor = useSlate();
  return (
    <Button
      reversed={false}
      active
      onMouseDown={(event: SyntheticEvent) => {
        event.preventDefault();
        if (!isButtonActive(editor)) {
          insertButton(editor);
        }
      }}
    >
      <ButtonIcon />
    </Button>
  );
};
