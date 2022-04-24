import { HTMLAttributes } from "react";
import styled from "styled-components";
import { ColumnGroupElement } from "../types";

type Props = {
  attributes: HTMLAttributes<HTMLDivElement>;
  children: any;
  element: ColumnGroupElement;
};

const GroupContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;

const GroupElement = styled.div`
  padding: 0 0.5rem;
`;

// TODO: Fix DOM nest validation p > div
export const Group = ({ attributes, children, element }: Props) => {
  return (
    <GroupContainer {...attributes}>
      <GroupElement>{children[0]}</GroupElement>
      <GroupElement>{children[1]}</GroupElement>
    </GroupContainer>
  );
};
