import {
  Model,
  Column,
  Table,
  DataType,
  PrimaryKey,
  HasMany,
  BelongsTo
} from 'sequelize-typescript';
import { Instance } from './Instance';

@Table
export class Release extends Model<Release> {
  @Column({
    type: DataType.JSONB
  })
  labels!: object;

  //types can be automatically inferred from javascript type
  @Column
  year!: number;

  @Column
  master_url!: string;

  @Column({
    type: DataType.JSONB
  })
  artists!: object;

  @PrimaryKey
  @Column
  id!: number;

  @Column
  thumb!: string;

  @Column
  title!: string;

  @Column({
    type: DataType.JSONB
  })
  formats!: object;

  @Column
  cover_image!: string;

  @Column
  resource_url!: string;

  @Column
  master_id!: number;

  @HasMany(() => Instance, {
    onDelete: 'cascade'
  })
  instances!: Instance[];
}
