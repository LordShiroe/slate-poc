import { HTMLAttributes, ReactChild } from "react";
import { useSelected } from "slate-react";
import styled from "styled-components";
import { CustomLink } from "../types";

const FixSpan = styled.span`
  font-size: 0;
`;

const LinkElement = styled.a`
  box-shadow: ${(props: { selected: boolean }) => (props.selected ? "box-shadow: 0 0 0 3px #ddd;" : "none")};
`;

// Put this at the start and end of an inline component to work around this Chromium bug:
// https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
const InlineChromiumBugfix = () => (
  <FixSpan contentEditable={false}>${String.fromCodePoint(160) /* Non-breaking space */}</FixSpan>
);

type Props = {
  attributes: HTMLAttributes<HTMLAnchorElement>;
  children: ReactChild;
  element: CustomLink;
};

export const Link = ({ attributes, children, element }: Props) => {
  const selected = useSelected();
  return (
    <LinkElement {...attributes} selected={selected} href={element.url}>
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
    </LinkElement>
  );
};
