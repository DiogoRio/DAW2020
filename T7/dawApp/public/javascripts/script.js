function update(){
    var data = {};
    data.numero = $("input[name=numero]").val();
    data.nome  = $("input[name=nome]").val();
    data.git  = $("input[name=git]").val();
    var json = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
       window.location.href = "/students/"+ data.numero;
    }

    xhr.open("PUT", '/students/'+ data.numero, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send(json);
}

function deleteStudent(number){
    axios.delete('/students/'+number)
        .then( () => location.reload() )
        .catch( err => console.log(err))
}