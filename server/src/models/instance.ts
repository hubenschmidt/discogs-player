import {
  Model,
  Column,
  Table,
  PrimaryKey,
  BelongsToMany,
  Scopes,
  CreatedAt,
  UpdatedAt,
  AllowNull
} from 'sequelize-typescript';
// import { UUID } from "sequelize/types";

@Table
export class Instance extends Model<Instance> {
  @PrimaryKey
  @Column
  instance_id!: number;

  @Column
  rating!: number;

  @Column
  folder_id!: number;

  @Column
  date_added!: string;

  @Column
  id!: number;

  //add associations next
}
