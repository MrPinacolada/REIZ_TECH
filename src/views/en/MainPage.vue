<template>
  <HeaderComponent />
  <BodyComponent />
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import { Store } from '@/PiniaStore/piniadb'
import '/node_modules/flag-icons/css/flag-icons.min.css'
import HeaderComponent from '@/components/HeaderComponent.vue'
import BodyComponent from '@/components/BodyComponent.vue'
const store = Store()
</script>

<style scoped></style>
