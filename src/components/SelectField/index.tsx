import * as React from "react";

import { ErrorMsg, InputGroup, Label, Select, Wrapper } from "./styles";

interface IinputProps {
  type: string;
  placeholder?: string;
  name: string;
  inline?: boolean;
  label: string;
  error?: string;
  value: string;
  data: Array<{ label: string; value: string }>;
  onChange: (name: string, value: string) => void;
}

export default class InputField extends React.Component<IinputProps> {
  public static defaultProps = {
    inline: false
  };

  public render() {
    const { inline, label, error, value, placeholder, data } = this.props;
    return (
      <Wrapper inline={inline}>
        <Label inline={inline}>{label}</Label>
        <InputGroup inline={inline}>
          <Select
            placeholder={placeholder}
            value={value}
            onChange={this.handleOnChange}
            error={error}
          >
            {this.renderEmptyOption(placeholder)}
            {data.map(this.renderOptions)}
          </Select>
          {error && <ErrorMsg>{error}</ErrorMsg>}
        </InputGroup>
      </Wrapper>
    );
  }

  private renderEmptyOption = (placeholder: string = "Select a one Item") => {
    return (
      <option style={{ color: "#888" }} value="0" key="0">
        {placeholder}
      </option>
    );
  };

  private renderOptions = (item: { label: string; value: string }) => {
    return (
      <option value={item.value} key={item.value}>
        {item.label}
      </option>
    );
  };

  private handleOnChange = (e: React.FormEvent) => {
    const target = e.target as HTMLSelectElement;
    const value: string = target.value;
    const { onChange, name } = this.props;
    onChange(name, value);
  };
}
