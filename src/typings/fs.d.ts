export interface FormInstance<T> {
  init: (action: string, data?: T) => void;
  handleSubmit: () => Promise<boolean>;
}
