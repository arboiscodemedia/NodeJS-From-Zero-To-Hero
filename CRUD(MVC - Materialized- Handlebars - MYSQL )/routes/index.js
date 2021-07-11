const movieController = require('../controller/movieController')
module.exports = function (app) {
    
    app.get('/', movieController.getMovies)
    app.get('/add', movieController.addMovie)
    app.get('/movies/edit/:movieId', movieController.findOne)   
    app.put('/movies/:movieId', movieController.Update) 
    app.delete('/movies/delete/:movieId', movieController.Delete) 
    


    app.post('/movies',movieController.createMovie)

}