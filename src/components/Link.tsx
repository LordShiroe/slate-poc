import { HTMLAttributes, ReactChild } from "react";
import { useSelected } from "slate-react";
import styled from "styled-components";
import { CustomLink } from "../types";
import { InlineChromiumBugfix } from "./InlineChromiumBugfix";

const LinkElement = styled.a`
  box-shadow: ${(props: { selected: boolean }) => (props.selected ? "box-shadow: 0 0 0 3px #ddd;" : "none")};
`;

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
