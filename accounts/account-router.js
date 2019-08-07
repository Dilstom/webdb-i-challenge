const express = require('express');
const router = express.Router();
const db = require('../data/dbConfig.js');

router.get('/', async (req, res) => {
 try {
  const account = await db('accounts');
  //   const account = await db.select('*').from('accounts');
  res.status(200).json(account);
 } catch (err) {
  res.status(500).json({ message: 'Error getting accounts' });
 }
});

router.get('/:id', async (req, res) => {
 const { id } = req.params;
 try {
  const account = await db('accounts')
   .where({ id })
   .first();
  if (account) {
   res.status(200).json(account);
  } else {
   res
    .status(404)
    .json({ message: `could not find account with this id: ${id}` });
  }
 } catch (err) {
  res.status(500).json({ message: 'failed to get this account' });
 }
});

router.post('/', async (req, res) => {
 try {
  const account = await db('accounts').insert(req.body);
  res.status(201).json(account);
 } catch (err) {
  res.status(500).json({ message: 'could not add this account' });
 }
});

router.put('/:id', async (req, res) => {
 const { id } = req.params;
 const accountInfo = req.body;
 try {
  const count = await db('accounts')
   .where({ id })
   .update(accountInfo);
  if (count) {
   res.status(200).json({ message: 'this account has been updated', count });
  } else {
   res.status(404).json({ message: 'could not find post with this id' });
  }
 } catch (err) {
  res
   .status(500)
   .json({ message: 'could not update this account', error: err });
 }
});

router.delete('/:id', async (req, res) => {
 const { id } = req.params;
 try {
  const count = await db('accounts')
   .where({ id })
   .del();
  if (count) {
   res.status(200).json({ message: 'this accound has been deleted', count });
  } else {
   res.status(404).json({ message: 'could not find this id' });
  }
 } catch (err) {
  res
   .status(500)
   .json({ message: 'could not delete this account', error: err });
 }
});

module.exports = router;
