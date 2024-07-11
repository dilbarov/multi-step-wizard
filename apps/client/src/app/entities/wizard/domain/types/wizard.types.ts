import { IQuestion } from '../../../question/domains/types/question.types.ts';

export interface IStepConfig {
  wizardId: string;
  stepId: number | null;
  progress: IProgress;
  questions: IQuestion[];
}

export interface IProgress {
  total: number;
  completed: number;
}

export interface IAnswerCreateSchema {
  questionId: string;
  answer: IAnswerValue;
}

export interface IAnswerValue {
  value: AnswerType;
}

export type AnswerType = string | number | string[];
