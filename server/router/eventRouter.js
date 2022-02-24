const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

/*
    Usage : Get all Free Events
    URL : http://127.0.0.1:5000/events/free-events
    Method : GET
    Fields : no-fields
    ACCESS : PUBLIC
 */
router.get('/free-events', async (request , response) => {
    try {
        let events = await Event.find({type : 'FREE'});
        response.status(200).json(events);
    }
    catch (error) {
        response.status(500).json(error);
    }
});

/*
    Usage : Get all Pro Events
    URL : http://127.0.0.1:5000/events/pro-events
    Method : GET
    Fields : no-fields
    ACCESS : PRIVATE
 */
router.get('/pro-events', async (request , response) => {
    try {
        let events = await Event.find({type : 'PRO'});
        response.status(200).json(events);
    }
    catch (error) {
        response.status(500).json(error);
    }
});


/*
    Usage : Upload Events
    URL : http://127.0.0.1:5000/events/upload
    Method : POST
    Fields : name , image , date , price , info , type
    ACCESS : PRIVATE
 */
router.post('/upload', async (request , response) => {
    try {
        let {name , image , date , price , info , type} = request.body;
        let event = new Event({name , image , date , price , info , type});
        event = await event.save();
        response.status(200).json(event);
    }
    catch (error) {
        response.status(500).json(error);
    }
});

module.exports = router;
