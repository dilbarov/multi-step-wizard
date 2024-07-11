import { ApiClient } from '../../../../shared/api/api-client.ts';
import { IAnswerCreateSchema, IStepConfig } from '../domain/types/wizard.types.ts';

export class WizardApi extends ApiClient {
  public constructor() {
    super();
  }

  public async startWizard(questionnaireId: string, signal?: AbortSignal): Promise<IStepConfig> {
    return await this.post(`/wizard/start`, { questionnaireId }, signal);
  }

  public async getStepConfig(wizardId: string, stepId: number, signal?: AbortSignal): Promise<IStepConfig> {
    return await this.get(`/wizard/${wizardId}/step/${stepId}`, {}, signal);
  }

  public async submitStep(
    wizardId: string,
    stepId: number,
    answers: IAnswerCreateSchema[],
    signal?: AbortSignal,
  ): Promise<IStepConfig> {
    return await this.post(`/wizard/${wizardId}/step/${stepId}`, { answers }, signal);
  }
}
