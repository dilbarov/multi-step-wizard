import { PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';

export abstract class BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  public id: string = v4();
}
