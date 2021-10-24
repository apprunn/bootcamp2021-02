<template>
  <v-app>
   

      <v-content>
        <v-card width="500" class="mx-auto mt-9">
          <v-card-title>Trabajo N#3</v-card-title>
          <v-card-text>
            <v-text-field v-model="name" label="Username" prepend-icon="mdi-account-circle"/>
            <v-text-field 
            label="Password" 
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"/>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="success"  :loading="loading" @click="loader = 'loading'" v-on:click="login()">Ingresar</v-btn>
            <v-btn color="info" v-on:click="forgetPass()">Olvide la Contraseña</v-btn>
          </v-card-actions>
        </v-card>
      </v-content>

      <template>
    <v-footer
      dark
      padless
    >
      <v-card
        class="flex"
        flat
        tile
      >
        <v-card-title class="teal">
        

          <v-spacer></v-spacer>

          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4"
            dark
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>Bootcamp</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </template>
  </v-app>
</template>
<script>
export default {
    name: 'Home',
  data()
  {
    return{
      showPassword:false,
      loader: null,
      loading: false,
    }
  },
  watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },
  methods:{
    login() {
      if(typeof(this.name) != "undefined"){
        if(typeof(this.password) != "undefined")
         alert('Bienvenido!'+'\n'+this.name);
        else{
          alert('Contraseña Incorrecta');
        }
      }else{
         alert('Debes completar todos los campos');
      }
    },
    forgetPass(){
      alert('Comunicate con el servicio tecnico');
    }
  }
}
</script>