import { ChangeEvent, useState } from "react";

interface TUseFormValues<T> {
  onChange: (value: ChangeEvent<HTMLInputElement>, key: keyof T) => void;
  values: T;
}

const useFormFields = <T>(initialValues: T): TUseFormValues<T> => {
  const [values, setValues] = useState<T>(initialValues);

  const onChange = (
    { target }: ChangeEvent<HTMLInputElement>,
    key: keyof T,
  ) => {
    setValues((prev: T) => ({ ...prev, [key]: target.value }));
  };

  return { onChange, values };
};

export default useFormFields;
