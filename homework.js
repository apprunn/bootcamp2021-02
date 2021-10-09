function  add_row(values, pos, i) {
    let table = document.getElementById("data_table");
    let table_len = (table.rows.length);
    let content = "<tr id='row" + table_len + "'>";
    content += "<td><input type='text' class='form-control'  id='new_name" + table_len + "' value='" + values[0] + "'></td>";
    content += "<td><input type='text' class='form-control'  id='new_last_name" + table_len + "' value='" + values[1] + "'></td>";
    content += "<td><input type='text' class='form-control'  id='new_area" + table_len + "' value='" + values[2] + "'></td>";
    content += "<td><input type='text' class='form-control'  id='new_salary" + table_len + "' value='" + values[3] + "'></td>";
    content += "<td><input type='text' class='form-control'  id='new_linkedin" + table_len + "' value='" + values[4] + "'></td>";
    content += "<td>";
    content += "<input type='button' id='view_button" + table_len + "' value='Ver' class='btn btn-success' onclick='view_row(" + table_len + ")'>";
    content += "<input type='button' id='edit_button' value='Editar' class='btn btn-primary' onclick='edit_row(" + table_len + ")'>";
    content += "<input type='button' value='Eliminar' class='btn btn-danger' onclick='delete_row(this," + table_len + ")'>";
    content += "</td>";
    content += "<td><input type='hidden' id='complete" + table_len + "' value='false'></td>";
    content += "<td><input type='text' id='index" + table_len + "' value='" + table_len + "'></td>";
    content += "</tr>";
    // content +=" </tbody>";

    document.getElementById("data_table").insertRow(-1).outerHTML = content;


    // document.getElementById("new_name").value = "";
    // document.getElementById("new_last_name").value = "";
    // document.getElementById("new_area").value = "";
    // document.getElementById("new_salary").value = "";
    // document.getElementById("new_linkedin").value = "";
}
function save_data() {
    let table = document.getElementById("data_table");
    let rowCount = table.rows.length;


    for (let i = 1; i < rowCount; i++) {
        let loadData = "<tr id='row" + i + "'>";
        let complete = document.getElementById("complete" + i).value;
        if (complete == "true") {
            console.log("Entoy lleno");
            continue;
        }
        let name = document.getElementById("new_name" + i).value;
        let last = document.getElementById("new_last_name" + i).value;
        let area = document.getElementById("new_area" + i).value;
        let salary = document.getElementById("new_salary" + i).value;
        let linkedin = document.getElementById("new_linkedin" + i).value;
        if (name == "" || last == "" || area == "" || salary == "" || linkedin == "") {
            continue;

        } else {


            loadData += "<td id='new_name" + i + "'>" + name + "</td>";
            loadData += "<td id='new_last_name" + i + "'>" + last + "</td>";
            loadData += "<td id='new_area" + i + "'>" + area + "</td>";
            loadData += "<td id='new_salary" + i + "'>" + salary + "</td>";
            loadData += "<td id='new_linkedin" + i + "'>" + linkedin + "</td>";
            loadData += "<td>";
            loadData += "<input type='button' id='view_button" + i + "' value='Ver' class='btn btn-success' onclick='view_row(" + i + ")'>";
            loadData += "<input type='button' id='edit_button' value='Editar' class='btn btn-primary' onclick='edit_row(" + i + ")'>";
            loadData += "<input type='button' value='Eliminar' class='btn btn-danger' onclick='delete_row(this, " + i + ")'>";
            loadData += "</td>";
            loadData += "<td><input type='hidden' id='complete" + i + "' value='true'></td>";
            loadData += "<td><input type='text' id='index" + i + "' value='" + i + "'></td>";
            loadData += "</tr>";
            deleteRow(i);
            document.getElementById("data_table").insertRow(i).innerHTML = loadData;
            document.getElementById("new_name" + i).value = name;
            document.getElementById("new_last_name" + i).value = last;
            document.getElementById("new_area" + i).value = area;
            document.getElementById("new_salary" + i).value = salary;
            document.getElementById("new_linkedin" + i).value = linkedin;
            // table.insertRow(i).innerHTML = loadData;
        }
        // let row = document.getElementById("row" + i);
        // row.deleteCell(0);

    }

}

function view_row(i) {
    console.log(i)
    let complete = document.getElementById("complete" + i).value;
    if (complete == "false") {
        alert("Aun no completas todos los campos");
    } else {
        let name = document.getElementById("new_name" + i).value;
        let last = document.getElementById("new_last_name" + i).value;
        let area = document.getElementById("new_area" + i).value;
        let salary = document.getElementById("new_salary" + i).value;
        let linkedin = document.getElementById("new_linkedin" + i).value;
        alert(
            "Nombre:" + name + "\n" +
            "Apellido:" + last + "\n" +
            "Area:" + area + "\n" +
            "Salario:" + salary + "\n" +
            "Linkedin:" + linkedin + "\n"
        )

    }


}
function edit_row(i) {


    let complete = document.getElementById("complete" + i).value;
    if (complete == 'false') {
        alert("Debes completar todos los campos");
    } else {
        let name = document.getElementById("new_name" + i).value;
        let last = document.getElementById("new_last_name" + i).value;
        let area = document.getElementById("new_area" + i).value;
        let salary = document.getElementById("new_salary" + i).value;
        let linkedin = document.getElementById("new_linkedin" + i).value;
        let values = [name, last, area, salary, linkedin, complete]
        let pos = document.getElementById('index'+i).value;
        // deleteRow(i);
        
       
       

    }


}
function delete_row(btn, val) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
    console.log(val)
    let table = document.getElementById("data_table");
    let rowCount = table.rows.length;
    var aux = 1;
    for (let i = 1; i <= rowCount; i++) {
        if (i != val) {
            document.getElementById('index' + i).setAttribute('value', aux)
            aux++;
            console.log("aux:" + aux)
        }

    }

}
function deleteRow(no) {
    console.log(no)
    let table = document.getElementById("data_table");
    var rowCount = table.rows.length;
    console.log(rowCount);
    if (rowCount <= 1)
        alert('No se puede eliminar el encabezado');
    else
        table.deleteRow(no);
}