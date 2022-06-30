const router = require("express").Router();
// we need to require the Celebrity model to cammunicate with the db
const Celebrity = require('../models/Celebrity')

router.get('/celebrities', (req, res, next) => {
  // get all the books from the db
  Celebrity.find()
    .then(celebritiesFromDb => {
      // console.log(celebritiesFromDb)
      // render a view named 'celebrities' with all the celebrities from the db 
      res.render('celebrities/index', { celebrityList: celebritiesFromDb })
    })
    .catch(err => {
      next(err)
    })
})

// ADD I
router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new')
});

// DETAIL ARTIST
router.get('/celebrities/:id', (req, res, next) => {
  const celebrityId = req.params.id
  Celebrity.findById(celebrityId)
    .then(celebrityFromDb => {
      // console.log(celebrityFromDb)
      res.render('celebrities/show', { celebrityDetail: celebrityFromDb })

    })
    .catch(err => {
      next(err)
    })
});

// ADD II
router.post("/celebrities", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  })
    .then(addedCelebrity => {
      res.redirect(`/celebrities/${addedCelebrity._id}`);
    })
    .catch((err) => {
      next(err);
      res.render("celebrities/new");
    });
})

// DELETE
router.post('/celebrities/:id/delete', (req, res, next) => {
  const celebrityId = req.params.id
  Celebrity.findByIdAndRemove(celebrityId)
    .then(() => {
      res.redirect('/celebrities')
    })
    .catch(err => {
      next(err)
    })
})

// EDIT I
router.get('/celebrities/:id/edit', (req, res, next) => {
  const celebrityId = req.params.id
  Celebrity.findById(celebrityId)
    .then(celebrityFromDb => {
      res.render('celebrities/edit', { celebrity: celebrityFromDb })
    })
    .catch(err => {
      next(err)
    })
})


// EDIT II
router.post('/celebrities/:id', (req, res, next) => {
  const celebrityId = req.params.id
  const { name, occupation, catchPhrase } = req.body
  Celebrity.findByIdAndUpdate(celebrityId, {
    name, occupation, catchPhrase
  })
    .then(() => {
      res.redirect(`/celebrities/${celebrityId}`)
    })
    .catch(err => {
      next(err)
    })
})


module.exports = router;
