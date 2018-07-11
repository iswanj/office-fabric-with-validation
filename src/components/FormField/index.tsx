import * as React from "react";

// imports components
import InputField from "../InputField";
import Select from "../SelectField";
import Textarea from "../TextareaField";

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
  elementType?: string;
  placeholder?: string;
  data?: Array<{
    label: string;
    value: string;
    name?: string;
  }>;
  formData: any;
  error: object;
  onChange: (name: string, value: string) => void;
}

export default class FormField extends React.Component<IFormFieldProps> {
  private elementTypeMap = {
    string: InputField,
    email: InputField,
    textarea: Textarea,
    enum: Select // should implement radio button component if enum data length === 2
  };

  public render() {
    const { schema, elementType, error, formData, data, ...restProps } = this.props;
    let ElementName = this.elementTypeMap[schema.type];
    if (elementType) {
      ElementName = this.elementTypeMap[elementType];
    }

    switch (schema.type) {
      case "enum":
        const elementData = data || schema.enum.values || [];
        return (
          <ElementName
            {...restProps}
            value={formData[schema.name]}
            name={schema.name}
            label={schema.label}
            error={error[schema.name]}
            required={schema.required}
            data={elementData}
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
            error={error[schema.name]}
            required={schema.required}
          />
        );
        break;
    }
  }
}
