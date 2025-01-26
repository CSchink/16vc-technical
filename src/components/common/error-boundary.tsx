import { Component, ReactNode } from "react";
import { handleException } from "./utils/handle-error";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    if (_) return { hasError: true };
    return { hasError: false };
  }

  public componentDidCatch(error: unknown) {
    handleException(error);
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error.  Please reload the page.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
