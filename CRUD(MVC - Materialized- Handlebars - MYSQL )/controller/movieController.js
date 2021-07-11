const Movie = require('../model/movie')
 

exports.getMovies = async (req,res)=>{
       await Movie.getAll(function (err,data) {
          if(err)
          res.status(500).send({
              message: err.message || 'Some error occured while retieving Movie.'
          });
          else res.render('index', { movies  : data })   
       })

}


exports.addMovie = async (req,res)=>{
    res.render('add')
}


exports.createMovie = function (req,res){
   
    var new_movie = new Movie(req.body)
    if(!req.body){
        res.status(400).send({
            message: 'Content can not be empty!'
        })
    }
    else{
        Movie.create ( new_movie, function(err,data){
            if(err){
               res.status(500).send({
                   message: err.message || "Some error occured while creating the Movie"
               })
             }
             else{
                 res.redirect('/')
             }  
        })

    }

}


   exports.editMovie = async (req, res) =>{
          res.render('edit')
   }

  exports.findOne = function (req,res){
      Movie.findById(req.params.movieId,function(err,data){
          if(err){
              if(err.kind === "not found"){
                  res.status(404).send({
                      message: `Not found movie with an id of ${req.params.movieId}`
                  })
              }
              else{
                  res.status(500).send({
                      message: `Error retrieving movie with an id of ${req.params.movieId}`
                  })
              }
          }
          else{
              res.render('edit', {movie :data})
          }
      })
 
  }

  exports.Update = function( req, res){
       if(!req.body){
          res.status(400).send({
              message: "Content cannot be empty!"
          })  
       }
       // console.log(req.body)
       Movie.updateById(req.params.movieId, new Movie(req.body),
          function(err,data){
              if(err){
                  if(err.kind === "not found"){
                      res.status(404).send({
                          message: `Not Found movie with id ${req.params.movieId}`
                      })
                  }
                  else{
                        res.status(500).send({
                          message: `Error updating movie with id ${req.params.movieId}`
                      })
                  }
              }
              else res.redirect('/');
          }
       ) 


  }

 exports.Delete = (req, res) =>{
    Movie.remove(req.params.movieId, 
    function(err,data){
        if(err){
             if(err.kind === "not found"){
                      res.status(404).send({
                          message: `Not Found movie with id ${req.params.movieId}`
                      })
                  }
             else{
                res.status(500).send({
                    message: `Could not delete movie with id ${req.params.movieId}`
                }) 
              }
         } else res.redirect('/')
      })
 }





  





