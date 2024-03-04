<template>
  <div>
    <v-app-bar app dark class="primary">
      <v-toolbar-title>PEVN</v-toolbar-title>
      <v-spacer />
      <v-btn text to="/student/courses">Cursos</v-btn> |
      <v-btn text to="/student/my-courses">Mis cursos</v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn text v-bind="attrs" v-on="on">{{s_nombre}}</v-btn>
        </template>
        <v-list dark class="primary">
          <v-list-item to="/profile">PERFIL</v-list-item>
          <v-list-item @click="SignOut()">SALIR</v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  methods: {
    SignOut() {
      sessionStorage.clear();
      this.$router.push("/");
    }
  },
  props: ['s_nombre']
}
</script>