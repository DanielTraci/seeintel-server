const router = require("express").Router();
const NoteModel = require("../models/Note.model")
const DomainModel = require("../models/Domain.model")
const SavedResultModel = require("../models/SavedResult.model")
const UserModel = require("../models/User.model")



// Render User Dashboard that shows all 
// saved search results (website domain IDs)
router.get("/user", (req, res, next) => {
     if (!req.session.loggedInUser) {
          res.status(401).json({
               message: 'Unauthorized user',
               code: 401,
          })
     } else {
          UserModel.findById(req.session.loggedInUser._id)
               .populate('myDomain')
               .then((domains) => {
                    res.status(200).json(domains)
               })
               .catch((err) => {
                    res.status(500).json({
                         error: 'No saved search results found',
                         message: err
                    })
               });
     }
});

router.get('/domains', (req, res) => {
     DomainModel.find()
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

router.post('/domains/create', (req, res) => {
     const { myDomain , data} = req.body;
     DomainModel.create({ myDomain , data: JSON.stringify(data)})
          .populate('myNote')
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


router.get('/domains/:id', (req, res) => {
     const {id} = req.params
     DomainModel.findById(id)
     .populate("myNote")
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

router.delete('/domains/:id', (req, res) => {
     DomainModel.findByIdAndDelete(req.params.id)
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
