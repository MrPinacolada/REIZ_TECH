<template>
  <header>
    <div class="header-container">
      <section class="LOGO headbox">
        <img
          src="@/assets/LOGO/country-list-high-resolution-logo-black-on-transparent-background.png"
          alt="LOGO"
        />
      </section>
      <section class="headbox">
        <span class="loader" v-if="!store.$state.APIHeaderLoader && !refuseGEO"></span>
        <div class="errorLocation" v-if="refuseGEO"><p>Please, allow geo to see this data.</p></div>
        <div class="current-location-wrapper" v-if="store.$state.APIHeaderLoader && !refuseGEO">
          <span :class="`fi fi-${currentISO} fis`"></span>
          <p>{{ currentName }}</p>
          <p>{{ currentArea }} km2</p>
          <img
            id="locationimg"
            src="@/assets/Header/location-sign-svgrepo-com.svg"
            alt="location-icon"
          />
        </div>
      </section>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { Store } from '@/PiniaStore/piniadb'
import axios from 'axios'
const store = Store()
let currentISO = computed(() => store.$state.currentCountry.iso)
let currentName = computed(() => store.$state.currentCountry.name)
let currentArea = computed(() => store.$state.currentCountry.area)
let refuseGEO = ref(false)
let successGEOCallback = async (position: { coords: { latitude: number; longitude: number } }) => {
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude
  store.$state.acceptGPS = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?key=af335d643f7c49ce8fc74fc14f1ae491&q=${latitude}, ${longitude}`
  )
}
let errorGEOCallback = () => {
  refuseGEO.value = true
}

onMounted(() => {
  navigator.geolocation.getCurrentPosition(successGEOCallback, errorGEOCallback)
})
</script>

<style scoped>
header {
  height: 60px;
  position: sticky;
  top: 0;
  padding: 5px;
  padding-left: 40px;
  background-color: rgb(233, 233, 233);
}
.header-container {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
}
.headbox {
  width: fit-content;
  height: fit-content;
  background-color: rgb(255, 255, 255);
  padding: 10px;
  justify-self: flex-start;
  border-radius: 20px;
}
.LOGO {
  padding-left: 15px;
  padding-right: 15px;
}
.LOGO > img {
  max-width: 100px;
  margin: 0;
}

.current-location-wrapper {
  display: flex;
  height: 40px;
  align-items: center;
  justify-items: center;
  gap: 20px;
  font-size: 1.3em;
}
.fi {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.loader {
  width: 30px;
  height: 30px;
  border: 5px solid #b3b3b3;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  margin-left: 30px;
  margin-right: 30px;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
#locationimg {
  max-width: 80%;
  max-height: 80%;
}
</style>
