const mensajeError = document.getElementById("error")[1];


document.getElementById("form-login").addEventListener("submit", async(e) => {
   e.preventDefault();
   const nombres = e.target.children.nombres.value;
   const contraseña = e.target.children.contraseña.value

   const res = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers:{
        "Content-Type":"application/json"
    },
    body: JSON.stringify({
        nombres,contraseña
    })
   });
   if(!res.ok) return mensajeError.classList.toggle("escondido", false)
    const resJson = await res.json();
if(resJson.redirect){
    window.location.href = resJson.redirect;
}
})

