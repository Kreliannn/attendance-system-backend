import mongoose, { Schema } from 'mongoose';


const smsMessageSchema = new Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'students' },
    date: { type: String, required: true },
    message: { type: String, required: true },
});

export default mongoose.model('smsMessages', smsMessageSchema)