import styled from "styled-components";

export const Button = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  color: ${(props: { reversed: boolean; active: boolean }) =>
    props.reversed ? (props.active ? "white" : "#aaa") : props.active ? "black" : "#ccc"};
`;
