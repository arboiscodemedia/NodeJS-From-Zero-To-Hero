var express = require("express")
var multer = require("multer")

var app = express()

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads')
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
        }

})

var upload = multer({ storage : storage})

app.use(express.static(__dirname+'/public'))
app.use('/uploads', express.static('uploads'))


var routes = require('./routes/index')
routes(app,upload)



app.set('port', process.env.PORT || 4000)

var server = app.listen(app.get('port'),
   function(err){
       if(err) throw err;
       var message = 'Server is running @ http://localhost:'+ server.address().port
       console.log(message)
   }
)