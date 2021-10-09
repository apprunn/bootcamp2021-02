import data from './dataModel.json' assert { type: "json" };
    
    if(localStorage.getItem('dataJson') == null){
        localStorage.setItem('dataJson', JSON.stringify(data));
    }

    let dataFromDB = JSON.parse(localStorage.getItem('dataJson'));
    
    let tabla = document.getElementById('dataTable');
    let tableBody = tabla.getElementsByTagName('tbody')[0];

    const loadTable = (source) => {
        tableBody.innerHTML = "";
        source.forEach((element, index) => {
            let row = document.createElement('tr');
            let updBtn = document.createElement('button');
            let delBtn = document.createElement('button');
            delBtn.setAttribute('id', `delete`);
            updBtn.setAttribute('id', 'update');
            delBtn.setAttribute('record-id', index);
            updBtn.setAttribute('record-id', index);
            delBtn.innerHTML = "Eliminar"
            updBtn.innerHTML = "Ver"
            for (const property in element) {
                let cell = document.createElement('td');
                cell.innerHTML = element[property];
                row.appendChild(cell);
            }
            let cellActions = row.insertCell();
            cellActions.appendChild(updBtn);
            cellActions.appendChild(delBtn);
            tableBody.appendChild(row);
        })
    }

    loadTable(dataFromDB);
    const form = document.querySelector('#myForm');

    function dataFromForm() {
        const name = document.getElementById('name');
        const age = document.getElementById('age');
        const job = document.getElementById('job');
        const salary = document.getElementById('salary');
        return {name: name.value, age: age.value, job: job.value, salary: salary.value};
    }
    
    const create = (data) => {
        dataFromDB.push(data);
        localStorage.setItem('dataJson', JSON.stringify(dataFromDB));
        form.reset();
    }

    const erase = (index) => {
        dataFromDB.splice(index,1);
        localStorage.setItem('dataJson', JSON.stringify(dataFromDB));
    }

    const getData = (index) => {
        let dataSelected = dataFromDB[index];
        document.getElementById('name').value = dataSelected.name;
        document.getElementById('age').value = dataSelected.age;
        document.getElementById('job').value = dataSelected.job;
        document.getElementById('salary').value = dataSelected.salary;
    }


    const update = (index, data) => {
        dataFromDB[index] = data;
        localStorage.setItem('dataJson', JSON.stringify(dataFromDB));
        form.reset();
    }



    document.querySelector('#createBtn').addEventListener('click', (e) => {
        e.preventDefault();
        create(dataFromForm());
        loadTable(dataFromDB);
    });

    document.querySelector('#updateBtn').addEventListener('click', (e) => {
        e.preventDefault();
        let record = document.querySelector('#updateBtn').getAttribute('record');
        update(record, dataFromForm());
        loadTable(dataFromDB);
    })

    tabla.addEventListener('click', function(e){
        let event = e.target;
        let record = event.getAttribute('record-id');
        let action = event.getAttribute('id')
        if(event.nodeName === 'BUTTON'){
            if(action === 'delete'){
                erase(record);
            }else if (action === 'update'){
                getData(record);
                document.querySelector('#updateBtn').setAttribute('record', record);
            }
        };
        loadTable(dataFromDB);
    })

