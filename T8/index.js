// index.js

/**
 * Required External Modules
 */

var express = require('express')
var bodyParser = require('body-parser')
var templates = require('./html-templates')
var jsonfile = require('jsonfile')
var logger = require('morgan')
var multer = require('multer')
var upload = multer({dest: 'uploads/'})
var fs = require('fs')

/**
 * App Variables
 */

var app = express()
var d = new Date().toISOString().substr(0,16)
var files = jsonfile.readFileSync('./dbFiles.json')


/**
 *  App Configuration
 */

app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static('public'))


/**
 * Routes Definitions
 */

app.get('/', (req,res) => {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
    res.write(templates.fileList(files,d))
    res.end()
})

app.get('/files/upload', (req,res) => {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
    res.write(templates.fileForm(d))
    res.end()
})

app.get('/files/download/:fname', (req,res) => {
    res.download(__dirname + '/public/fileStore/' + req.params.fname)
})

app.post('/files', upload.array('myFile'), (req,res) => {
    // For multiple files the func is upload.array(...) => files is an array
    // For single file suse upload.single()
    // req.file is the 'myFile' file
    // req.body will hold the text fields if any


    i=0
    req.files.forEach(file => {
        let oldPath = __dirname + '/' + file.path
        let newPath = __dirname + '/public/fileStore/' + file.originalname

        fs.rename(oldPath, newPath, err => {
            if (err) throw err
        })
        
        if(req.files.length > 1)
            description = req.body.desc[i]
        else
            description = req.body.desc

        files.push(
            {
                date: d,
                name: file.originalname,
                size: file.size,
                mimetype: file.mimetype,
                desc: description
            }
        )
        i += 1
        jsonfile.writeFileSync('./dbFiles.json', files)
    });
        

    res.redirect('/')
})




/**
 * Server Activation
 */

app.listen(7701, () => console.log('Started on port 7701...'))