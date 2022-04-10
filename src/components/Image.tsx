import { DeleteForever } from "@mui/icons-material";
import { HTMLAttributes, ReactChild } from "react";
import { Transforms } from "slate";
import { ReactEditor, useFocused, useSelected, useSlateStatic } from "slate-react";
import styled from "styled-components";
import { ImageElement } from "../types";
import { Button } from "./Button";

type Props = {
  attributes: HTMLAttributes<HTMLDivElement>;
  children: ReactChild;
  element: ImageElement;
};

const Block = styled.div`
  position: relative;
`;

const Img = styled.img`
  display: block;
  max-width: 100%;
  max-height: 20em;
  box-shadow: ${(props: { selected: boolean; focused: boolean }) =>
    props.selected && props.focused ? "0 0 0 3px #B4D5FF" : "none"};
`;

const FloatingButton = styled(Button)`
  display: ${(props: { selected: boolean; focused: boolean }) => (props.selected && props.focused ? "inline" : "none")};
  position: absolute;
  top: 0.5em;
  left: 0.5em;
  background-color: white;
`;

export const Image = ({ attributes, children, element }: Props) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      {children}
      <Block contentEditable={false}>
        <Img src={element.url} selected={selected} focused={focused} />
        <FloatingButton
          active
          reversed={false}
          onClick={() => Transforms.removeNodes(editor, { at: path })}
          selected={selected}
          focused={focused}
        >
          <DeleteForever />
        </FloatingButton>
      </Block>
    </div>
  );
};
