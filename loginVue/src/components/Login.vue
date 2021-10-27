<template>
    <v-app id="inspire">
        <v-content>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="8">
                    <v-card class="elevation-12">
                        <v-window v-model="step">
                            <v-window-item :value="1">
                                <v-row>
                                    <v-col cols="12" md="8">
                                    <v-card-text class="mt-12">
                                        <h1
                                        class="text-center display-2 teal--text text--accent-3"
                                        >Iniciar sesión</h1>
                                        <div class="text-center mt-4">
                                            <v-btn class="mx-2" fab color="black" outlined>
                                                <v-icon>facebook</v-icon>
                                            </v-btn>

                                            <v-btn class="mx-2" fab color="black" outlined>
                                                <v-icon>apple</v-icon>
                                            </v-btn>
                                            <v-btn class="mx-2" fab color="black" outlined>
                                                <v-icon>mdi-account</v-icon>
                                            </v-btn>
                                        </div>
                                        <h4 class="text-center mt-4">Utiliza un email para empezar</h4>
                                        <v-form>
                                        <v-text-field
                                            label="Email"
                                            name="Email"
                                            prepend-icon="email"
                                            type="text"
                                            color="teal accent-3"
                                        />

                                        <v-text-field
                                            id="password"
                                            label="Password"
                                            name="password"
                                            prepend-icon="lock"
                                            type="password"
                                            color="teal accent-3"
                                        />
                                        </v-form>
                                        <h3 class="text-center mt-4">Olvidaste tu contraseña?</h3>
                                    </v-card-text>
                                    <div class="text-center mt-3 mb-5">
                                        <v-btn @click="sendCredentials" v-if="!isLoading" rounded color="teal accent-3" dark>Ingresar</v-btn>
                                        <v-progress-circular v-if="isLoading"
                                        :size="50"
                                        color="teal accent-3"
                                        indeterminate
                                        ></v-progress-circular>
                                    </div>
                                    </v-col>
                                    <v-col cols="12" md="4" class="teal accent-3">
                                    <v-card-text class="white--text mt-12">
                                        <h1 class="text-center display-1">Hola, Amigo!</h1>
                                        <h5
                                        class="text-center"
                                        >No tienes una cuenta? Ingresa tus datos para crear una cuenta</h5>
                                    </v-card-text>
                                    <div class="text-center">
                                        <v-btn rounded outlined dark @click="step++">Registrate</v-btn>
                                    </div>
                                    </v-col>
                                </v-row>
                            </v-window-item>
                            <v-window-item :value="2">
                            <v-row class="fill-height">
                                <v-col cols="12" md="4" class="teal accent-3">
                                <v-card-text class="white--text mt-12">
                                    <h1 class="text-center display-1">Hola, Amigo!</h1>
                                    <h5
                                    class="text-center"
                                    >Tienes ya una cuenta? Ingresa tus credenciales para empezar.</h5>
                                </v-card-text>
                                <div class="text-center">
                                    <v-btn rounded outlined dark @click="step--">Iniciar Sesión</v-btn>
                                </div>
                                </v-col>

                                <v-col cols="12" md="8">
                                <v-card-text class="mt-12">
                                    <h1 class="text-center display-2 teal--text text--accent-3">Crear Cuenta</h1>
                                    <div class="text-center mt-4">
                                        <v-btn class="mx-2" fab color="black" outlined>
                                            <v-icon>facebook</v-icon>
                                        </v-btn>

                                        <v-btn class="mx-2" fab color="black" outlined>
                                            <v-icon>apple</v-icon>
                                        </v-btn>
                                        <v-btn class="mx-2" fab color="black" outlined>
                                            <v-icon>mdi-account</v-icon>
                                        </v-btn>
                                    </div>
                                    <h4 class="text-center mt-4">Utiliza un email válido para crear una cuenta</h4>
                                    <v-form>
                                    <v-text-field
                                        label="Name"
                                        name="Name"
                                        prepend-icon="person"
                                        type="text"
                                        color="teal accent-3"
                                    />
                                    <v-text-field
                                        label="Email"
                                        name="Email"
                                        prepend-icon="email"
                                        type="text"
                                        color="teal accent-3"
                                    />

                                    <v-text-field
                                        id="password"
                                        label="Password"
                                        name="password"
                                        prepend-icon="lock"
                                        type="password"
                                        color="teal accent-3"
                                    />
                                    </v-form>
                                </v-card-text>
                                <div class="text-center mt-n5 mb-12">
                                    <v-btn @click="sendCredentials" v-if="!isLoading" rounded color="teal accent-3" dark>Registrarse</v-btn>
                                    <v-progress-circular v-if="isLoading"
                                    :size="50"
                                    color="teal accent-3"
                                    indeterminate
                                    ></v-progress-circular>
                                </div>
                                </v-col>
                            </v-row>
                            </v-window-item>
                        </v-window>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        </v-content>
    </v-app>
</template>

<script>
    function validate(user){
        return user;
    }
    function sendCredentials(){
        this.isLoading = true;
        setTimeout(()=>{
            this.isVisibleLading()
        },5000);
    }
    function isVisibleLading(){
        this.isLoading = false;
        alert("Datos Enviado con exito");
    }
    export default {
        data: () => ({
            step: 1,
            isLoading:false,
            user:{
                email:'',
                password:'',
                name:'',
            }
        }),
        props: {
            source: String
        },
        methods:{
            sendCredentials,
            isVisibleLading,
            validate
        }
    };
</script>