import React from 'react';
import { voidFunction } from '../../../../../shared/helpers/void-function.ts';

interface Props {
  value?: string | null;
  options: string[];
  onChange?: (value: string) => void;
}

export const SingleChoiceVariant: React.FC<Props> = ({ value = null, options, onChange = voidFunction }) => {
  const [selectedChoice, setSelectedChoice] = React.useState<string | null>(value);

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (options.includes(event.target.value)) {
      const choiceId = event.target.value;
      setSelectedChoice(choiceId);
      onChange(choiceId);
    }
  }, []);

  return (
    <div>
      {options.map((option, index) => (
        <div key={`${option}_${index}`}>
          <label>
            <input
              type="radio"
              name="single-choice"
              value={option}
              checked={selectedChoice === option}
              onChange={handleChange}
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};
