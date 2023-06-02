import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA5ZJI8QPRIRpyD4AewQPFU44BRpXzQDwc",
    authDomain: "essentials-92ae0.firebaseapp.com",
    projectId: "essentials-92ae0",
    storageBucket: "essentials-92ae0.appspot.com",
    messagingSenderId: "341390361220",
    appId: "1:341390361220:web:f8ce03a8c9d964526638d1", 
    measurementId: "G-7V3WNDX6ER"
  }

  export const app = initializeApp(firebaseConfig)
  export const storage = getStorage(app)
  