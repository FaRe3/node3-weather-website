const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { hasSubscribers } = require('diagnostics_channel')
const geocode= require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
// Define path for express config
const publicDirectoryPath= path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handelbars engine and view location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static director to server
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Sudhanshu Dixit'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'Contact Sudhanshu for any help',
        title: 'Help',
        name:'Sudhanshu Dixit'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Sudhannshu Dixit'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error })
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error })
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
        })
    })   

})


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get('/help/*',(req,res)=>{
    res.send("Help Article Not Foud")
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sudhanshu Dixit',
        errorMessage:'Page Not Found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})