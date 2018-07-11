import * as React from "react";
import "./App.css";

import Button from "./components/Button";
import FormField from "./components/FormField";

import userSchema from "./schema.json";

import { Container, H1, Header, Wrapper } from "./styles";

import { validate } from "./util/validator";

interface Istate {
  form: {
    firstName: string;
    lastName: string;
    address: string;
    occupation: string;
  };
  formError: object;
}

const occupationList = [
  { label: "Software Engineer", value: "softwareengineer" },
  { label: "UI Engineer", value: "uiengineer" },
  { label: "QA Engineer", value: "qaengineer" },
  { label: "Systems Engineer", value: "systemsengineer" }
];

class App extends React.Component<{}, Istate> {
  public state = {
    form: {
      firstName: "",
      lastName: "",
      address: "",
      occupation: ""
    },
    formError: {}
  };
  public render() {
    const { form, formError } = this.state;
    const userFields = userSchema.fields;
    return (
      <Wrapper>
        <Header>
          <H1>Schema Based Form Validation</H1>
        </Header>
        <Container>
          <FormField
            placeholder="E.g. Patric"
            schema={userFields.firstName}
            error={formError}
            formData={form}
            onChange={this.fieldChangeHandler}
          />
          <FormField
            placeholder="E.g. Jane"
            schema={userFields.lastName}
            error={formError}
            formData={form}
            onChange={this.fieldChangeHandler}
          />
          <FormField
            placeholder="E.g. patricJ"
            schema={userFields.username}
            error={formError}
            formData={form}
            onChange={this.fieldChangeHandler}
          />
          <FormField
            placeholder="E.g. patric@gmail.com"
            schema={userFields.email}
            error={formError}
            formData={form}
            onChange={this.fieldChangeHandler}
          />
          <FormField
            schema={userFields.address}
            error={formError}
            formData={form}
            elementType="textarea"
            onChange={this.fieldChangeHandler}
          />
          <FormField
            placeholder="What's your Occupation?"
            schema={userFields.occupation}
            error={formError}
            data={occupationList}
            formData={form}
            onChange={this.fieldChangeHandler}
          />
          <FormField
            placeholder="What's your age?"
            schema={userFields.gender}
            error={formError}
            formData={form}
            onChange={this.fieldChangeHandler}
          />
          <Button onClick={this.handleFormSubmit}>Submit</Button>
        </Container>
      </Wrapper>
    );
  }

  private handleFormSubmit = () => {
    console.log("Called handle submit");

    const { form } = this.state;
    const validateStatus = validate(userSchema, form);
    this.setState({
      formError: validateStatus
    });
    if (Object.keys(validateStatus).length === 0 && validateStatus.constructor === Object) {
      console.log("passed form validation");
    }
  };

  private fieldChangeHandler = (name: string, value: string) => {
    this.setState(
      {
        form: { ...this.state.form, [name]: value }
      },
      () => {
        console.log(this.state);
      }
    );
  };
}

export default App;
