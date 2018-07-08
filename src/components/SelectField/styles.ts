import styled, { StyledFunction } from "styled-components";

interface IContainer {
  inline?: boolean;
}
interface IselectContainer {
  error?: string;
}

const div: StyledFunction<IContainer & React.HTMLProps<HTMLInputElement>> = styled.div;
const label: StyledFunction<IContainer & React.HTMLProps<HTMLInputElement>> = styled.label;
const select: StyledFunction<IselectContainer & React.HTMLProps<HTMLInputElement>> = styled.select;

export const Wrapper = div`
  display: flex;
  flex-grow: 1;
  flex-direction: ${p => (p.inline ? "row" : "column")};
  align-items: flex-start;
  margin-bottom: 0.8em;
`;

export const Label = label`
  display: flex;
  flex-grow: 3;
  flex-basis: ${p => (p.inline ? 0 : 1)};;
  margin-bottom: 5px;
  font-size: 14px;
  color: #444;
  padding-top: 5px;
`;

export const InputGroup = div`
  display: flex;
  flex-grow: 5;
  flex-basis: ${p => (p.inline ? 0 : 1)};;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  width: ${p => (p.inline ? "unset" : "100%")};
  margin: 1px 0;
`;

export const Select = select`
  border: 1px solid;
  border-radius: 3.01px;
  border-color: ${p => (p.error && p.error !== "" ? "#ef5350" : "#ccc")}
  box-sizing: border-box;
  font-size: 0.9em;
  margin: 0;
  vertical-align: baseline;
  width: 100%;
  padding: 8px 8px;
  background-color: transparent;
`;

export const OptionPlaceholder = styled.span`
  color: #888;
`;

export const ErrorMsg = styled.p`
  clear: both;
  color: #ef5350;
  display: block;
  font-size: 1.1em;
  margin: 5px 0 0;
  font-size: 13px;
`;
