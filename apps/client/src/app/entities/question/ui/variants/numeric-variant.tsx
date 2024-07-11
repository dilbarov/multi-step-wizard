import React from 'react';
import { voidFunction } from '../../../../../shared/helpers/void-function.ts';

interface Props {
  value?: number;
  onChange?: (value: number) => void;
}

export const NumericVariant: React.FC<Props> = ({ value, onChange = voidFunction }) => {
  const [inputValue, setInputValue] = React.useState<string>(value?.toString() || '');

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === '' || /^[0-9]+$/.test(value)) {
      const newValue = Number(value);
      setInputValue(value);
      onChange(newValue);
      return;
    }

    if (!isNaN(Number(value))) {
      const newValue = Math.floor(Number(value));
      setInputValue(newValue.toString());
      onChange(newValue);
    }
  }, []);

  return <input type="number" value={inputValue} onChange={handleChange} inputMode="numeric" pattern="[0-9]*" />;
};
