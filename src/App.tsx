import * as React from "react";
import "./App.css";

import FormField from "./components/FormField";

const userSchema = require("./schema.json"); // tslint:disable-line

import { ButtonContainer, Container, H1, Header, Wrapper } from "./styles";

import { validate } from "./util/validator";

// fabric components
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";

interface Istate {
  form: {
    firstName: string;
    lastName: string;
    address: string;
    username: string;
    email: string;
    occupation: string;
    gender: string;
  };
  formError: object;
}

class App extends React.Component<{}, Istate> {
  public state = {
    form: {
      firstName: "",
      lastName: "",
      address: "",
      username: "",
      email: "",
      occupation: "",
      gender: ""
    },
    formError: {}
  };
  public render() {
    const { form, formError } = this.state;
    const userFields = userSchema.fields;
    return (
      <Wrapper className="ms-Fabric">
        <Header>
          <H1>Schema Based Form Validation</H1>
        </Header>
        <Container>
          <FormField
            placeHolder="E.g. Patric"
            schema={userFields.firstName}
            error={formError}
            formData={form}
            onChange={this.fieldChangeHandler}
          />
          <FormField
            placeHolder="E.g. Jane"
            schema={userFields.lastName}
            error={formError}
            formData={form}
            onChange={this.fieldChangeHandler}
          />
          <FormField
            placeHolder="E.g. patricJ"
            schema={userFields.username}
            error={formError}
            formData={form}
            onChange={this.fieldChangeHandler}
          />
          <FormField
            placeHolder="E.g. patric@gmail.com"
            schema={userFields.email}
            error={formError}
            formData={form}
            onChange={this.fieldChangeHandler}
          />
          <FormField
            schema={userFields.address}
            error={formError}
            formData={form}
            multiline={true}
            rows={4}
            onChange={this.fieldChangeHandler}
          />
          <FormField
            placeHolder="What's your Occupation?"
            schema={userFields.occupation}
            error={formError}
            formData={form}
            onChange={this.fieldChangeHandler}
          />
          <FormField
            placeHolder="What's your Gender?"
            schema={userFields.gender}
            error={formError}
            formData={form}
            onChange={this.fieldChangeHandler}
          />
          <ButtonContainer>
            <PrimaryButton onClick={this.handleFormSubmit}>Submit</PrimaryButton>
          </ButtonContainer>
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
    const { formError } = this.state;
    const validateStatus = validate(userSchema, {
      [name]: value
    });

    const getErrorState = () => {
      if (validateStatus[name]) {
        return { ...formError, [name]: validateStatus[name] };
      } else {
        const { [name]: _, ...restErrors } = formError;
        return restErrors;
      }
    };

    this.setState(
      {
        form: { ...this.state.form, [name]: value },
        formError: getErrorState()
      },
      () => {
        console.log(this.state);
      }
    );
  };
}

export default App;
