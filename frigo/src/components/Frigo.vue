<template>
  <div id="frigo">
    <h1>Frigo solaire</h1>
    <div id="top">
      <frigo-market @eventAdd="handlerAdd" />
      <frigo-search @eventSearch="handlerSearch" />
    </div>
    <div id="frigoFerme"></div>
    <div id="frigoOuvert" hidden>
      <frigo-item
        @eventModify="handlerModify"
        @eventDelete="handlerDelete"
        v-for="item in listItem"
        :key="[item._id]"
        :item="item"
      />
    </div>
    <div id="bottom">
      <button id="btnOuvrirFermer">Ouvrir</button>
      <button id="deleteAll" hidden>Vider le frigo</button>
    </div>
    
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

function ouvrirFermeFrigo() {
  var txt = document.getElementById("btnOuvrirFermer").textContent;
  var forms = document.getElementsByTagName("form");

  if (txt == "Ouvrir") {
    document.getElementById("frigoFerme").hidden = true;
    document.getElementById("frigoOuvert").hidden = false;
    document.getElementById("deleteAll").hidden = false;
    document.getElementById("btnOuvrirFermer").textContent = "Fermer";
    for (var i = 0; i < forms.length; i++) {
      forms[i].hidden = false;
    }
  } else {
    document.getElementById("frigoFerme").hidden = false;
    document.getElementById("frigoOuvert").hidden = true;
    document.getElementById("deleteAll").hidden = true;
    document.getElementById("btnOuvrirFermer").textContent = "Ouvrir";
    for (var i = 0; i < forms.length; i++) {
      forms[i].hidden = true;
    }
  }
}

onMounted(() => {
  getList();
  document
    .getElementById("frigoFerme")
    .addEventListener("click", ouvrirFermeFrigo);
  document
    .getElementById("btnOuvrirFermer")
    .addEventListener("click", ouvrirFermeFrigo);
  document.getElementById("deleteAll").addEventListener("click", viderFrigo);
});

function getList() {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      printFrigo(dataJSON);
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
  item.nb > 0 ? modifyItem(item) : handlerDelete(item.id);
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
      .then(
        setTimeout(function () {
          handlerSearch(document.getElementById("searchValue").value);
        }, 150)
      )
      .catch((error) => console.log(error));
  }
}

function handlerSearch(search) {
  fetch(url + "?search=" + search)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      printFrigo(dataJSON);
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
    .then(
      setTimeout(function () {
        handlerSearch(document.getElementById("searchValue").value);
      }, 150)
    )
    .catch((error) => console.log(error));
}

function handlerDelete(id) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "DELETE",
  };
  fetch(url + "/" + id, fetchOptions)
    .then(
      setTimeout(function () {
        handlerSearch(document.getElementById("searchValue").value);
      }, 150)
    )
    .catch((error) => console.log(error));
}

function viderFrigo() {
  if (window.confirm("Voulez-vous vraiment vider le frigo ?") == true) {
    listItem.forEach((i) => {
      handlerDelete(i.id);
    });
  }
}
</script>