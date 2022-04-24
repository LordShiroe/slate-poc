import { HTMLAttributes, ReactChild } from "react";
import { Element as SlateElement } from "slate";
import { ColumnGroupElement, CustomLink, ImageElement } from "../types";
import { ELEMENT_TYPE } from "../types/ELEMENT_TYPE";
import { EditableButton } from "./EditableButton";
import { Group } from "./Group";
import { Image } from "./Image";
import { Link } from "./Link";

type Props = {
  attributes: HTMLAttributes<unknown>;
  children: ReactChild;
  element: SlateElement;
};
export const Element = (props: Props) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case ELEMENT_TYPE.IMAGE:
      return <Image {...props} element={element as ImageElement} />;
    case ELEMENT_TYPE.LINK:
      return <Link {...props} element={element as CustomLink} />;
    case ELEMENT_TYPE.BUTTON:
      return <EditableButton {...props} />;
    case ELEMENT_TYPE.COLUMN_GROUP:
      return <Group {...props} element={element as ColumnGroupElement} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};
