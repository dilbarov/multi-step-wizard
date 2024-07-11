export interface IQuestion {
  id: string;
  orderId: number;
  stepId: number;
  text: string;
  type: QuestionType;
  options: string[];
  deleted: boolean;
}

export enum QuestionType {
  INPUT = 'input',
  NUMERIC = 'numeric',
  SINGLE_CHOICE = 'single_choice',
  MULTI_CHOICE = 'multi_choice',
}
