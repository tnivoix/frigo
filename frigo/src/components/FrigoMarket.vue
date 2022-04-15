<template>
  <div id="frigoMarket">
    <h2>Ajouter un aliment dans le frigo</h2>
    <form hidden
      @submit.prevent="
        $emit('eventAdd', name, nb);
        clear();
      "
    >
      <div class="formValues">
        <input
          type="text"
          class="input"
          required
          v-model="name"
          placeholder="Aliment"
        />
        <input type="number" min="0" class="input" required v-model="nb" />
      </div>
      <input type="submit" value="Ajouter" />
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";

defineEmits(["eventAdd"]);

var name = ref("");
var nb = ref(1);

// Reset le formulaire d'ajout : texte vide et quantité à 1
function clear() {
  name.value="";
  nb.value=1;
  for (let i of document.getElementsByClassName("input")) {
    if (i.type == "text") {
      i.value = "";
    } else if (i.type == "number") {
      i.value = "1";
    }
  }
}
</script>