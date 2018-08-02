import * as React from "react";

import { ChoiceGroup } from "office-ui-fabric-react/lib/ChoiceGroup";
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
        text: string;
        key: string;
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
        if (elementData.length <= 2) {
          return this.renderChoiceGroup(elementData);
        }
        return this.renderEnumInput(ElementName, elementData);
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

  private renderEnumInput(ElementName: any, data: object) {
    const { schema, elementType, error, formData, options, onChange, ...restProps } = this.props;
    return (
      <ElementName
        {...restProps}
        selectedKey={formData[schema.name]}
        name={schema.name}
        label={schema.label}
        errorMessage={error[schema.name]}
        required={schema.required}
        options={data}
        onChanged={this.fieldChangeHandler}
      />
    );
  }

  private renderChoiceGroup(
    data: Array<{
      text: string;
      key: string;
    }>
  ) {
    const { schema, elementType, error, formData, options, onChange, ...restProps } = this.props;
    return (
      <ChoiceGroup
        {...restProps}
        selectedKey={formData[schema.name]}
        name={schema.name}
        label={schema.label}
        required={schema.required}
        options={data}
        onChange={this.onChangeChoiceGroup}
      />
    );
  }

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

  private onChangeChoiceGroup = (ev: React.FormEvent<HTMLInputElement>, value: any) => {
    const { schema, onChange } = this.props;
    let inputFieldValue;
    if (typeof value === "object") {
      inputFieldValue = value.key;
    }
    onChange(schema.name, inputFieldValue);
  };
}
