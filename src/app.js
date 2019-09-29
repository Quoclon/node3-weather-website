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

reviewArray = []

// Actually our Hostel Route - TODO: Change Route Name
// app.get('/reviews', (req, res) => {
//     if(!req.query.property){
//         return res.send("Please provide a hostel number")
//     }

//     let property = trimhostelurl(req.query.property)
//     let page = '1'

//     hostelscrape(property, page,  (error, {body} = {}) => {
//         if(error){
//             console.log("ERROR")
//             return res.send({ error })
//         }else{
//             res.send(body.reviews)
//         }
//     })
// })

// app.get("/getdata", async function(req, res){  
//     var data = await pullData();
//     var filteredData = await filterByYear(data);
//     res.json(filteredData);
//  })

app.get('/reviews', async function(req, res){  
    if(!req.query.property){
        return res.send("Please provide a hostel number")
    }

    let property = await trimhostelurl(req.query.property)
    let page = 3

    let reviews = await hostelscrape(property, page)
    //console.log("BIG TEST: " + reviews)
    res.send(reviews)

})


// app.get('/weather', (req, res) => {
//     if(!req.query.address){
//         return res.send("Please provide an address")
//     }

//     geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
//         if(error){
//             return res.send({ error })
//         }
        
//         forecast(latitude, longitude, (error, forecastData) => {
//             if(error){
//                 return res.send({ error })
//             }
            
//             res.send({
//                 address: req.query.address,
//                 location,
//                 forecast: forecastData,
//                 latitude,
//                 longitude
//             })
  
//           })
//     })
// })

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