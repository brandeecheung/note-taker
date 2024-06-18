const router = require('express').Router();

const notesRouter = require('./notes');
router.use('/notes', notesRouter);

console.log('loading notes router');

module.exports = router;
