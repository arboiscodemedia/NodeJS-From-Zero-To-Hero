const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const path = require('path')

const app = express();

//override with POST having ?_method
app.use(methodOverride('_method', {methods: ['POST' , 'GET']} ))




app.use(express.json({}))
app.use(express.urlencoded(
  {
    extended: true
  }
))


app.engine('hbs',exphbs({
  extname: '.hbs'
}))

app.set('view engine','hbs')


app.use(express.static(path.join(__dirname,'public')))


var routes = require('./routes/index')
routes(app)


const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log('Server is running at port ' + port);
})