<template>
  <div class="frigoItem">
    <div class="itemImg">
      <img src="@/images/noImage.png" alt="" />
    </div>
    <div class="itemInfo">
      <div class="itemText">
        <p>{{ item.name }}</p>
      </div>
      <div class="itemBtns">
        <button @click="$emit('eventModify', item, -1)">-</button>
        <a>{{ item.nb }}</a>
        <button @click="$emit('eventModify', item, 1)">+</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["item"]);
defineEmits(["eventModify"]);
</script>

<style>
.frigoItem {
  width: 150px;
  height: 200px;
  position: relative;
  display: inline-block;
}

.itemImg {
  position: relative;
  width: 100%;
  height: 75%;
}

.itemImg > img {
  position: relative;
  width: 100%;
  height: 100%;
}

.itemInfo {
  position: relative;
  width: 100%;
  height: 25%;
  align-content: center;
}

.itemText {
  width: fit-content;
  margin: auto;
  height: 50%;
}

.itemText > p {
  margin: auto;
  padding-top: 3.5px;
}

.itemBtns {
  width: fit-content;
  height: 50%;
  margin: auto;
}

.itemBtns > button {
  display: inline-block;
  margin: auto;
  height: 25px;
  width: 25px;
  vertical-align: middle;
}

.itemBtns > a {
  display: inline-block;
  margin: auto;
  height: auto;
  width: 25px;
  text-align: center;
  vertical-align: middle;
}
</style>