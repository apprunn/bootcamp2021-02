<template>
  <div class="hello">
    <h1 v-on:click="hiInLog">{{title}} {{ username }} {{ msg }}</h1>
    <table>
      <tr>
        <td>
          <input type="text" v-model="name" placeholder="Nombres">
        </td>
        <td>
          <input type="text" v-model="lastName" placeholder="Apellidos">
        </td>
        <td>
          <input type="text" v-model="age" placeholder="Edad">
        </td>
        <td>
          <select v-model="assignature" placeholder="Especialidad">
            <option :value="item.value" v-for="item in assignatures" v-bind:key="item.id">
              {{item.label}}
            </option>
          </select>
        </td>
        <td>
          <input type="text" v-model="yearsOfExperience" placeholder="Años de experiencia">
        </td>
        <td>
          <input type="text" v-model="linkedInURL" placeholder="URL de LinkedIn">
        </td>
        <td>
          <v-btn v-on:click="saveTeacher">Enviar</v-btn>
        </td>
      </tr>
    </table>
    <ul>
      <li v-for="teacher in teachersList" v-bind:key="teacher.name" v-on:mouseover="showHiddenData()" v-on:mouseleave="showData(teacherID)">
       {{teacher.message}}
        <v-btn v-on:click="addIndex10(teacher.id)">+</v-btn>
        <v-btn v-on:click="minuIndex10(teacher.id)">-</v-btn>
        <v-btn v-on:click="deleteTeacher(teacher.id)">x</v-btn>
        <v-btn v-on:click="evaluateTeacher(teacher.id)">Evaluar Indice</v-btn>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios';
let counter = 0;
export default {
  name: 'Exam',
  props: {
    msg: String,
    username: {
      type: String,
      default: 'Hernan'
    }
  },
  data:() => ({
      message: '',
      title: 'Hello',
      name:'',
      lastName:'',
      age:'',
      assignature:'',
      yearsOfExperience:'',
      linkedInURL: '',
      teachersList: [],
      assignatures: [
        {
          id: 0,
          label: 'Matematicas',
          value: 3
        },
        {
          id: 1,
          label: 'Programación',
          value: 4
        },
        {
          id: 2,
          label: 'Física',
          value: 3
        },
        {
          id: 3,
          label: 'Arte',
          value: 3
        },
      ]
  }),
  methods: {
    hiInLog() {
      alert('Hi!');
    },
     showData(){
       const response = this.teachersList.map((item) => {
        const newItem = { ...item };
              newItem.message = newItem.name + ' - ' + newItem.assignature+' - '+newItem.indexValue
              return newItem;
          });
      this.teachersList = response;
    },
   showHiddenData(){
       const response = this.teachersList.map((item) => {
        const newItem = { ...item };
              newItem.message = newItem.name + ' - '+newItem.lastName +' - '+ newItem.age+ ' - '+newItem.assignature+' - '+newItem.yearsOfExperience+' - '+newItem.indexValue
              return newItem;
          });
      this.teachersList = response;
    },
    saveTeacher() {
      counter++
      let teacher = {
        id: counter,
        name: this.name,
        lastName: this.lastName,
        age: this.age,
        assignature: this.assignature,
        yearsOfExperience: this.yearsOfExperience,
        linkedInURL: this.linkedInURL,
        indexValue: this.yearsOfExperience * this.assignature + (this.linkedInURL ? 10:0)
      };
      this.teachersList.push(teacher);
      teacher.message = teacher.name + ' - ' + teacher.assignature+' - '+teacher.indexValue
    },
    addIndex10(teacherID) {
      let response = this.teachersList.map((item) => {
        let newItem = { ...item };
           newItem.indexValue = newItem.id === teacherID ? newItem.indexValue + 10 : newItem.indexValue
              return newItem;
          });
      this.teachersList = response;
    },
    minuIndex10(teacherID) {
      const response = this.teachersList.map((item) => {
        const newItem = { ...item };
              newItem.indexValue = newItem.id === teacherID ?  newItem.indexValue - 10 : newItem.indexValue
              return newItem;
          });
      this.teachersList = response;
    },
    deleteTeacher(teacherID) {
       let index = this.teachersList.findIndex(element => element.id === teacherID);
    this.teachersList.splice(index, 1);
    },
  
    evaluateTeacher(teacherID) {
     let data = this.teachersList.find(element => element.id === teacherID);
        if (data.indexValue < 201) {
                axios.post("https://jsonplaceholder.typicode.com/todos/", data.indexValue)
                                .then(response =>{
                                  console.log(response)
                                alert(response.data.title);
                    }); 
        } else {
          alert("Indice muy alto");
        }
    }, 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 40px 0 0;
  background: rgb(115, 255, 0);
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
  color: #42b983;
}
</style>


