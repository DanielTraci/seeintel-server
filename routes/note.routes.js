const router = require("express").Router();
const NoteModel = require("../models/Note.model")


router.get('/notes', (req, res) => {
     NoteModel.find()
          .then((response) => {
               res.status(200).json(response)
          })
          .catch((err) => {
          res.status(500).json({
               error: 'Something went wrong',
               message: err
               })
          })         
})

router.post('/create', (req, res) => {  
     const {myNote} = req.body;
     let userId = req.session.loggedInUser._id
     NoteModel.create({myNote, user: userId})
          .then((response) => {
               res.status(200).json(response)              
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          })  
})


router.get('/notes/:noteId', (req, res) => {
     NoteModel.findById(req.params.noteId)
          .then((response) => {
               res.status(200).json(response)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          }) 
})

router.delete('/notes/:id', (req, res) => {
     NoteModel.findByIdAndDelete(req.params.id)
          .then((response) => {
               res.status(200).json(response)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          })  
})

router.patch('/notes/:id', (req, res) => {
     let id = req.params.id
     const {myNote} = req.body;
     NoteModel.findByIdAndUpdate(id, {$set: {myNote}}, {new: true})
          .then((response) => {
               res.status(200).json(response)
          })
          .catch((err) => {
               
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          }) 
})

module.exports = router;
