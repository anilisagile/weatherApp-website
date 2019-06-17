const path = require('path');
const express =  require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

//Define paths for express config
const port = process.env.PORT || 3000
const app = express();
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static dierectory to serve
app.use(express.static(publicDirectoryPath))
 app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
 }) 

 app.get('/help', (req, res) => {

    res.render('help', {
    title: 'Help',
    name: 'Anil kumar'
    })

}) 

app.get('/about', (req, res) => {

     res.render('about', {
         title: 'About',
         name: 'Anil kumar'
     })

 }) 

app.get('/weather', (req, res) => {

    
    if (!req.query.address){
        return res.send( {
            errorMessage: 'You must provide address!!'
        })
    }
    geocode(req.query.address, (error, {lattitude, longitude, location } = {} ) => {
    if(error){
        return res.send({error})
    }

    forecast(lattitude, longitude, (error, forecastData) => {
        if(error){
            return res.send({error})
        }

        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })

    })
})



})


app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send( {
            error: 'You Must provode a seaerch term'
        })
    }
    console.log(req.query.search)
    res.send( {
        products: []
    })

}) 

app.get('/help/*', (req, res) => {

    res.render('404', {
        title: 'Help 404',
        name: 'Anil Kumar',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {

    res.render('404', {
        title: 'About Page',
        name: 'Anil Kumar',
        errorMsg: 'My 404 Page'
    })

})

app.listen(port, () => {
    console.log('server is up on port '+port)
}) 