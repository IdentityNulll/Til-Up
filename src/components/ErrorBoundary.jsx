import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-3 px-6 text-center">
          <p className="text-lg font-bold text-content-strong">Xatolik yuz berdi</p>
          <pre
            data-testid="error-details"
            className="max-w-full overflow-auto rounded-xl2 border border-ink-750 bg-ink-900 p-3 text-left text-[11px] text-red-600"
          >
            {String(this.state.error?.message || this.state.error)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
