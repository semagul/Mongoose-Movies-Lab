const router = require("express").Router();
const Movie = require('../models/Movie');
const Celebrity = require('../models/Celebrity');


// ADD I: LIST CELEBS TO SELECT ON 
router.get('/movies/new', (req, res, next) => {
    Celebrity.find()  
    .then(celebritiesFromDb => {
        res.render('movies/new', { celebrityList: celebritiesFromDb })
    })
    .catch((err) => {
        next(err)
    })
  })

  // LIST MOVIES WITH CAST RETRIEVED FROM OTHER COLLECTION WITH POPULATE 
router.get('/movies', (req, res, next) => {
    Movie.find()  
    .populate('cast')
    .then(moviesFromDb => {
        //console.log(moviesFromDb)
        res.render("movies/moviesList", { moviesList: moviesFromDb })
  })
    .catch((err) => {
        next(err) 
    })
})

  // ADD II
router.post("/movies", (req, res, next) => {
    // console.log("movies")
    const { title, genre, plot, cast } = req.body;
    Movie.create({
        title: title,
        genre: genre,
        plot: plot,
        cast: cast
    })
    .then(() => {
        res.redirect("/movies")
    })
    .catch((err) => {
        next(err)
    })
})


// DETAIL FILM
router.get('/movies/:id', (req, res, next) => {
    const movieId = req.params.id
    Movie.findById(movieId)
        .populate("cast")
        .then(movieFromDb => {
            res.render('movies/show', { movie : movieFromDb})
        })
        .catch(err => {
            next(err)
          })
})

// EDIT I
router.get("/movies/:id/edit", (req, res, next) => {
    const movieId = req.params.id
    Movie.findByIdAndUpdate(movieId)
        .then(movieFromDb => {
            res.render("movies/edit", { movie: movieFromDb})
        })
        .catch(err => {
            next(err)
          })
})

// EDIT II 
router.post('/movies/:id', (req, res, next) => {
    const movieId = req.params.id
    const { title, genre, plot, cast } = req.body
    Movie.findByIdAndUpdate(movieId, {
        title, genre, plot, cast
    })
      .then(() => {
        res.redirect(`/movies/${movieId}`)
      })
      .catch(err => {
        next(err)
      })
  })
  

module.exports = router;