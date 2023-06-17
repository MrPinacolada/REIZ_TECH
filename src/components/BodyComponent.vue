<template>
  <main>
    <div class="loaderwrap" v-if="!store.$state.APIBodyLoader">
      <span class="loader"></span>
    </div>

    <div class="container-wrap" v-if="store.$state.APIBodyLoader">
      <div class="butt-box">
        <button @click="sortByAlphabet(true)">Sort [A-Z]</button>
        <button @click="sortByAlphabet(false)">Sort [Z-A]</button>
        <button @click="sortByArea()">Sort by area</button>
        <label>Sort by region</label>
        <select @change="updateCountryList" v-model="filter.region">
          <option v-for="item in unRegions">
            {{ item }}
          </option>
        </select>
      </div>

      <div class="all-cont-conteiner">
        <div class="country-box" v-for="item in filterredCountryList" :key="item">
          <img id="box-img" :src="item.flags.svg" alt="" />
          <p class="lit-box cbox">{{ item.name }}</p>
          <span>Region name:</span>
          <p class="lit-box">{{ item.region }}</p>
          <span>Area size:</span>
          <p class="lit-box abox">{{ item.area }} km2</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref, computed, watch } from 'vue'
import { Store } from '@/PiniaStore/piniadb'
const store = Store()
let filter = ref({
  region: '',
  area: ''
})
let CountryList = computed(() => store.$state.dbCountry)
let filterredCountryList = ref([...CountryList.value])
let unRegions = computed(() => {
  let region = CountryList.value.map((item: any) => item.region)
  return [...new Set(region)]
})
let sortByAlphabet = (state: boolean) => {
  if (state) {
    CountryList.value.sort((a, b) => a.name.localeCompare(b.name))
    console.log('CountryList.value: ', CountryList.value)
  } else {
    CountryList.value.sort((a, b) => b.name.localeCompare(a.name))
    console.log('CountryList.value: ', CountryList.value)
  }
}
let sortByArea = () => {
  CountryList.value.forEach((item: any) => {
    if (item.area != 'no data') {
      item.area = parseInt(item.area.replace(/\s/g, ''), 10)
    }
  })
  CountryList.value.sort((a, b) => {
    if (typeof a.area === 'string' && typeof b.area !== 'string') {
      return -1
    } else if (typeof a.area !== 'string' && typeof b.area === 'string') {
      return 1
    } else {
      return a.area - b.area
    }
  })
  CountryList.value.forEach((item: any) => {
    if (typeof item.area !== 'string') {
      item.area = item.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }
  })
}
let updateCountryList = () => {
  filterredCountryList.value = CountryList.value.filter(
    (item: any) => item.region == filter.value.region
  )
}
watch(filter, updateCountryList)
onMounted(() => {})
</script>

<style scoped>
.container-wrap {
  display: grid;
  margin-top: 150px;
  gap: 20px;
}
.all-cont-conteiner {
  width: 90vw;
  height: fit-content;
  padding: 20px;
  margin: auto;
  border-radius: 20px;
  background-color: aliceblue;
  display: grid;
  grid-template-columns: 1fr;
  gap: 35px;
}
.country-box {
  height: fit-content;
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 1.1em;
  gap: 20px;
}
.loaderwrap {
  display: flex;
  width: 90vw;
  height: fit-content;
  padding: 20px;
  margin: auto;
  border-radius: 20px;
  background-color: aliceblue;
  margin-top: 150px;
  justify-items: center;
}
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #000000;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  justify-self: center;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
#box-img {
  max-width: 50px;
  max-height: 70px;
  border-radius: 3px;
}
.butt-box {
  margin: auto;
  height: fit-content;
  width: fit-content;
  background-color: rgb(222, 220, 218);
  border-radius: 20px;
  padding: 10px;
  display: flex;
  gap: 10px;
}
.lit-box {
  padding: 10px;
  background-color: #878be6;
  border-radius: 10px;
}
.cbox {
  background-color: #73e7eb;
}
.abox {
  background-color: #8be270;
}
</style>
