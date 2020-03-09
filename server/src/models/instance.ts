import {
  Model,
  Column,
  Table,
  PrimaryKey,
  BelongsTo,
  DataType
} from 'sequelize-typescript';
import { Release } from './Release';
import { User } from './User';

@Table
export class Instance extends Model<Instance> {
  // @PrimaryKey
  @Column({
    // defaultValue: DataType.UUIDV1,
    // unique: true,
    primaryKey: true,
    // type: DataType.UUID
    type: DataType.INTEGER
  })
  instance_id!: number;

  @Column({
    type: DataType.INTEGER
  })
  rating!: number;

  @Column({
    type: DataType.INTEGER
  })
  folder_id!: number;

  @Column({
    type: DataType.DATE
  })
  date_added!: Date;

  @Column({
    type: DataType.INTEGER
  })
  id!: number;

  @BelongsTo(() => Release, {
    onDelete: 'cascade'
  })
  release!: Release;

  @BelongsTo(() => User, {
    onDelete: 'cascade'
  })
  user!: User;
}
