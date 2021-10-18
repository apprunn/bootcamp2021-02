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
          <button v-on:click="saveTeacher">Enviar</button>
        </td>
      </tr>
    </table>
    <ul>
      <li v-for="teacher in teachersList" v-bind:key="teacher.name" v-on:mouseover="showHiddenData(teacher.id)">
        {{teacher.name}} - {{teacher.assignature}} - {{teacher.indexValue}}
        <button v-on:click="addIndex10(teacher.id)">+</button>
        <button v-on:click="minuIndex10(teacher.id)">-</button>
        <button v-on:click="deleteTeacher(teacher.id)">x</button>
        <button v-on:click="evaluateTeacher(teacher.id)">Evaluar Indice</button>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios';
let counter = 0;
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    username: {
      type: String,
      default: 'Jose'
    }
  },
  data() {
    return {
      title: 'Sir',
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
    }
  },
  methods: {
    hiInLog() {
      alert('Hi!');
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
    },
    addIndex10(teacherID) {
      const response = this.teachersList.map((item) => {
        const newItem = { ...item };
           newItem.indexValue = newItem.id === teacherID ?  Math.round(newItem.indexValue + (newItem.indexValue * 0.1)) : newItem.indexValue
              return newItem;
          });
      this.teachersList = response;
    },
    minuIndex10(teacherID) {
      const response = this.teachersList.map((item) => {
        const newItem = { ...item };
              newItem.indexValue = newItem.id === teacherID ?  Math.round(newItem.indexValue - (newItem.indexValue * 0.1)) : newItem.indexValue
              return newItem;
          });
      this.teachersList = response;
    },
    deleteTeacher(teacherID) {
       let transactionIndexInArray = this.teachersList.findIndex(element => element.id === teacherID);
    this.teachersList.splice(transactionIndexInArray, 1);
    },
  
    evaluateTeacher(teacherID) {
     let data = this.teachersList.find(element => element.id === teacherID);
        if (data.indexValue > 20) {
                alert("FELICITACIONESS");
                axios.post("https://jsonplaceholder.typicode.com/todos/", this.teachersList)
                                .then(response =>{
                                console.log(response);
                    }); 
        } else {
          alert("LE RECOMIENDO VOLVER A EVALULARLO");
        }
    }, 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 40px 0 0;
  background: red;
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


