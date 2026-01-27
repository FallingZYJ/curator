import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";
import styles from "../styles/ErrorBoundary.module.css";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message?: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    message: undefined
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Viewer dashboard error boundary caught", {
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <h2 className={styles.title}>Dashboard temporarily unavailable</h2>
          <p className={styles.message}>
            Refresh the page or check the service logs for more details.
          </p>
          {this.state.message ? (
            <p className={styles.details}>Error: {this.state.message}</p>
          ) : null}
        </div>
      );
    }

    return this.props.children;
  }
}
