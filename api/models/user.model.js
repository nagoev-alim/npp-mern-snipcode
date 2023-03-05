import { model, Schema } from 'mongoose';

/* =============================
📦 Create Schema
============================= */
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
}, { timestamps: true });

/* =============================
📦 Create a model
============================= */
const User = model('User', userSchema);

/* =============================
📦 Export Schema
============================= */
export default User;
