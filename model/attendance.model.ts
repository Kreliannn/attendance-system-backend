import mongoose, { Schema } from 'mongoose';


const attendanceSchema = new Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'students' },
    status : { type: String, required: true },
    date : { type: String, required: true },
});

export default mongoose.model('attendance', attendanceSchema)