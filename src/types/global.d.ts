declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveStyle(css: string | object): R;
      toBeDisabled(): R;
      toHaveTextContent(text: string | RegExp): R;
    }
  }
}