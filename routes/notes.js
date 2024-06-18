const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

console.log("notes router")

const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
// const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
notes.get('/', (req, res) => {
    console.log("notes get");
    readFromFile('./db/db.json').then((data) =>
        res.json(JSON.parse(data))
    );
});

// POST Route for a error logging
notes.post('/', (req, res) => {
    const body = req.body;
    console.log(body);

      const { title, text } = req.body;

      const payload = {
        title: title,
        text: text,
        id: uuidv4()
      };

    //   if (!isValid) {
        readAndAppend(payload, './db/db.json');
        res.json(`Note added`);
    //   } else {
    //     res.json({
    //       message: 'Object is valid, not logging. Check front end implementation',
    //       error_id: payload.error_id,
    //     });
    //   }
});

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    console.log(noteId);
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all notes except the one with the ID provided in the URL
        const result = json.filter((note) => note.id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
      });
  });

module.exports = notes;
