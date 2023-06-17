import { defineStore } from 'pinia'

export const Store = defineStore('DefaultStore', () => {
  return {
    dbCountry: ([] as Array<any>) || null,
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
