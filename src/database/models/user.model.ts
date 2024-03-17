import { Column, DataType, Model, Table } from "sequelize-typescript";

export type User = {
  id: string;
  name: string;
  secondName?: string;
  email: string;
  password: string;
  sex?: string;
  photoPath?: string;
  registrationDate: number;
}

@Table({
  timestamps: false,
  createdAt: false,
  tableName: "User"
})
export class UserModel extends Model<User> {
  @Column({type: DataType.STRING, primaryKey: true})
  id: string;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  secondName: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  gender: string;

  @Column(DataType.STRING)
  photoPath: string;
  
  @Column(DataType.INTEGER)
  registrationDate: number;
}
