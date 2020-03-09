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
  // if constructor was needed to initialize model properties (instead use ! in property name):
  constructor(instance_id: number) {
    super();
    this.instance_id = instance_id;
  }

  // @PrimaryKey
  @Column({
    // defaultValue: DataType.UUIDV1,
    // unique: true,
    primaryKey: true
    // type: DataType.UUID
    // type: DataType.NUMBER
  })
  instance_id: number;

  @Column({
    // type: DataType.NUMBER
  })
  rating!: number;

  @Column({
    // type: DataType.NUMBER
  })
  folder_id!: number;

  @Column({
    // type: DataType.DATE
  })
  date_added!: Date;

  @Column({
    // type: DataType.NUMBER
  })
  id!: number;

  @BelongsTo(() => Release, {
    onDelete: 'CASCADE'
  })
  release!: Release;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE'
  })
  user!: User;
}
