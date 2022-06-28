const router = require("express").Router();
// we need to require the Celebrity model to cammunicate with the db
const Celebrity = require('../models/Celebrity')

router.get('/celebrities', (req, res, next) => {
// get all the books from the db
    Celebrity.find()
        .then(celebritiesFromDB => {
        // console.log(celebritiesFromDB)
        // render a view named 'celebrities' with all the celebrities from the db 
    res.render('celebrities/index', { celebrityList: celebritiesFromDB })
})
    .catch(err => {
        next(err)
    })
})

router.get('/celebrities/new', (req, res, next) => {
	res.render('celebrities/new') 
});

router.get('/celebrities/:id', (req, res, next) => {
	const celebrityId = req.params.id
    Celebrity.findById(celebrityId)
        .then(celebritiesFromDB => {
            // console.log(celebritiesFromDB)
            res.render('celebrities/show', { celebrityDetail: celebritiesFromDB })

        })
        .catch(err => {
            next(err)
        })
});

router.post("/celebrities", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({
      name: name,
      occupation: occupation,
      catchPhrase: catchPhrase,
    })
      .then(() => {
        return Celebrity.find().then((celebritiesFromDB) => {
          res.render("celebrities/index", { celebrityList: celebritiesFromDB });
        });
      })
      .catch((err) => {
        next(err);
        res.render("celebrities/new");
      });
  })

router.post('/celebrities/:id/delete'), (req, res, next) => {
    const celebrityId = req.params.id
    Celebrity.findByIdAndRemove(celebrityId)
        .then(deletedCelebrity => {
            console.log(deletedCelebrity)
            // res.redirect('celebrities/index')
        })
      .catch(err => {
			next(err)
		})
};

// router.get('/books/delete/:id', (req, res, next) => {
// 	const bookId = req.params.id
// 	// delete this book in the db	
// 	Book.findByIdAndDelete(bookId)
// 		.then(deletedBook => {
// 			console.log(deletedBook)
// 			res.redirect('/books')
// 		})
// 		.catch(err => {
// 			next(err)
// 		})
// });

module.exports = router;
