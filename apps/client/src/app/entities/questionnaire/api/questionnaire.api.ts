import { ApiClient } from '../../../../shared/api/api-client.ts';
import { IQuestionnaire, IStep } from '../domains/types/questionnaire.types.ts';

export class QuestionnaireApi extends ApiClient {
  public constructor(baseUrl?: string) {
    super(baseUrl);
  }

  public async getQuestionnaires(signal?: AbortSignal): Promise<IQuestionnaire[]> {
    return await this.get<IQuestionnaire[]>('/questionnaire', {}, signal);
  }

  public async getQuestionnaire(questionnaireId: string, signal?: AbortSignal): Promise<IQuestionnaire> {
    return await this.get<IQuestionnaire>(`/questionnaire/${questionnaireId}`, {}, signal);
  }

  public async getSteps(questionnaireId: string, signal?: AbortSignal): Promise<IStep[]> {
    return await this.get<IStep[]>(`/questionnaire/${questionnaireId}/steps`, {}, signal);
  }
}
