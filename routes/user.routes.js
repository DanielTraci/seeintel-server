const router = require("express").Router();
const NoteModel = require("../models/Note.model")
const DomainModel = require("../models/Domain.model")
const SavedResultModel = require("../models/SavedResult.model")

// Middleware to protect routes for user account
const authorizeUser = (req, res, next) => {
  if (req.session?.userInfo) {
    next();
  } else {
      res.status(401).json({
          message: 'Unauthorized user',
          code: 401,
      })
  };
};


//

router.post('/saveddomain', (req, res) => {  
  const {id, type, registrar, jarm, creation_date, last_dns_records_date, last_https_certificate_date, last_modification_date, last_update_date, whois, whois_date} = req.body;

  
  DomainModel.create({id, type, registrar, jarm, creation_date, last_dns_records_date, last_https_certificate_date, last_modification_date, last_update_date, whois, whois_date})
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
