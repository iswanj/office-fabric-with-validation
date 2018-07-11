import { validate, passwordValidate } from "../../util/validator";
import schema from "./sample_schema.json";
const formData = {
  firstName: "Patrick",
  lastName: "Jane",
  username: "PatrickJ",
  email: "Patrick@gmail.com",
  Address: "Sample address",
  occupation: "uiengineer",
  gender: "male",
  age: 20,
  dateOfBirth: 1526888310517,
  married: false,
  decimal: -123
};
describe("validator function test", () => {
  it("Should give error message, if requied field is not field", () => {
    // validate without pass vehicleType data (it is requied value)
    const { firstName: _, ...resetFormData } = formData;
    let validateStatus = validate(schema, resetFormData);
    expect(validateStatus).toHaveProperty("firstName");
  });
  it("Should give error if the send strings to the numeric only field", () => {
    const stringAgeData = {
      ...formData,
      age: "thirty five"
    };
    let validateStatus = validate(schema, stringAgeData);
    expect(validateStatus).toHaveProperty("age");
  });
  it("Should give error message if send invalid email address", () => {
    const invalidEmailData_type1 = {
      ...formData,
      email: "iswanjumatatgmail.com"
    };
    const invalidEmailData_type2 = {
      ...formData,
      email: "iswanjumat@gmail.c"
    };
    const invalidEmailData_type3 = {
      ...formData,
      email: "iswanjumat@gmail"
    };
    const invalidEmailData_type4 = {
      ...formData,
      email: "iswanjumat@.c"
    };
    let validateStatus_type1 = validate(schema, invalidEmailData_type1);
    expect(validateStatus_type1).toHaveProperty("email");
    let validateStatus_type2 = validate(schema, invalidEmailData_type2);
    expect(validateStatus_type2).toHaveProperty("email");
    let validateStatus_type3 = validate(schema, invalidEmailData_type3);
    expect(validateStatus_type3).toHaveProperty("email");
    let validateStatus_type4 = validate(schema, invalidEmailData_type4);
    expect(validateStatus_type4).toHaveProperty("email");
  });
  it("Should give error if value is not decimal", () => {
    const minusValueData = {
      ...formData,
      decimal: -123
    };
    let validateStatus = validate(schema, minusValueData);
    expect(validateStatus).toHaveProperty("decimal");
  });
  it("Should give provided error message if value not match for given pattern", () => {
    const withInvalidUserName = {
      ...formData,
      username: "iswan@1987"
    };
    let validateStatus = validate(schema, withInvalidUserName);
    expect(validateStatus).toHaveProperty("username");
  });
  it("Should give error message if not send true/false for boolean type field", () => {
    const withInvalidBooleanType = {
      ...formData,
      married: "yes"
    };
    let validateStatus = validate(schema, withInvalidBooleanType);
    expect(validateStatus).toHaveProperty("married");
  });
  it("Should give a error if send invalid option value not in given enum list", () => {
    const withInvalidValue = {
      ...formData,
      occupation: "salesmanager"
    };
    let validateStatus = validate(schema, withInvalidValue);
    expect(validateStatus).toHaveProperty("occupation");
  });
  it("Should give a error if send invalid date", () => {
    const withInvalidDate = {
      ...formData,
      dateOfBirth: "Saman perera"
    };
    let validateStatus = validate(schema, withInvalidDate);
    expect(validateStatus).toHaveProperty("dateOfBirth");
  });
  it("Should give a error if value lenght not match the given range", () => {
    const withInvalidLengthUsername = {
      ...formData,
      username: "iswa"
    };
    let validateStatus = validate(schema, withInvalidLengthUsername);
    expect(validateStatus).toHaveProperty("username");
  });
  it("Should return fase for invalid password format", () => {
    const invalidPassword = "ranil@123";
    const password_status = passwordValidate(invalidPassword);
    expect(password_status).toEqual(false);
  });
  it("Should return true for valid password format", () => {
    const validPassword = "Ranil@123";
    const password_status = passwordValidate(validPassword);
    expect(password_status).toEqual(true);
  });
});
