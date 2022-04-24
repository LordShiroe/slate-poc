import { HTMLAttributes, ReactChild } from "react";
import styled from "styled-components";
import { InlineChromiumBugfix } from "./InlineChromiumBugfix";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.div`
  margin: 0 0.1em;
  background-color: #efefef;
  padding: 2px 6px;
  border: 1px solid #767676;
  border-radius: 2px;
  font-size: 0.9em;
`;

type Props = {
  attributes: HTMLAttributes<HTMLDivElement>;
  children: ReactChild;
};

export const EditableButton = ({ attributes, children }: Props) => {
  return (
    <ButtonContainer {...attributes}>
      <Button onClick={(ev) => ev.preventDefault()}>
        <InlineChromiumBugfix />
        {children}
        <InlineChromiumBugfix />
      </Button>
    </ButtonContainer>
  );
};
