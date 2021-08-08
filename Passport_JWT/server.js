var express = require("express")
var _= require("lodash")
var jwt = require("jsonwebtoken")

var passport = require("passport")
var passportJWT = require("passport-jwt")


var ExtractJwt = passportJWT.ExtractJwt
var JwtStrategy = passportJWT.Strategy;


var users = [
    {
        id: 1,
        username: 'ricky',
        password: '12345'
    },
    {
        id: 2,
        username: 'rich',
        password: '67890'
    }
]


var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = 'MySecret'


var strategy = new JwtStrategy(jwtOptions,
     function(jwt_payload,next){
         console.log('payload received', jwt_payload)
         var user = users[_.findIndex(users,{id: jwt_payload.id})]
          if(user){
              next(null, user)
          }
          else{
              next(null,false)
          }
     }
    )

passport.use(strategy)

var app = express()
app.use(passport.initialize())

app.use(express.json({}))
app.use(express.urlencoded({
    extended:true
}))



app.get("/", function(req,res){
    res.json({
        message: "Welcome!"
    })
})



app.post("/login", function(req,res){    
    if(req.body.username && req.body.password){
        var username = req.body.username
        var password = req.body.password
       
          var user = users[_.findIndex(users,{username:username})]
         if(!user){
             res.status(401).json({
                 message: 'no such user found'
             })
         }
         else{

            if(user.password === req.body.password){
                var payload = { id: user.id } 
                var token = jwt.sign(payload,jwtOptions.secretOrKey)            
                res.json({
                    message: "ok",
                    token: token

                })
             } else{
                 res.status(401).json({
                     message: "Password did not match"
                 })
             }
            }
    }
})

 app.get("/authSecretPage", passport.authenticate('jwt',{session: false}),
    function(req,res){
        res.json({message: "Success! Your token is valid"})
    })




app.set('port', process.env.PORT || 4000)
var server = app.listen(app.get('port'),
    function(err){
        if(err) throw err;
        var message = 'Server is running @ http://localhost:' + server.address().port
        console.log(message)
    }
)