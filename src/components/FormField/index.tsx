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
  };
  elementType?: string;
  placeholder?: string;
  data?: Array<{
    label: string;
    value: string;
  }>;
  formData: any;
  error: object;
  onChange: (name: string, value: string) => void;
}

export default class FormField extends React.Component<IFormFieldProps> {
  private elementTypeMap = {
    string: InputField,
    textarea: Textarea,
    enum: Select
  };

  public render() {
    const { schema, elementType, error, formData, ...restProps } = this.props;
    let ElementName = this.elementTypeMap[schema.type];
    if (elementType) {
      ElementName = this.elementTypeMap[elementType];
    }
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
  }
}
