import { useSlateStatic } from "slate-react";
import { insertImage, isImageUrl } from "../utils/image";
import { Button } from "./Button";
import ImageIcon from "@mui/icons-material/Image";

export const InsertImageButton = () => {
  const editor = useSlateStatic();
  return (
    <Button
      reversed={false}
      active={false}
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the image:");
        if (url && !isImageUrl(url)) {
          alert("URL is not an image");
          return;
        }
        insertImage(editor, url!);
      }}
    >
      <ImageIcon />
    </Button>
  );
};
