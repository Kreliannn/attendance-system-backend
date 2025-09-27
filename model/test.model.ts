import mongoose, { Schema, Document } from 'mongoose';


const TestSchema = new Schema({
    name: { type: String, required: true },
    value: { type: Number, required: true },
});

export default mongoose.model('Test', TestSchema)