import React from 'react';
import { voidFunction } from '../../../../../shared/helpers/void-function.ts';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

export const InputVariant: React.FC<Props> = ({ value = '', onChange = voidFunction }) => {
  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  }, []);
  return <input type="text" onChange={handleChange} value={value} />;
};
