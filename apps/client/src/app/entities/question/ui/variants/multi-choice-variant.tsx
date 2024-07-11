import React from 'react';
import { voidFunction } from '../../../../../shared/helpers/void-function.ts';

interface Props {
  values?: string[];
  options: string[];
  onChange?: (values: string[]) => void;
}

export const MultiChoiceVariant: React.FC<Props> = ({ values = [], options, onChange = voidFunction }) => {
  const [selectedChoices, setSelectedChoices] = React.useState<string[]>(values);

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const choiceId = event.target.value;
    const isChecked = event.target.checked;

    setSelectedChoices(prevChoices => {
      const newChoices = isChecked ? [...prevChoices, choiceId] : prevChoices.filter(id => id !== choiceId);

      onChange(newChoices);
      return newChoices;
    });
  }, []);

  return (
    <div>
      {options.map((option, index) => (
        <div key={`${option}_${index}`}>
          <label>
            <input type="checkbox" value={option} checked={selectedChoices.includes(option)} onChange={handleChange} />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};
