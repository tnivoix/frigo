<template>
  <div id="frigoMarget">
    <h2>Ajouter un aliment dans le frigo</h2>
    <form @submit.prevent="$emit('eventAdd', name, nb); clear()">
      <input
        type="text"
        class="input"
        required
        v-model="name"
        placeholder="Aliment"
      />
      <input type="number" class="input" required v-model="nb" />
      <input type="submit" value="Add" />
    </form>
  </div>
</template>

<script setup>
//defineEmits(["eventAdd"]);

let name = "";
let nb = 1;

function clear() {
  for (let i of document.getElementsByClassName("input")) {
    if (i.type == "text") {
      i.value = "";
    } else if (i.type == "number") {
      i.valueAsNumber = "1";
    }
  }
}
</script>

<style>
</style>