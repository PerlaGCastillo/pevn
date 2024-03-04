<template>
  <v-container class="text-center">
    <NavbarP :p_nombre="professor.nombre" />
    <v-alert
      class="text-start"
      text
      v-model="alert.show"
      :type="alert.type"
      dismissible
    >{{alert.message}}</v-alert>
    <h1 class="font-weight-light">{{course.c_name}}</h1>
    <h2 class="font-weight-thin">{{course.c_description}}</h2>
    <v-row justify="center">
      <v-col md="9" sm="12">
        <v-simple-table fixed-header>
          <thead>
            <tr>
              <th class="text-center">Nombre</th>
              <th class="text-center">Descripción</th>
              <th class="text-center">Archivo</th>
              <th class="text-center">Entregas</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="assignment in assignmentsList" :key="assignment.id_a">
              <td>{{assignment.a_name}}</td>
              <td>{{assignment.a_description}}</td>
              <td>
                <v-icon @click="open(assignment.a_file)">mdi-file-pdf</v-icon>
              </td>
              <td>
                <v-icon
                  color="cyan darken-1"
                  @click="getDeliveries(assignment.id_a)"
                >mdi-book-open-page-variant</v-icon>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-dialog v-model="showDelv" max-width="450">
      <v-simple-table fixed-header>
        <thead>
          <tr>
            <th class="text-center">Estudiante</th>
            <th class="text-center">Entrega</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="delivery in deliveriesList" :key="delivery.id_d" class="text-center">
            <td>{{delivery.s_nombre}}</td>
            <td>
              <a @click="open(delivery.d_file)">{{delivery.d_filename}}</a>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-dialog>
    <v-dialog v-model="add" max-width="450">
      <v-card>
        <v-card-title>Crear asignación</v-card-title>
        <v-card-text>
          <v-form ref="addForm" class="ma-3" @submit.prevent="addAssignment()">
            <v-file-input
              label="Archivo"
              :rules="[(v) => !!v || 'Agrega un archivo']"
              v-model="assignmentToAdd.a_file"
            ></v-file-input>
            <v-text-field
              prepend-icon="mdi-biohazard"
              label="Nombre"
              :rules="[(v) => !!v || 'Escribe un nombre']"
              v-model="assignmentToAdd.a_name"
            ></v-text-field>
            <v-textarea
              prepend-icon="mdi-bike"
              label="Descripción"
              :rules="[(v) => !!v || 'Escribe una descripción']"
              v-model="assignmentToAdd.a_description"
            ></v-textarea>
            <v-btn block class="success mt-3" type="submit">Agregar</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-btn @click="add=true" color="deep-orange" large right fixed bottom fab dark>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import NavbarP from "@/components/NavbarP";

export default {
  data: () => ({
    alert: { show: false },
    professor: {},
    course: {},
    assignmentsList: [],
    assignmentToAdd: {},
    deliveriesList: [],
    showDelv: false,
    add: false
  }),
  methods: {
    open(link) {
      window.open(link);
    },
    async addAssignment() {
      let valid = this.$refs.addForm.validate();
      if (valid) {
        try {
          const newAssignment = new FormData();
          newAssignment.append("a_name", this.assignmentToAdd.a_name);
          newAssignment.append(
            "a_description",
            this.assignmentToAdd.a_description
          );
          newAssignment.append("a_file", this.assignmentToAdd.a_file);

          const res = await this.axios.post(
            `/professor/assignment/${this.$route.params.id_c}`,
            newAssignment
          );
          this.assignmentsList.push(res.data.assignment);
          this.$refs.addForm.reset();
          this.add = false;
          this.alert = {
            show: true,
            type: "success",
            message: res.data.message
          };
        } catch (error) {
          console.log(error);
        }
      }
    },
    async getDeliveries(id_a) {
      try {
        const res = await this.axios.get(`/professor/deliveries/${id_a}`);
        this.deliveriesList = res.data;
        this.showDelv = true;
      } catch (error) {
        console.log(error);
      }
    }
  },
  created: function() {
    this.professor = JSON.parse(sessionStorage.getItem("session"));
    if (this.professor == null) {
      this.$router.push("/");
    } else if (this.professor.role != "professor") {
      this.$router.push("/profile");
    } else {
      // Course information
      this.axios
        .get(`/professor/course/${this.$route.params.id_c}`)
        .then(res => {
          this.course = res.data.course;
        })
        .catch(e => {
          console.log(e);
        });

      // Assignments
      this.axios
        .get(`/professor/course-assignments/${this.$route.params.id_c}`)
        .then(res => {
          this.assignmentsList = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  components: {
    NavbarP
  }
}
</script>