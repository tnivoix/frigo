<template>
  <div id="frigoSearch">
      <h2>Chercher un aliment dans le frigo</h2>
    <form @submit.prevent="$emit('eventSearch', search)">
      <input type="text" id="searchValue" v-model="search" placeholder="Aliment" />
      <input type="submit" value="Search" />
    </form>
  </div>
</template>

<script setup>
let search = "";
defineEmits(["eventSearch"]);
</script>

<style>

</style>