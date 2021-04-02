<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="nav">
      <router-link
        :to="{
          name: 'ActividadesCalendar',
          params: { id: 1 },
        }"
        >ActivitiesCalendar</router-link
      >
      <a href="javascript:void(0)" title="Cerrar sesión" @click="logOut">
        <span class="text-icon">Cerrar sesión</span></a
      >
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    logOut() {
      localStorage.removeItem("token");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
