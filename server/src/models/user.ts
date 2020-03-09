import {
  Model,
  Column,
  Table,
  PrimaryKey,
  DataType
} from 'sequelize-typescript';
import { Col } from 'sequelize/types/lib/utils';

@Table
export class User extends Model<User> {
  @Column({
    allowNull: false
  })
  email!: string;

  @Column({
    allowNull: false
  })
  password!: string;

  @Column
  discogs_id!: number;

  @Column
  discogs_username!: string;

  @Column
  token!: string;

  @Column
  token_secret!: string;

  //create custom method for validating password
  //hooks for beforeCreate bcrypt gensalt
  //create association
}
