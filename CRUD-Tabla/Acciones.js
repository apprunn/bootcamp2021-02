function addRow() {
    var user, especialidad, nacionalidad, linkedin, salario;
    user            = document.getElementById("txtUser").value;
    especialidad    = document.getElementById("txtEspecialidad").value;
    nacionalidad    = document.getElementById("txtNacionalidad").value;
    linkedin        = document.getElementById("txtLinkedin").value;
    salario         = document.getElementById("txtSalario").value;
    
    if (user == "" || especialidad == "" || nacionalidad == "" || linkedin == "" || salario == "0.0") {
        alert("Llenar todos los campos por favor!");
    } else {
        document.getElementById("tblData").insertRow(-1).innerHTML = '<td>' + user + '</td><td>' + especialidad + '</td><td>' + nacionalidad + '</td><td>' + linkedin + '</td><td>' + salario + '</td><td><input id="btnView" type="button" value="Ver" onclick="actionExec(1)"/></td><td><input id="btnEdit" class = "btnEditar" type="button" value="Editar" onclick="actionExec(2)"/></td><td><input id="btnDelete" type="button" value="Eliminar" onclick="actionExec(3)"/></td>';
        actionClear();
    }
}

function actionExec(tnParam) {
    switch (tnParam) {
        case 1:
            viewRow();
            break;
        
        case 2:
            updateRow();
            break;

        case 3:
            if(confirm("¿Está seguro en eliminar esta fila?")){
                deleteRow();
                actionClear()
            }
            break;

        default:
            alert("PRESIONO VER");
            break;
    }
}

function deleteRow() {
    var td = event.target.parentNode; 
    var tr = td.parentNode;
    var index = Array.from(tr.parentNode.children).indexOf(tr);
    tr.parentNode.removeChild(tr);
}

function viewRow() {
    // TRatar de seleccionar la fila en la que se encuentra al dar click tambien
    var lsResul = "";
    if($("tr.selected td:nth-child(1)" ).html() != undefined) {
    lsResul = " ***** USTED SELECCIONO ***** \nUser Github: " + $("tr.selected td:nth-child(1)" ).html() + 
        "\nEspecialidad:    " + $("tr.selected td:nth-child(2)" ).html() +
        "\nNacionalidad:    " + $("tr.selected td:nth-child(3)" ).html() +
        "\nLinkedin:        " + $("tr.selected td:nth-child(4)" ).html() +
        "\nSalario:         " + $("tr.selected td:nth-child(5)" ).html();
    }else{
        lsResul = "Por facor seleccione una fila para poder visualizarlo";
    }
    alert(lsResul);
}

function updateRow() {
    document.getElementById("btnAdd").style.display = 'none';
    document.getElementById("btnUpdate").style.display = 'block';
}

function actionUpdate() {
    var user, especialidad, nacionalidad, linkedin, salario;
    user            = document.getElementById("txtUser").value;
    especialidad    = document.getElementById("txtEspecialidad").value;
    nacionalidad    = document.getElementById("txtNacionalidad").value;
    linkedin        = document.getElementById("txtLinkedin").value;
    salario         = document.getElementById("txtSalario").value;

    selected.innerHTML = '<td>' + user + '</td><td>' + especialidad + '</td><td>' + nacionalidad + '</td><td>' + linkedin + '</td><td>' + salario + '</td><td><input id="btnView" type="button" value="Ver" onclick="actionExec(1)"/></td><td><input id="btnEdit" class = "btnEditar" type="button" value="Editar" onclick="actionExec(2)"/></td><td><input id="btnDelete" type="button" value="Eliminar" onclick="actionExec(3)"/></td>';
    document.querySelectorAll('table');

    actionClear();

    document.getElementById("btnAdd").style.display = 'block';
    document.getElementById("btnUpdate").style.display = 'none';

    //document.getElementById('selected').style.display = 'none';

    //selected.updateRow().innerHTML = '<td>' + user + '</td><td>' + especialidad + '</td><td>' + nacionalidad + '</td><td>' + linkedin + '</td><td>' + salario + '</td><td><input id="btnView" type="button" value="Ver" onclick="actionExec(1)"/></td><td><input id="btnEdit" class = "btnEditar" type="button" value="Editar" onclick="actionExec(2)"/></td><td><input id="btnDelete" type="button" value="Eliminar" onclick="actionExec(3)"/></td>';
    
}

function actionClear() {
    document.getElementById("txtUser").value = "";
    document.getElementById("txtEspecialidad").value = "";
    document.getElementById("txtNacionalidad").value = "";
    document.getElementById("txtLinkedin").value = "";
    document.getElementById("txtSalario").value = "0.0";
}

function highlight(e) {
    if (selected[0]) selected[0].className = '';
    e.target.parentNode.className = 'selected';  

    if($("tr.selected td:nth-child(1)" ).html() != undefined){
        document.getElementById("txtUser").value            = $("tr.selected td:nth-child(1)" ).html();
        document.getElementById("txtEspecialidad").value    = $("tr.selected td:nth-child(2)" ).html();
        document.getElementById("txtNacionalidad").value    = $("tr.selected td:nth-child(3)" ).html();
        document.getElementById("txtLinkedin").value        = $("tr.selected td:nth-child(4)" ).html();  
        document.getElementById("txtSalario").value         = $("tr.selected td:nth-child(5)" ).html();
   
        document.getElementById("btnAdd").style.display = 'none';
        document.getElementById("btnUpdate").style.display = 'block';
    }

}

var table = document.getElementById('tblData'),
    selected = table.getElementsByClassName('selected');

table.onclick = highlight;
actionClear();
