import asyncHandler from 'express-async-handler';
import { Snippet } from '../models/index.js';

const snippetController = {
  get: asyncHandler(async (req, res) => {
    const { id: user } = req.user;
    const snippets = await Snippet.find({ user });
    res.status(200).json(snippets);
  }),

  create: asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const { id: user } = req.user;
    if (!title || !description) {
      res.status(400);
      throw new Error('Please fill all fields');
    }
    const snippet = await Snippet.create({ title, description, user });
    res.status(200).json(snippet);
  }),

  update: asyncHandler(async (req, res) => {
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }
    const { id } = req.params;
    const { id: user } = req.user;
    const snippet = await Snippet.findById(id);
    if (!snippet) {
      res.status(400);
      throw new Error('Snippet not found');
    }
    if (snippet.user.toString() !== user) {
      res.status(401);
      throw new Error('User not authorized');
    }
    const updatedTransaction = await Snippet.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTransaction);
  }),

  delete: asyncHandler(async (req, res) => {
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }
    const { id } = req.params;
    const { id: user } = req.user;
    const snippet = await Snippet.findById(id);
    if (!snippet) {
      res.status(400);
      throw new Error('Snippet not found');
    }
    if (snippet.user.toString() !== user) {
      res.status(401);
      throw new Error('User not authorized');
    }
    await snippet.remove();
    res.status(200).json({ id: req.params.id });
  }),
};

export default snippetController;
