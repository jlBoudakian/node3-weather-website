const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require(`./utils/forecast`);

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Juliana Boudakian'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me:',
        name: 'Juliana Boudakian'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page!',
        name: 'Juliana Boudakian',
        msg: 'Something went wrong! Contact us for help!'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address not valid'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
    
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            });
        });
    });


});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        msg: 'Help article not found!',
        name: 'Juliana Boudakian'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'Page not found!',
        name: 'Juliana Boudakian'
    });
});


app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});