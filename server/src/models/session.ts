import {
  Model,
  Column,
  Table,
  PrimaryKey,
  DataType
} from 'sequelize-typescript';

@Table
class Session extends Model<Session> {
  @PrimaryKey
  @Column
  sid!: string;

  @Column
  expires!: Date;

  @Column({
    type: DataType.STRING(1000)
  })
  data!: string;
}
