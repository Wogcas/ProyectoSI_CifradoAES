const mensajeError = document.getElementsByClassName("error")[0];


document.getElementById("form-registro").addEventListener("submit", async(e) => {
    e.preventDefault();
    console.log(e.target.children.nombres.value);
    const res = await fetch("http://localhost:3000/api/register",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            nombres: e.target.children.nombres.value,
            apellidos: e.target.children.apellidos.value,
            correo: e.target.children.correo.value,
            contraseña: e.target.children.contraseña.value
        })

    });
    if(!res.ok)return mensajeError.classList.toggle("escondido",false);
    const resJson = await res.json();
    if(resJson.redirect){
        window.location.href = resJson.redirect;
    }
});
