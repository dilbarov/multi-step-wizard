import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'uuid';

@Injectable()
export class UuidPipe implements PipeTransform {
  public transform(id: never): string {
    const validUuid = validate(id);

    if (!validUuid) {
      throw new BadRequestException(`Invalid UUID: ${id} is not a valid UUID.`);
    }

    return id;
  }
}
