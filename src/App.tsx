import * as React from "react";
import "./App.css";

import Button from "./components/Button";
import Input from "./components/InputField";
import Textarea from "./components/TextareaField";

import { Container, H1, Header, Wrapper } from "./styles";

interface Istate {
  form: {
    firstname: string;
    address: string;
  };
}

class App extends React.Component<{}, Istate> {
  public state = {
    form: {
      firstname: "",
      address: ""
    }
  };
  public render() {
    const { form } = this.state;
    return (
      <Wrapper>
        <Header>
          <H1>Schema Based Form Validation</H1>
        </Header>
        <Container>
          <Input
            label="First Name"
            type="text"
            placeholder="E.g. Patric"
            name="firstname"
            value={form.firstname}
            onChange={this.fieldChangeHandler}
          />
          <Textarea
            label="Address"
            type="text"
            name="address"
            value={form.address}
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
