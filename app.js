// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROJECT_ID.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROJECT_ID.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

// Inicializar app
firebase.initializeApp(firebaseConfig);

// Obtener Firestore
const db = firebase.firestore();


// --- EJEMPLOS ---

// GUARDAR DATOS
function guardar() {
  db.collection("usuarios").add({
    nombre: "Genesis",
    fecha: new Date()
  }).then(() => {
    console.log("Guardado con éxito");
  });
}

// LEER DATOS
function leer() {
  db.collection("usuarios").get().then((snap) => {
    snap.forEach((doc) => {
      console.log(doc.id, doc.data());
    });
  });
}

// Pruebas automáticas:
guardar();
leer();
