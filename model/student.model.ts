import mongoose, { Schema } from 'mongoose';


const studentSchema = new Schema({
    name: { type: String, required: true },
    parent: { type: String, required: true },
    contact: { type: String, required: true },
    section : { type: String, required: true },
});

export default mongoose.model('students', studentSchema)