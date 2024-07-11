import { IQuestion } from '../../../question/domains/types/question.types';

export interface IQuestionnaire {
  id: string;
  title: string;
}

export interface IStep {
  stepId: number;
  questions: IQuestion[];
}
