
    const config = {
      apiKey: "AIzaSyCavouAo4kYuKHzNgofGw4uzPmdtjtlQx0",
      authDomain: "prueba-adcfb.firebaseapp.com",
      databaseURL: "https://prueba-adcfb-default-rtdb.firebaseio.com",
      projectId: "prueba-adcfb",
      storageBucket: "prueba-adcfb.appspot.com",
      messagingSenderId: "795593512788",
      appId: "1:795593512788:web:49a0cdc592c494af661ac1"
    };
  
 
    firebase.initializeApp(config);
    let db = firebase.database();
    
    let caja = document.querySelector("#caja");
    let boton = document.querySelector("#boton");
    let nombre = prompt("Dime tu nombre para chatear");

    db.ref("mensajes").on("child_added",
      (datos) => {
        let hijo = datos.val();
        let nuevo_mensaje = document.createElement("p");

        if (hijo["mensaje"]["usuario"] === nombre) {
          nuevo_mensaje.classList.add("izq-cuadrado");
          nuevo_mensaje.innerHTML = "<b>Yo:</b>" + hijo["mensaje"]["contenido"];
        } else {
          nuevo_mensaje.classList.add("der-cuadrado");
          nuevo_mensaje.innerHTML = "<b>" + hijo["mensaje"]["usuario"] + ":</b>" + hijo["mensaje"]["contenido"];
        }
        document.body.appendChild(nuevo_mensaje);
   
        document.documentElement.scrollTop=document.documentElement.scrollHeight;
      });


    caja.addEventListener("keypress",
      (e) => {
        let tecla = e.key;
        if (tecla == "Enter" && caja.value.trim() !== "" && !caja.value.includes("<") && !caja.value.includes(">")) {
          db.ref("mensajes").push({ "mensaje": { "contenido": caja.value.trim(), "usuario": nombre } });
          caja.value = "";
          
        }
      });


    boton.addEventListener("click",
      (e) => {

        if (caja.value.trim() !== "" && !caja.value.includes("<") && !caja.value.includes(">")) {
          db.ref("mensajes").push({ "mensaje": { "contenido": caja.value.trim(), "usuario": nombre } });
          caja.value = "";
          document.documentElement.scrollTop = document.documentElement.scrollHeight;
        }
      });


