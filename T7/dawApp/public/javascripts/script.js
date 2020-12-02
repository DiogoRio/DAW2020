function update(){
    const newAluno = {
        numero: document.getElementById("numero").value,
        nome: document.getElementById("nome").value,
        git: document.getElementById("git").value
    }
    var xhr = new XMLHttpRequest();

    xhr.open("PUT", '/students/'+ newAluno.numero, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send(newAluno);

    xhr.onload = function () {
       window.location.href = "/students/"+ newAluno.numero;
    }
}

function deleteStudent(number){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        location.reload(); 
     }
    xhr.open("DELETE", '/students/'+number, true);
    console.log()
    xhr.send();
}