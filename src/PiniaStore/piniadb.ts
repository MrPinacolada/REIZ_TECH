import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const Store = defineStore('DefaultStore', () => {
  return {
    dbCountry: [] as any,
    acceptGPS: false as any,
    currentCountry: {
      name: '',
      iso: '',
      area: ''
    },
    APIHeaderLoader: false,
    APIBodyLoader: false
  }
})
