const express = require('express');
const router = express.Router();
const Actions = require('./actions-model')

router.get('/', (req,res) => {
    Actions.get()
    .then(data => {
        console.log("Home route working")
        res.status(200).json(data)
    })
    .catch(() => {
        res.status(500).json({mesage:"message"})
    })
})

router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
      .then(data => {
        if (!data) {
          res.status(404).json({
            message: 'No bueno friend.'
          })
        } else {
          console.log("It's working!")
          res.status(200).json(data)
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'Error: no information could be retrived with id ' + id })
      })
  });

  router.post('/', [validateAction], (req, res) => {
    Actions.insert(req.body)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error: unable to post',
        });
      });
  });
  
  
  router.put('/:id', [validateAction], (req, res) => {
    Actions.update(req.params.id, req.body)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error: unable to update',
        });
      });
  });
  
  router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
      .then(data => {
        res.status(200).json({ message: 'Success: item was deleted.' });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error: unable to delete',
        });
      });
  });
   
  function validateAction(req, res, next) {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
      res.status(400).json({
        message: 'Your request must include notes, id, description'
      })
    } else {
      next();
    }
  }
  
  module.exports = router;