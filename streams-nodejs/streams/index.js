const express = require ('express')
const fs = require("fs")
const zlib = require('zlib')
const status = require('express-status-monitor')

const app =express()
const PORT = 3000

app.use(status())

fs.createReadStream("./sample.txt").pipe(zlib.createGzip().pipe(fs.createWriteStream("./sample.zip")))

app.get('/',(req,res)=>{
    const stream = fs.createReadStream('./sample.txt',"utf-8")
    stream.on("data",(chunk)=> res.write(chunk))
    stream.on("end",()=>res.end())
    })


app.listen(PORT,()=>{
    console.log(`server connected to port ${PORT}`);
})