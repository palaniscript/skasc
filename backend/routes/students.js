const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET all students
router.get('/', async (req, res) => {
  res.json(await Student.find());
});

// POST new student
router.post('/', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.status(201).json(student);
});

// PUT update student
router.put('/:id', async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(student);
});

// DELETE student
router.delete('/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Student deleted' });
});

module.exports = router;
