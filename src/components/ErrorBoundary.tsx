import React from 'react';

export type ErrorBoundaryProps = {
  fallback?: React.ReactNode;
  children: React.ReactNode;
};
export type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    // Set hasError to true if we catch errors
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // log errors data to server here, so we can get real time statuses
    console.error('>>> ErrorBoundary', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Error</div>;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
