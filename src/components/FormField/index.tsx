import * as React from "react";

import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import { TextField } from "office-ui-fabric-react/lib/TextField";

import { Wrapper } from "./styles";

interface IFormFieldProps {
  schema: {
    type: string;
    name: string;
    label: string;
    required: boolean;
    enum: {
      values: Array<{
        label: string;
        value: string;
        name?: string;
      }>;
    };
  };
  multiline?: boolean;
  placeHolder?: string;
  elementType?: string;
  options?: Array<{
    text: string;
    key: string;
  }>;
  rows?: number;
  formData: any;
  error: object;
  onChange: (name: string, value: string) => void;
}

export default class FormField extends React.Component<IFormFieldProps> {
  private elementTypeMap = {
    string: TextField,
    email: TextField,
    textarea: TextField,
    enum: Dropdown // should implement radio button component if enum data length === 2
  };

  public render() {
    return <Wrapper>{this.renderInputField()}</Wrapper>;
  }

  private renderInputField = () => {
    const { schema, elementType, error, formData, options, onChange, ...restProps } = this.props;
    let ElementName = this.elementTypeMap[schema.type];
    if (elementType) {
      ElementName = this.elementTypeMap[elementType];
    }

    switch (schema.type) {
      case "enum":
        const elementData = options || schema.enum.values || [];
        return (
          <ElementName
            {...restProps}
            selectedKey={formData[schema.name]}
            name={schema.name}
            label={schema.label}
            errorMessage={error[schema.name]}
            required={schema.required}
            options={elementData}
            onChanged={this.fieldChangeHandler}
          />
        );
        break;
      default:
        return (
          <ElementName
            {...restProps}
            value={formData[schema.name]}
            name={schema.name}
            label={schema.label}
            errorMessage={error[schema.name]}
            required={schema.required}
            onChanged={this.fieldChangeHandler}
          />
        );
        break;
    }
  };

  private fieldChangeHandler = (value: any) => {
    const { schema, onChange } = this.props;
    let inputFieldValue;
    if (typeof value === "object") {
      inputFieldValue = value.key;
    } else {
      inputFieldValue = value;
    }
    onChange(schema.name, inputFieldValue);
  };
}
