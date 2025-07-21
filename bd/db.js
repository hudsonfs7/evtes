// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAIHl7KE9FuYhCF8PG_rw3WQs60aBr1-cU',
  authDomain: 'evtes-fd2ae.firebaseapp.com',
  projectId: 'evtes-fd2ae',
  storageBucket: 'evtes-fd2ae.firebasestorage.app',
  messagingSenderId: '64658752945',
  appId: '1:64658752945:web:c63565da04c58b6f2f2990'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
