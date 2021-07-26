const express = require("express")
const JWT = require('jsonwebtoken')


const app = express()

app.use(express.json({}))
app.use(express.urlencoded({
    extended:true
}))



const verifyToken = async(req,res,next) =>{
    const bearerHeader = req.headers["authorization"]

    if(bearerHeader){
        const bearer = bearerHeader.split(" ")[1]
         req.token = bearer;
         next();
             
     } else{
         return res.json({
             msg: "Forbidden request."
         })
     }
    
}




app.post("/login", (req,res)=>{
  
    const userData ={
        fullname: "Ricardo Arbois",
        username: "ricky",
        password: 12345
    }

    const { username, password } = req.body

     if( username == userData.username && password == userData.password){
         delete userData.password
         
         JWT.sign({userData},"secretKey",{expiresIn: "30s"},
          (err, token) =>{
              res.json({token})
          }
         ) 
     }
     else{
         return res.status(401).json({
             error: true,
             message: "Username or Password is invalid"
         })
     }

})


app.post("/welcome", verifyToken,(req, res)=>{
    JWT.verify(req.token,"secretKey",
    (err,authData)=>{
        if(err){
            return res.json({
                msg: "Token Expires"
            })
        } else{
            res.json({
                msg: "Authentication successfully",
                authData
            })
          }
        })
    })






app.get("/home",(req,res)=>{
    res.json({
        msg: "Welcome to Home Page"
    })
})



const PORT = 5000
app.listen(PORT,()=>console.log("Server running on port "+ PORT))