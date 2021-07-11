const sql = require('../db')


var Movie = function(movie){
    this.title  = movie.title
    this.description =  movie.description
}

Movie.getAll = function (result) {
    sql.query("Select * from movies", function (err, res) {
        if(err){
          console.log("error: ", err);
          result(null,err)
         }else{
             console.log("movies: ", res)
             result(null, res);
         }
    })
}


Movie.create = function (newMovie,result) {
      sql.query("INSERT INTO movies SET ?", newMovie,function(err,res){
          if(err){
              console.log("error: ", err);
              result(null,err)
          }
          else{
              console.log("Create movie:",{id: res.insertId,...newMovie})
              result(null,{id: res.insertId,...newMovie})
          }
      })   
}

Movie.findById = function(movieId, result){
      sql.query(`Select * from movies where id = ${movieId}`,function(err,res){
          if(err){
             console.log("error: ", err);
              result(err,null)
              return;
          }
          if(res.length){
               console.log("Found movies:", res[0])
               result(null,res[0]);
               return;  
            }
           result({ movie: "not found"},null) 
      }) 
}

Movie.updateById = (id, movie ,result) => {
     //console.log("Test Value: " + movie.title, movie.description , movie.id)
   sql.query("Update movies SET title = ?, description = ? Where id = ? ",
        [movie.title, movie.description , id],
        (err,res) => {
            if(err){
                 console.log("error: ", err);
                 result(null,err)
                 return;
            }
            if (res.affectedRows == 0){
                result({movie: "not found"}, null)
                return;
            }
           
           console.log("Updated movies:",{ id: id, ... movie });
           result(null,{ id: id, ... movie })
        }
    ) 
}

Movie.remove= ( id , result) =>{
    sql.query("DELETE From movies Where id = ?", id, 
    (err,res)=>{
       if(err){
             console.log("error: ", err);
             result(null,err)
               return;
        }
        if (res.affectedRows == 0){
                result({movie: "not found"}, null)
                return;
            } 
         console.log("Deleted movies with id :" ,id);
           result(null,res) 
    }) 

}



module.exports = Movie;