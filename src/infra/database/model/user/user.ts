import mongoose, { Document, Model, Schema } from 'mongoose';
import { User } from '../../../../domain/entities/user/user';


export type MongoDBUser = Model<Document<any, any, any> & User>;
  
const userSchema:any = new Schema<User>({
  name: { type: String, required: true},
  email:  { type: String, required: true,unique:true},
  password:  { type: String},
  role: {type:String, default:"user"}
  }, {
    timestamps: { createdAt: true}
  });

 export const userModel = mongoose.connection.model<Document<any, any, any> & User>('user', userSchema) as MongoDBUser;
