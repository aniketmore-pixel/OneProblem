import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: String, // hashed
    provider: {
        type: String,
        default: 'credentials',
    },
}, { timestamps: true })

export default mongoose.models.User || mongoose.model('User', UserSchema)
