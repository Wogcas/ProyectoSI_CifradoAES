const mensajeError = document.getElementsByClassName("error")[0];
const correo = document.getElementById("correo");
const contraseña = document.getElementById("contraseña");

document.getElementById("form-login").addEventListener("submit", (e) => {
    e.preventDefault();
    const body = {
        correo: correo.value,
        contraseña: contraseña.value
    };
    
    fetch("/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body) 
   }).then(res => {
        if(res.ok){
            window.location.href = "/inicio";
        }else{
            return mensajeError.classList.toggle("hidden", false);
        }

   }).catch(err =>{
    alert("Hubo un error en el sistema")
   });

  
});