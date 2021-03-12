import { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errrInfo) {
    // save error log
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger">
          Wystąpił jakiś problem: {this.state.error.message}
        </div>
      );
    }
    
    return this.props.children;
  }
}

export default ErrorBoundary;