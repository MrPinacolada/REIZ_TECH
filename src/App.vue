<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Store } from '@/PiniaStore/piniadb'
import axios from 'axios'
import { onMounted } from 'vue'
const store = Store()
const COUNTRY_LIST = async () => {
  try {
    let request = await axios.get('https://restcountries.com/v2/all?fields=name,region,area,flags')
    store.$state.dbCountry = await request.data
    store.$state.dbCountry.forEach((item: any) => {
      if (item.area) {
        item.area = item.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      } else {
        item.area = 'no data'
      }
    })
    store.$state.APIBodyLoader = true
    if (store.$state.acceptGPS) {
      let located = store.$state.dbCountry.filter(
        (item: any) => item.name == store.$state.acceptGPS.data.results[0].components.country
      )
      if (located.length > 0) {
        store.$state.currentCountry = {
          name: located[0].name,
          area: located[0].area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
          iso: store.$state.acceptGPS.data.results[0].components.country_code
        }
        store.$state.APIHeaderLoader = true
      }
    }
  } catch (error) {
    console.error('Failed to fetch countries:', error)
  }
}
onMounted(() => {
  COUNTRY_LIST()
})
</script>

<template>
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap');
body {
  display: block;
  margin: 0;
  padding: 0;
  border: none;
  font-family: 'Ubuntu', sans-serif;
}
h1,
h2,
h3,
p,
a,
span {
  margin: 0;
  padding: 0;
  text-decoration: none;
}
</style>
