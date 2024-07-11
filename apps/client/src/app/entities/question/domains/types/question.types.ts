export interface IQuestion {
  id: string;
  orderId: number;
  text: string;
  type: QuestionType;
  options: string[];
}

export enum QuestionType {
  INPUT = 'input',
  NUMERIC = 'numeric',
  SINGLE_CHOICE = 'single_choice',
  MULTI_CHOICE = 'multi_choice',
}
