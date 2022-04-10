import { useSlate } from "slate-react";
import { Format, isFormatActive, toggleFormat } from "../utils/format";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import { Button } from "./Button";

type Props = {
  format: Format;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
};

export const FormatButton = ({ format, Icon }: Props) => {
  const editor = useSlate();
  return (
    <Button reversed active={isFormatActive(editor, format)} onClick={() => toggleFormat(editor, format)}>
      <Icon />
    </Button>
  );
};
