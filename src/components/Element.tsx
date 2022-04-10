import { HTMLAttributes, ReactChild } from "react";
import { CustomElement, ImageElement } from "../types";
import { Image } from "./Image";

type Props = {
  attributes: HTMLAttributes<unknown>;
  children: ReactChild;
  element: ImageElement | CustomElement;
};
export const Element = (props: Props) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case "image":
      return <Image {...props} element={element as ImageElement} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};
