<template>
  <div id="frigoList">
    <frigo-market @eventAdd="handlerAdd" />
    <frigo-search @eventSearch="handlerSearch" />
    <frigo-item
      @eventModify="handlerModify"
      v-for="item in listItem"
      :key="[item._id]"
      :item="item"
    />
  </div>
</template>

<script setup>
import Item from "@/item.js";
import FrigoItem from "@/components/FrigoItem.vue";
import FrigoMarket from "@/components/FrigoMarket.vue";
import FrigoSearch from "@/components/FrigoSearch.vue";
import { reactive, onMounted } from "vue";

const listItem = reactive([]);
const url = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/4/produits";

onMounted(() => {
  getList();
});

function getList() {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      printFrigo(dataJSON)
    })
    .catch((error) => console.log(error));
}

function printFrigo(items) {
  listItem.splice(0, listItem.length);
  for (let i of items) {
    listItem.push(new Item(i.id, i.nom, i.qte));
  }
}

function handlerModify(item, nb) {
  item.modify(nb);
  item.nb > 0 ? modifyItem(item) : deleteItem(item.id);
}

function handlerAdd(name, nb) {
  if (name != "") {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const fetchOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ nom: name, qte: nb }),
    };
    fetch(url, fetchOptions)
      .then(setTimeout(getList, 100))
      .catch((error) => console.log(error));
  }
}

function handlerSearch(search) {
  fetch(url+"?search="+search)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      printFrigo(dataJSON)
    })
    .catch((error) => console.log(error));
}

function modifyItem(item) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({ id: item.id, nom: item.name, qte: item.nb }),
  };
  fetch(url, fetchOptions)
    .then(setTimeout(function(){
      handlerSearch(document.getElementById("searchValue").value)
    }, 100))
    .catch((error) => console.log(error));
}

function deleteItem(id) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "DELETE",
  };
  fetch(url + "/" + id, fetchOptions)
    .then(setTimeout(function(){
      handlerSearch(document.getElementById("searchValue").value)
    }, 100))
    .catch((error) => console.log(error));
}
</script>

<style>
</style>