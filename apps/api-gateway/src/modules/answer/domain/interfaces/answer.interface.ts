export interface IAnswer {
  id: string;
  wizardId: string;
  questionId: string;
  answer: IAnswerValue;
}

export interface IAnswerValue {
  value: string | number | string[];
}
