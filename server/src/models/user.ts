import {
  Model,
  Column,
  Table,
  PrimaryKey,
  DataType,
  BeforeCreate,
  BeforeUpdate,
  HasMany
} from 'sequelize-typescript';
import { Instance } from './Instance';
import bcrypt from 'bcrypt';

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

  @BeforeCreate
  @BeforeUpdate
  static hashPassword(user: User) {
    if (user.password) {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      user.password = bcrypt.hashSync(user.password, salt);
    }
  }

  @HasMany(() => Instance, {
    onDelete: 'cascade'
  })
  instances!: Instance[];
}
