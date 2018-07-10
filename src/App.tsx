import * as React from "react";
import "./App.css";

import Button from "./components/Button";
import FormField from "./components/FormField";

import model from "./schema.json";

import { Container, H1, Header, Wrapper } from "./styles";

interface Istate {
  form: {
    firstName: string;
    lastName: string;
    address: string;
    occupation: string;
  };
  error: object;
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
    error: {}
  };
  public render() {
    const { form, error } = this.state;
    const userFields = model.fields;
    return (
      <Wrapper>
        <Header>
          <H1>Schema Based Form Validation</H1>
        </Header>
        <Container>
          <FormField
            placeholder="E.g. Patric"
            schema={userFields.firstName}
            error={error}
            formData={form}
            onChange={this.fieldChangeHandler}
          />
          <FormField
            placeholder="E.g. Jane"
            schema={userFields.lastName}
            error={error}
            formData={form}
            onChange={this.fieldChangeHandler}
          />
          <FormField
            schema={userFields.address}
            error={error}
            formData={form}
            elementType="textarea"
            onChange={this.fieldChangeHandler}
          />
          <FormField
            placeholder="What's your Occupation?"
            schema={userFields.occupation}
            error={error}
            data={occupationList}
            formData={form}
            onChange={this.fieldChangeHandler}
          />
          <Button>Submit</Button>
        </Container>
      </Wrapper>
    );
  }

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
