import * as React from "react";

import { ErrorMsg, InputGroup, Label, Textarea, Wrapper } from "./styles";

interface ItextareaProps {
  type: string;
  placeholder?: string;
  name: string;
  inline?: boolean;
  label: string;
  error?: string;
  value: string;
  onChange: (name: string, value: string) => void;
}

export default class TextareaField extends React.Component<ItextareaProps> {
  public static defaultProps = {
    inline: false
  };

  public render() {
    const { inline, label, error, value, placeholder } = this.props;
    return (
      <Wrapper inline={inline}>
        <Label inline={inline}>{label}</Label>
        <InputGroup inline={inline}>
          <Textarea
            placeholder={placeholder}
            value={value}
            onChange={this.handleOnChange}
            error={error}
          />
          {error && <ErrorMsg>{error}</ErrorMsg>}
        </InputGroup>
      </Wrapper>
    );
  }

  private handleOnChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    const value: string = target.value;
    const { onChange, name } = this.props;
    onChange(name, value);
  };
}
