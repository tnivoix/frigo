<template>
  <div id="frigo">
    <h1>Frigo solaire</h1>
    <div id="top">
      <frigo-market @eventAdd="handlerAdd" />
      <frigo-search @eventSearch="handlerSearch" />
    </div>
    <div id="frigoFerme"></div>
    <div id="frigoOuvert" hidden>
      <frigo-item @eventModify="handlerModify" @eventDelete="handlerDelete" v-for="item in listItem" :key="[item._id]"
        :item="item" />
    </div>
    <div id="bottom">
      <button id="btnOuvrirFermer">Ouvrir</button>
      <button id="deleteAll" hidden>Vider le frigo actuel</button>
    </div>
    <div id="popup" hidden>
      <div id="popupContent">
        <p>WARNING</p>
        <p>Voulez-vous vraiment vider le frigo ?</p>
        <img src="@/images/warning.gif" />
        <div id="popupButtons">
          <div><button id="cancel">ANNULER</button></div>
          <div><button id="confirm">CONFIRMER</button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Item from "@/item.js";
import FrigoItem from "@/components/FrigoItem.vue";
import FrigoMarket from "@/components/FrigoMarket.vue";
import FrigoSearch from "@/components/FrigoSearch.vue";
import { reactive, onMounted } from "vue";

import openMP3 from '../sounds/open.mp3';
import closeMP3 from '../sounds/close.mp3';
import deleteMP3 from '../sounds/delete.mp3';
import deleteAllMP3 from '../sounds/deleteAll.mp3';
import decreaseMP3 from '../sounds/decrease.mp3';
import increaseMP3 from '../sounds/increase.mp3';
import addMP3 from '../sounds/add.mp3';
import warning1MP3 from '../sounds/warning1.mp3';
import warning2MP3 from '../sounds/warning2.mp3';
import errorMP3 from '../sounds/error.mp3';

const openAudio = new Audio(openMP3);
const closeAudio = new Audio(closeMP3);
const deleteAudio = new Audio(deleteMP3);
const deleteAllAudio = new Audio(deleteAllMP3);
const decreaseAudio = new Audio(decreaseMP3);
const increaseAudio = new Audio(increaseMP3);
const addAudio = new Audio(addMP3);
const warning1Audio = new Audio(warning1MP3);
const warning2Audio = new Audio(warning2MP3);
const errorAudio = new Audio(errorMP3);

var currentAudio;

const listItem = reactive([]);
const url = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/4/produits";

function ouvrirFermeFrigo() {
  var txt = document.getElementById("btnOuvrirFermer").textContent;
  var forms = document.getElementsByTagName("form");

  if (txt == "Ouvrir") {
    // Ouverture du frigo
    openAudio.play();
    document.getElementById("frigoFerme").hidden = true;
    document.getElementById("frigoOuvert").hidden = false;
    document.getElementById("deleteAll").hidden = false;
    document.getElementById("btnOuvrirFermer").textContent = "Fermer";
    for (var i = 0; i < forms.length; i++) {
      forms[i].hidden = false;
    }
  } else {
    // fermeture du frigo
    closeAudio.play();
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
  document.getElementById("frigoFerme").addEventListener("click", ouvrirFermeFrigo);
  document.getElementById("btnOuvrirFermer").addEventListener("click", ouvrirFermeFrigo);
  document.getElementById("deleteAll").addEventListener("click", popup);
  document.getElementById("confirm").addEventListener("click", viderFrigo);
  document.getElementById("cancel").addEventListener("click", cancel);
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
  if (item.nb > 0) {
    modifyItem(item)
    if (nb == 1) {
      // +1 à l'item
      increaseAudio.play();
    } else {
      decreaseAudio.play();
      // -1 à l'item
    }
  } else {
    // 0 à l'item
    handlerDelete(item.id, false);
  }
}

function handlerAdd(name, nb) {
  if (name != "") {
    addAudio.play();
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

function handlerDelete(id, all) {
  if (!all) {
    deleteAudio.play();
  }
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "DELETE",
  };
  fetch(url + "/" + id, fetchOptions)
    .then(
      setTimeout(function () {
        handlerSearch(document.getElementById("searchValue").value);
        deleteAudio.play();
      }, 4000)
    )
    .catch((error) => console.log(error));
}

function popup() {
  if (listItem.length > 0) {
    var random = Math.floor(Math.random() * 2);
    currentAudio = random == 1 ? warning1Audio : warning2Audio;
    currentAudio.addEventListener('ended', loop);
    currentAudio.play();
    document.getElementById("popup").hidden = false;
  } else {
    errorAudio.play();
  }
}

function viderFrigo() {
  cancel();
  deleteAllAudio.play();
  listItem.forEach((i) => {
    handlerDelete(i.id, true);
  });
}

function loop() {
  currentAudio.currentTime = 0;
  currentAudio.play();
}

function cancel() {
  currentAudio.removeEventListener('ended', loop);
  document.getElementById("popup").hidden = true;
}
</script>