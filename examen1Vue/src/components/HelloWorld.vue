<template>
    <div class="container m-5">
        <h1 v-on:click="hiInLog">{{ title }} {{ username }} {{ msg }}</h1>
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        Información
                    </div>
                    <div v-if="teacherSelected.name !== ''" class="card-body">
                        <h5 class="card-title">Mi nombre es  {{ teacherSelected.name }} {{ teacherSelected.lastName }} tengo  {{ teacherSelected.age }} años</h5>
                        <p class="card-text"> {{ teacherSelected.yearsOfExperience }} años de Experiencia  en  {{ teacherSelected.assignature }}.</p>
                        <a href="#">Linkedin {{ teacherSelected.linkedInURL }}</a>
                    </div>
                </div>
                <div class="col-md-12">>
                    <table class="table table-bordered mb-3 mt-2">
                        <tr>
                            <td>
                            <input class="form-control" type="text" v-model="name" placeholder="Nombres" />
                            </td>
                            <td>
                            <input class="form-control" type="text" v-model="lastName" placeholder="Apellidos" />
                            </td>
                            <td>
                            <input class="form-control" type="text" v-model="age" placeholder="Edad" />
                            </td>
                            <td>
                            <select class="form-control" v-model="assignature" placeholder="Especialidad">
                                <option
                                :value="item.value"
                                v-for="item in assignatures"
                                v-bind:key="item.id"
                                >
                                {{ item.label }}
                                </option>
                            </select>
                            </td>
                            <td>
                            <input class="form-control"
                                type="text"
                                v-model="yearsOfExperience"
                                placeholder="Años de experiencia"
                            />
                            </td>
                            <td>
                            <input class="form-control"
                                type="text"
                                v-model="linkedInURL"
                                placeholder="URL de LinkedIn"
                            />
                            </td>
                            <td>
                            <button class="btn btn-success" v-on:click="saveTeacher">Enviar</button>
                            </td>
                        </tr>
                    </table>
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th>Nombres</th>
                            <th>Epecialidad</th>
                            <th>Index</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr
                                @mouseover="showHiddenData(teacher.id)"
                                v-for="teacher in teachersList"
                                v-bind:key="teacher.id"
                                >
                                <td>{{ teacher.name }}</td>
                                <td>{{ teacher.assignature }}</td>
                                <td>{{ teacher.indexValue }}</td>
                                <td>
                                    <button class="btn btn-success" v-on:click="addIndex10(teacher.id)">+</button>
                                    <button class="btn btn-primary" v-on:click="minuIndex10(teacher.id)">-</button>
                                    <button class="btn btn-warning" v-on:click="deleteTeacher(teacher.id)">x</button>
                                    <button class="btn btn-info" v-on:click="evaluateTeacher(teacher.id)">Evaluar Indice</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
let counter = 0;
function evaluateTeacher(teacherID){
    const teacher = this.teachersList.find(item=>item.id===teacherID);
    axios.post('https://jsonplaceholder.typicode.com/todos',teacher)
    .then(function() {
        alert("Enviado correctamente");
    }).catch(function(error) {
        console.log("error",error);
    });
}
export default {
    name: "HelloWorld",
    props: {
        msg: String,
        username: {
        type: String,
        default: "Examen 1",
        },
    },
    data() {
        return {
            hover:false,
            title: "Resolución",
            name: "",
            lastName: "",
            age: "",
            assignature: "",
            yearsOfExperience: "",
            linkedInURL: "",
            teachersList: [],
            teacherSelected:{
                name: "",
                lastName: "",
                age: "",
                assignature: "",
                yearsOfExperience: "",
                linkedInURL: "",
            },
            assignatures: [
                {
                id: 0,
                label: "Matematicas",
                value: 3,
                },
                {
                id: 1,
                label: "Programación",
                value: 4,
                },
                {
                id: 2,
                label: "Física",
                value: 3,
                },
                {
                id: 3,
                label: "Arte",
                value: 3,
                },
            ],
        };
    },
    methods: {
        hiInLog() {
            alert("Hi!");
        },
        saveTeacher() {
            counter++;
            let teacher = {
                id: counter,
                name: this.name,
                lastName: this.lastName,
                age: this.age,
                assignature: this.assignature,
                yearsOfExperience: this.yearsOfExperience,
                linkedInURL: this.linkedInURL,
                indexValue:
                this.yearsOfExperience * this.assignature +
                (this.linkedInURL ? 10 : 0),
            };
            this.teachersList.push(teacher);
        },
        addIndex10(teacherID) {
            this.teachersList.map((item)=>{
                item.indexValue = item.id ===teacherID ?(item.indexValue*0.1)+item.indexValue:item.indexValue;
            })
        },
        minuIndex10(teacherID) {
            this.teachersList.map((item)=>{
                item.indexValue = item.id ===teacherID ?(item.indexValue-item.indexValue*0.1):item.indexValue;
            })
        },
        deleteTeacher(teacherID) {
            var removeIndex = this.teachersList.map(item => item.id).indexOf(teacherID);
            ~removeIndex && this.teachersList.splice(removeIndex, 1);
        },
        showHiddenData(teacherID){
            const teacher = this.teachersList.find(item=>item.id===teacherID)
            this.teacherSelected = teacher;
        },
        evaluateTeacher,
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .active tr:hover td{
        background: green;
    }
    h1 {
    margin: 40px 0 0;
    }
    ul {
    list-style-type: none;
    padding: 0;
    }
    li {
    display: inline-block;
    margin: 0 10px;
    }
    a {
    color: #333333;
    }
</style>
