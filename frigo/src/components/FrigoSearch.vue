<template>
  <div id="frigoSearch">
    <h2>Chercher un aliment dans le frigo</h2>
    <form hidden @submit.prevent="$emit('eventSearch', search)">
      <div class="formValues">
        <input
          type="text"
          id="searchValue"
          v-model="search"
          placeholder="Aliment"
        />
      </div>
      <input type="submit" value="Chercher" />
    </form>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";

var search = ref("");
defineEmits(["eventSearch"]);
</script>