import { model, Schema } from 'mongoose';

/* =============================
📦 Create Schema
============================= */
const snippetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Please add a title value'],
  },
  description: {
    type: String,
  },
}, { timestamps: true });

/* =============================
📦 Create a model
============================= */
const Snippet = model('Snippet', snippetSchema);

/* =============================
📦 Export Schema
============================= */
export default Snippet;
