import React from 'react';
import { useQuestionnaire } from '../hooks/use-questionnaire.ts';
import { QuestionItem } from '../../question/ui/question-item/question-item.tsx';
import { useWizard } from '../../wizard/hooks/use-wizard.ts';
import { AnswerType } from '../../wizard/domain/types/wizard.types.ts';

export const QuestionnairePage: React.FC = () => {
  const { questionnaireId, title } = useQuestionnaire();
  const { currentStep, answers, started, loading, completed, canSubmit, start, submit, done, setAnswer } =
    useWizard(questionnaireId);

  const handleChange = React.useCallback(
    (questionId: string, answer: AnswerType) => setAnswer(questionId, { value: answer }),
    [setAnswer],
  );

  return (
    <div>
      <h1>{title}</h1>
      {!started && (
        <button onClick={start} disabled={loading}>
          Start
        </button>
      )}
      {!completed && started && (
        <div>
          {currentStep?.progress && (
            <p>
              Progress: {currentStep.progress.completed + 1}/{currentStep.progress.total}
            </p>
          )}
          {currentStep?.questions.map(question => {
            const value = answers.get(question.id)?.value as AnswerType;
            return (
              <div key={question.id}>
                <QuestionItem
                  value={value}
                  title={question.text}
                  type={question.type}
                  options={question.options}
                  onChange={(value: string | number | string[]) => handleChange(question.id, value)}
                />
              </div>
            );
          })}
          <div style={{ marginTop: 16 }}>
            <button onClick={submit} disabled={!canSubmit || loading}>
              {currentStep?.progress.completed === currentStep?.progress.total ? 'Submit' : 'Next step'}
            </button>
          </div>
        </div>
      )}
      {completed && (
        <div>
          <p>Congratulations! You are finished</p>
          <button onClick={done}>Done!</button>
        </div>
      )}
    </div>
  );
};
