import { HTMLAttributes, ReactChild } from "react";
import { Text } from "slate";
import styled from "styled-components";

// The following is a workaround for a Chromium bug where,
// if you have an inline at the end of a block,
// clicking the end of a block puts the cursor inside the inline
// instead of inside the final {text: ''} node
// https://github.com/ianstormtaylor/slate/issues/4704#issuecomment-1006696364
const Span = styled.span`
  padding-left: ${(props: { hasText: boolean }) => (props.hasText ? "0.1px;" : "0")};
`;

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

  return (
    <Span {...attributes} hasText={!!leaf.text}>
      {children}
    </Span>
  );
};
