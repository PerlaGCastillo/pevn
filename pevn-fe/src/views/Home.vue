<template>
  <v-container>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Inicio</v-toolbar-title>
    </v-app-bar>
    <v-alert text v-model="alert.show" :type="alert.type" dismissible>{{alert.message}}</v-alert>
    <v-row justify="center">
      <v-col class="text-center" md="2" sm="2">
        <v-btn class="primary"  @click="suForm=true">Regístrate</v-btn>
      </v-col>
      <v-col class="text-center" md="2" sm="2">
        <v-btn class="success"  @click="suForm=false">Ingresa</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col md="6" sm="6">
        <v-card v-if="suForm">
          <v-card-title>Registro</v-card-title>
          <v-card-text>
            <v-form class="ma-3" @submit.prevent="signup()" ref="signupForm">
              <v-text-field label="Nombre" prepend-icon="mdi-account"  :rules="nameRules" v-model="user.name" ></v-text-field>
              <v-text-field label="Correo electrónico"  prepend-icon="mdi-email" :rules="emailRules" v-model="user.email" ></v-text-field>
              <v-text-field label="Contraseña" prepend-icon="mdi-lock" type="password" :rules="passwordRules"  v-model="user.password" ></v-text-field>
              <v-radio-group row v-model="user.role" :rules="[(v) => !!v || 'Selecciona una opción']">
                <v-radio label="Profesor" value="professor"></v-radio>
                <v-radio label="Estudiante" value="student"></v-radio>
              </v-radio-group>
              <v-btn block class="primary mt-3" type="submit">Resgístrate</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
        <v-card v-else>
          <v-card-title>Iniciar Sesión</v-card-title>
          <v-card-text>
            <v-form class="ma-3" @submit.prevent="signin()" ref="signinForm">
              <v-text-field label="Correo electrónico" prepend-icon="mdi-email" :rules="emailRules" v-model="user.email"  ></v-text-field>
              <v-text-field label="Contraseña" prepend-icon="mdi-lock" type="password" :rules="passwordRules"  v-model="user.password" ></v-text-field>
              <v-radio-group row v-model="user.role" :rules="[(v) => !!v || 'Selecciona una opción']">
                <v-radio label="Profesor" value="professor"></v-radio>
                <v-radio label="Estudiante" value="student"></v-radio>
              </v-radio-group>
              <v-btn block class="success mt-3" type="submit">Entrar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    alert: { show: false, message: "" },
    nameRules: [
      value => !!value || "Campo obligatorio",
      value => (value && value.length >= 2) || "Ingresa más de 2 caracteres"
    ],
    emailRules: [
      value => !!value || "Ingresa tu correo",
      value => /.+@.+\..+/.test(value) || "Ingresa un correo válido"
    ],
    passwordRules: [
      value => !!value || "Ingresa tu contraseña",
      value => (value && value.length >= 8) ||  "La contraseña debe tener más de 8 caracteres"
    ],
    user: { name: "", email: "", password: "", role: "" },
    suForm: true
  }),
  methods: {
    async signup() {
      let valid = this.$refs.signupForm.validate();
      if (valid) {
        try {
          const res = await this.axios.post("/signup", this.user);
          this.$refs.signupForm.reset();
          this.suForm = false;
          this.alert = {
            show: true,
            type: "success",
            message: res.data.message
          };
        } catch (error) {
          this.alert = {
            show: true,
            type: "error",
            message: error.response.data.message
          };
        }
      }
    },
    async signin() {
      let valid = this.$refs.signinForm.validate();
      if (valid) {
        try {
          const res = await this.axios.post("/signin", this.user);
          if (res.data.NotFound) {
            this.alert = {
              show: true,
              type: "error",
              message: res.data.message
            };
          } else {
            sessionStorage.setItem("session", JSON.stringify(res.data));
            this.$router.push('/profile')
          }
        } catch (error) {
          this.alert = {
            show: true,
            type: "error",
            message: error.response.data.message
          }
        }
      }
    }
  }
}
</script>