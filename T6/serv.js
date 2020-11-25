var http = require('http')
var axios = require('axios')
var fs = require('fs')
var html = require('./html.js')
var static = require('./static.js')

var {parse} = require('querystring')


// Funções auxilidares


// Retrieves student info from request body --------------------------------
function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = '' //let != var --> var é global a todos os contextos para baixo, o let só é valido dentro do contexto
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            console.log(body)
            callback(parse(body))
        })
    }
}

// Criação do servidor

var tasksServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Tratamento do pedido
    if (static.recursoEstatico(req)) {
        static.sirvoRecursoEstatico(req, res)
    }
    else{
    switch(req.method){
        case "GET": 
            // GET / --------------------------------------------------------------------
            if(req.url == "/"){
                axios.get("http://localhost:3000/tasks?_sort=end_date&_order=asc")
                .then(response => {
                    var tasks = response.data
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write(html.generateTasksForm(d))
                    res.write(html.generatePendingTasks(tasks))
                    axios.get("http://localhost:3000/tasks")
                        .then(resp => {
                            var tasksR = resp.data
                            res.write(html.generateNotPendingTasks(tasksR,d))
                            res.end()
                        })
                        .catch(function (error) {
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write("<p>Error: Unable to show task list</p>")
                            res.end()
                        })
                })
                .catch(function (error) {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write("<p>Error: Unable to show task list</p>")
                    res.end()
                })
        }
        else {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
            res.write("<p>" + req.method + " " + req.url + " not suported.</p>")
            res.end()
        }
        break
        case "POST":
            if (req.url == "/") {
                recuperaInfo(req, function (info) {
                    if (info.desc != null){
                        info.solved = false
                        info.canceled = false
                        console.log('POST : ' + JSON.stringify(info))
                        axios.post('http://localhost:3000/tasks', info)
                            .then(resp => {
                                axios.get("http://localhost:3000/tasks?_sort=end_date&_order=asc")
                                    .then(response => {
                                        var tasks = response.data
                                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                        res.write(html.generateTasksForm(d))
                                        res.write(html.generatePendingTasks(tasks))

                                        axios.get("http://localhost:3000/tasks")
                                            .then(response => {
                                                var tasksR = response.data
                                                res.write(html.generateNotPendingTasks(tasksR,d))
                                                res.end()
                                            })
                                            .catch(function (error) {
                                                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                                res.write("<p>Error: Unable to show task list</p>")
                                                res.end()
                                            })
                                    })
                                    .catch(function (error) {
                                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                        res.write("<p>Error: Unable to show task list</p>")
                                        res.end()
                                    })
                            })
                            .catch(error => {
                                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                res.write('<p>Error making a task ' + error + '</p>')
                                res.end()
                            })
                    }
                    else{
                        axios.get("http://localhost:3000/tasks")
                            .then(response => {
                                var tasks = response.data
                                var rState = false
                                var cState = false
                                if(info.state == "Solved") rState = true
                                else if(info.state == "Cancel") cState = true

                                tasks.forEach(t => {
                                    if(t.id == info.id) {
                                        axios.put('http://localhost:3000/tasks/' + info.id, {
                                            "id": t.id,
                                            "begin_date": t.begin_date,
                                            "end_date": t.end_date,
                                            "desc": t.desc,
                                            "resp": t.resp,
                                            "type": t.type,
                                            "solved": rState,
                                            "canceled": cState
                                        }).then(resp => {
                                            console.log(resp.data);
                                        })
                                            .catch(error => {
                                                console.log("error: " + error)
                                            });
                                    }
                                })

                                axios.get("http://localhost:3000/tasks?_sort=end_date&_order=asc")
                                    .then(response => {
                                        var tasks = response.data
                                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                        res.write(html.generateTasksForm(d))
                                        res.write(html.generatePendingTasks(tasks))
                                        axios.get("http://localhost:3000/tasks")
                                            .then(resp => {
                                                var tasksR = resp.data
                                                res.write(html.generateNotPendingTasks(tasksR,d))
                                                res.end()
                                            })
                                            .catch(function (error) {
                                                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                                res.write("<p>Error: Unable to show task list</p>")
                                                res.end()
                                            })
                                    })
                                    .catch(function (error) {
                                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                        res.write("<p>Error: Unable to show task list</p>")
                                        res.end()
                                    })

                            })
                            .catch(function (error) {
                                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                res.write("<p>Error: Unable to show task list</p>")
                                res.end()
                            })
                    }
                    
                })
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                res.write("<p>" + req.method + " " + req.url + " not suported.</p>")
                res.end()
            }
            break
        default: 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " " + req.url + " not suported.</p>")
            res.end()
    }
}})


tasksServer.listen(7777)
console.log('Servidor à escuta na porta 7777...')