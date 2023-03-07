import { model, Schema } from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("Password cannot contain the word 'password'");
            }
        },
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
    friends: [
        {
            id: {
                type: Schema.Types.ObjectId,
            },
        },
    ],
}, {
    timestamps: true,
});
userSchema.method('generateAuthToken', async function generateAuthToken() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
});
userSchema.static('findByCredentials', async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('No email found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Wrong password');
    }
    return user;
});
userSchema.static('findUserById', async (id) => {
    const user = await User.findOne({ id });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
});
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});
const User = model('User', userSchema);
export default User;
