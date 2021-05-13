const router = require("express").Router();
const Usermodel = require("../models/User.model");


router.get('/user', (req, res) => {
  Usermodel.find()
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
