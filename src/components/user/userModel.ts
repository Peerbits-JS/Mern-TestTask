import * as bcrypt from 'bcryptjs';
import {Document, Model, model, Schema} from 'mongoose';
import {ModelEnum,} from '../components.helper';

export interface IUserDocument extends Document {
    name: {
        first: string;
        last: string;
    };
    email: string;
    password: string;
    phoneNumber: string;
    tokens: Array<{ access: string; token: string }>;
    forgetToken: string;
}

export interface IUser extends IUserDocument {
}

export interface IUserModel extends Model<IUser> {

}

export const userSchema: Schema = new Schema(
    {
        name: {
            first: Schema.Types.String,
            last: Schema.Types.String,
        },
        email: {
            type: Schema.Types.String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: Schema.Types.String,
        phoneNumber: Schema.Types.String,
        tokens: [
            {
                _id: false,
                access: {
                    type: Schema.Types.String,
                },
                token: {
                    type: Schema.Types.String,
                },
            },
        ],
    },
    {timestamps: true},
);


userSchema.pre('save', function (next) {
    const user = this as IUserDocument;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.index({email: 1});
export const User: IUserModel = model<IUser, IUserModel>(ModelEnum.USER, userSchema);

export default User;
