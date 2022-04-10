import { HTMLAttributes, ReactChild } from "react";
import { Text } from "slate";

type Props = {
  attributes: HTMLAttributes<HTMLSpanElement>;
  children: ReactChild;
  leaf: Text;
};

export const Leaf = ({ attributes, children, leaf }: Props) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underlined) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};
