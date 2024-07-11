import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PublicAnswerGetDto } from '../domain/dto/public.answer.get.dto';
import { AnswerEntity } from '../entities/answer.entity';
import { IAnswerValue } from '../domain/interfaces/answer.interface';
import { AnswerCreateDto } from '../domain/dto/answer.create.dto';

@Injectable()
export class AnswerService {
  public constructor(@InjectRepository(AnswerEntity) private readonly answerRepository: Repository<AnswerEntity>) {}

  public async getAnswersByWizard(wizardId: string): Promise<PublicAnswerGetDto[]> {
    const answers = await this.answerRepository.find({
      where: {
        wizardId,
      },
    });

    return answers.map(answer => new PublicAnswerGetDto(answer));
  }

  public async createAnswer(
    wizardId: string,
    questionId: string,
    answerValue: IAnswerValue,
  ): Promise<PublicAnswerGetDto> {
    const answer = new AnswerEntity();
    answer.wizardId = wizardId;
    answer.questionId = questionId;
    answer.answer = answerValue;

    await this.answerRepository.save(answer);

    return new PublicAnswerGetDto(answer);
  }
}
