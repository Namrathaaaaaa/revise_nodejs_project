const express = require('express')
const axios = require('axios')
const cors = require('cors')
require("dotenv").config();

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())


app.post('/weather',async(req,res)=>{
    const city = req.body.city
    console.log(city);
    if(!city){
        return res.status(400).json({error:"city is required"})
    }

    try {
        const API_KEY = process.env.REACT_APP_API_KEY
        console.log(API_KEY);
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        const result = await axios.get(URL)
        console.log(result.data);
        res.json(result.data)

    } catch (error) {
        res.status(500).json({error:"unable to fetch weather"})
    }

})


app.listen(PORT,()=>{
    console.log(`Server started at port: ${PORT}`);
})

