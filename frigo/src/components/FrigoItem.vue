<template>
  <div class="frigoItem">
    <div class="itemImg">
      <img src="@/images/noImage.png" :alt="item.name" :title="item.name" :id="item.id" @dblclick="$emit('eventDelete', item.id, false)"/>
    </div>
    <div class="itemInfo">
        <button @click="$emit('eventModify', item, -1)">-</button>
        <a>{{ item.nb }}</a>
        <button @click="$emit('eventModify', item, 1)">+</button>
      
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
const props = defineProps(["item"]);
defineEmits(["eventModify", "eventDelete"]);

const apiImage = "https://pixabay.com/api/?key=26221263-9caba9f62ea7f5c4e162512a9&lang=fr&image_type=photo&category=food&per_page=10&q=";

onMounted(() => {
  loadImage();
  const test = props.item.name.normalize("NFD").replaceAll(/[\u0300-\u036f]/g, "").replaceAll(" ", "+");
});

function loadImage(){
  fetch(apiImage+props.item.name.normalize("NFD").replaceAll(/[\u0300-\u036f]/g, "").replaceAll(" ", "+"))
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      document.getElementById(props.item.id).src = dataJSON.hits[0].previewURL;
    })
    .catch((error) => console.log(error));
}
</script>