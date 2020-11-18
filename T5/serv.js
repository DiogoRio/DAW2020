var http = require('http')
var axios = require('axios')
var fs = require('fs')

var currentdate = new Date(); 
var datetime =    currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();



http.createServer(function (req, res) {
    console.log("\n---------------------"
    + "\n" + req.method + " " + req.url + "\n" + datetime
    + "\n---------------------\n")

    if(req.method == 'GET'){
        switch (req.url){
            case (req.url.match(/^\/$/) || {}).input:
                fs.readFile('index.html', function(err, data) {
                    res.writeHead(200, {'Content-Type':'text/html;  charset=utf-8'})
                    res.write(data)
                    res.end()
             })
                break;
             case (req.url.match(/^\/alunos$/) || {}).input:
                axios.get('http://localhost:3000/alunos')
                .then( resp => {
                    alunos = resp.data
                    res.writeHead(200, {'Content-Type':'text/html;  charset=utf-8'})
                    res.write('<h2> Escola de Música: Lista de Alunos</h2>')
                    res.write('<ul>')
                    alunos.forEach(a => {
                        res.write('<li><a href=/alunos/' + a.id + '>' + a.id + ' - ' + a.nome + '</a></li>')
                    });
                    res.write('</ul>')
                    res.write('<address>[<a href="/"> Voltar </a>]</address>')
                    res.end()
                })  
            .catch(error => {
                console.log('Erro na obtenção da lista de alunos: ' + error);
            });
                break;
            case (req.url.match(/^\/alunos\/A[A-Za-z0-9\-]+$/) || {}).input:
                axios.get('http://localhost:3000/alunos/' + req.url.split("/")[2] )
                .then( resp => {
                    aluno = resp.data
                    res.writeHead(200, {'Content-Type':'text/html;  charset=utf-8'})
                    res.write('<h2> Escola de Música: ' + aluno.id + '</h2>')
                    res.write('<p>Nome: ' + aluno.nome)
                    res.write('</p>')
                    res.write('<p>Data Nascimento: ' + aluno.dataNasc)
                    res.write('</p>')
                    res.write('<p>Curso: ' + aluno.curso)
                    res.write('</p>')
                    res.write('<p>Ano: ' + aluno.anoCurso)
                    res.write('</p>')
                    res.write('<p>Instrumento: ' + aluno.instrumento)
                    res.write('</p>')
                    res.write('<address>[<a href="/alunos"> Voltar </a>]</address>')
                    res.end()
                })  
            .catch(error => {
                console.log('Erro na obtenção do aluno: ' + error);
                res.writeHead(200, {'Content-Type':'text/html;  charset=utf-8'})
                res.write('Erro na obtenção do aluno: ' + error.response.status);
                res.end()
            });
                break;
            case (req.url.match(/^\/instrumentos$/) || {}).input:
                axios.get('http://localhost:3000/instrumentos')
                .then( resp => {
                    inst = resp.data
                    res.writeHead(200, {'Content-Type':'text/html;  charset=utf-8'})
                    res.write('<h2> Escola de Música: Lista de Instrumentos</h2>')
                    res.write('<ul>')
                    inst.forEach(i => {
                        res.write('<li><a href=/instrumentos/' + i.id + '>' + i.id + ' - ' + i["#text"] + '</a></li>')
                    });
                    res.write('</ul>')
                    res.write('<address>[<a href="/"> Voltar </a>]</address>')
                    res.end()
                })  
            .catch(error => {
                console.log('Erro na obtenção da lista de instrumentos: ' + error);
            });
                break;
            case (req.url.match(/^\/instrumentos\/I[0-9]+$/) || {}).input:
                axios.get('http://localhost:3000/instrumentos/' + req.url.split("/")[2] )
                    .then( resp => {
                    inst = resp.data
                    res.writeHead(200, {'Content-Type':'text/html;  charset=utf-8'})
                    res.write('<h2> Escola de Música: ' + inst.id + '</h2>')
                    res.write('<p>Nome: ' + inst["#text"])
                    res.write('</p>')
                    res.write('<p>id: ' + inst.id)
                    res.write('</p>')
                    res.write('<address>[<a href="/instrumentos"> Voltar </a>]</address>')
                    res.end()
                    })  
                .catch(error => {
                    console.log('Erro na obtenção do instrumento: ' + error);
                    res.writeHead(200, {'Content-Type':'text/html;  charset=utf-8'})
                    res.write('Erro na obtenção do instrumento: ' + error.response.status);
                    res.end()
                });
                break;
            case (req.url.match(/^\/cursos$/) || {}).input:
                axios.get('http://localhost:3000/cursos')
                .then( resp => {
                    curso = resp.data
                    res.writeHead(200, {'Content-Type':'text/html;  charset=utf-8'})
                    res.write('<h2> Escola de Música: Lista de Cursos</h2>')
                    res.write('<ul>')
                    curso.forEach(c => {
                        res.write('<li><a href=/cursos/' + c.id + '>' + c.id + ' - ' + c.designacao + '</a></li>')
                    });
                    res.write('</ul>')
                    res.write('<address>[<a href="/"> Voltar </a>]</address>')
                    res.end()
                })  
            .catch(error => {
                console.log('Erro na obtenção da lista de cursos: ' + error);
            });
                break;

            case (req.url.match(/^\/cursos\/C[0-9A-Z]+$/) || {}).input:
                axios.get('http://localhost:3000/cursos/' + req.url.split("/")[2] )
                .then( resp => {
                curso = resp.data
                res.writeHead(200, {'Content-Type':'text/html;  charset=utf-8'})
                res.write('<h2> Escola de Música: ' + curso.id + '</h2>')
                res.write('<p>Nome: ' + curso.designacao)
                res.write('</p>')
                res.write('<p>Duração: ' + curso.duracao)
                res.write('</p>')
                res.write('<p>Instrumento: ' + curso.instrumento["#text"])
                res.write('</p>')
                res.write('<address>[<a href="/cursos"> Voltar </a>]</address>')
                res.end()
                })  
            .catch(error => {
                console.log('Erro na obtenção do curso: ' + error);
                res.writeHead(200, {'Content-Type':'text/html;  charset=utf-8'})
                res.write('Erro na obtenção do curso: ' + error.response.status);
                res.end()
            });
            break;

            

            default:
                res.writeHead(200, {'Content-Type':'text/html;  charset=utf-8'})
                res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
                res.end()
                break;
        }
    }
    else{
        res.writeHead(200, {'Content-Type':'text/html;  charset=utf-8'})
        res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
        res.end()
    }
}).listen(4000)