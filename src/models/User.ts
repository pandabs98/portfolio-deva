import mongoose,{model, models} from "mongoose";
import bcrypt from 'bcryptjs';


export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}


const userSchema = new mongoose.Schema<IUser>({
    email:{
        type: String,
        required: [true,"please enter your Email"],
        unique: true,
        trim: true
    },
    password:{
        type:String,
        required: [true,"Please enter your password"]
    },
    refreshToken:{
        type: String,
        required: false
    }
}, {timestamps:true})

userSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};


const User = models?.User || model<IUser>("User", userSchema)
export default User;
