const path = require('path')
const express = require('express')
const hbs = require('hbs') //required for partials
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

//to generate a new instance of the application
const app = express()
const port = process.env.PORT || 3000 //extract the value that heroku provides available at process.env // env is an obj where we can access env. variables
//default fallback 3000

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') //this path will get handlebars to the right directory

//set up handlebars engine & views location
app.set('view engine', 'hbs') // setting up default engine
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) //takes a path to the directory where our partials live (hanndlebars module needs)

//set up static directory to serve
app.use(express.static(publicDirectoryPath)) //customize our server with 'use' //

//setting up of routes / setting up of route handlers

//render one of our views // express goes off and gets that view, it then converts in into html and makes sure the html
// goes back to the requester 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew  Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Andrew  Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew  Mead'
    })
})

//http endpoint that sends back json forecast info
//making http req. for forecast data from client side js in the browser
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address , (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude , (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
           
            console.log(req.query.address)
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })  
})

//create one url //we create an end point that sends back products to be displayed in the browser
app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })  
    }

    console.log(req.query.search)
    res.send({
        products: [
            {p1:"p1",
            b1:"b1"
            },
            {p1:"p2",
            b1:"b2"
            },
            {p1:"p3",
            b1:"b3"
            }
        ].filter((product) => product.p1 === req.query.search)
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew  Mead',
        errorMessage: 'Help article not found.',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew  Mead',
        errorMessage: 'Page not found.',
    })
})

// app.get('', (req,res) => { //lets us conf what we should do when someone tries to get the rsc. at a spcific URL
//     res.send('<h1>Weather</h1>') //the request is processed using this handler
// })



//other route handlers

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Andrew'
//     }, {
//         name: 'Sarah'
//     }])
//         // {
//     //     name: 'Andrew',
//     //     age: 26
//     // }
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })


app.listen(port, () => {   //starts up the server
    console.log('Server is running on port ' + port)
})