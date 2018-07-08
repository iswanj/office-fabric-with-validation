import * as React from "react";
import { Button } from "./styles";

interface InterfaceButton {
  children: any;
}

export default class DefaultButton extends React.Component<InterfaceButton> {
  public render() {
    const { children, ...restProps } = this.props;

    return <Button {...restProps}>{children}</Button>;
  }
}
