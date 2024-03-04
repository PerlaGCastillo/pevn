import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import("../views/Home.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import("../views/Profile.vue"),
  },
  {
    path: "/professor/courses",
    name: "Professor courses",
    component: () =>
      import("../views/professor/Courses.vue"),
  },
  {
    path: "/professor/assignments/:id_c",
    name: "Professor assignments",
    component: () =>
      import(
        "../views/professor/Assignments.vue"
      ),
  },
  {
    path: "/student/courses",
    name: "All courses",
    component: () =>
      import("../views/student/Courses.vue"),
  },
  {
    path: "/student/my-courses",
    name: "My courses",
    component: () =>
      import("../views/student/MyCourses.vue"),
  },
  {
    path: "/student/assignments/:id_c",
    name: "Assignments",
    component: () =>
      import("../views/student/Assignments.vue"),
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router