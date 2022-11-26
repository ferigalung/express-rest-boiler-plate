const express = require('express');
const router = express.Router();
const members = require('../modules/members/Members');
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
  res.json(members);
});

router.get('/:id', (req, res) => {
  const member = members.find(member => member.id === req.params.id);
  if (member) {
    return res.json(member);
  }
  res.status(422).json({ msg: `No member with the id of ${req.params.id}` });
});

router.post('/', (req, res) => {
  const newMember = {
    id: uuidv4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  };

  if (!newMember.name || !newMember.email) {
    return res.status(422).json({ msg: 'Please include a name and email' });
  }

  members.push(newMember);
  res.json(newMember);
});

router.put('/:id', (req, res) => {
  const member = members.find(member => member.id === req.params.id);
  if (member) {
    member.name = req.body.name || member.name;
    member.email = req.body.email || member.email;
    return res.json(member);
  }
  res.status(422).json({ msg: `No member with the id of ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
  const member = members.find(member => member.id === req.params.id);
  if (member) {
    return res.json(members.filter(member => member.id !== req.params.id));
  }
  res.status(422).json({ msg: `No member with the id of ${req.params.id}` });
});

module.exports = router;
