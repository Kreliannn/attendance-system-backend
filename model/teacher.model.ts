import mongoose, { Schema } from 'mongoose';


const teacherSchema = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    smsMessage : { type: String, required: true },
});

export default mongoose.model('teachers', teacherSchema)