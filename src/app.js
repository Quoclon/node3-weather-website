const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const hostelscrape = require('./utils/hostelscrape')
const trimhostelurl = require('./utils/trimhostelurl')



const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Page',
        name: 'Index Me',
        createdBy: 'Brodie'
    })
})

// Actually our Hostel Route - TODO: Change Route Name
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send("Please provide a hostel number")
    }

    let address = trimhostelurl(req.query.address)

    hostelscrape(address, (error, {body} = {}) => {
        if(error){
            return res.send({ error })
        }else{
            res.send(body.reviews)
        }
    })


})

app.get('/test', (req, res) => {
    if(!req.query.address){
        return res.send("Please provide an address")
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData,
                latitude,
                longitude
            })
  
          })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'About Me',
        createdBy: 'Broden'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Help Me',
        createdBy: 'Brodie'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Brodie',
        errorMessage: 'Help article not found'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Brodie',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000')
})