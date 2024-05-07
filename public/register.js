const mensajeError = document.getElementsByClassName("error")[0];


document.getElementById("form-registro").addEventListener("submit", async(e) => {
    e.preventDefault();
    console.log(e.target.children.nombres.value);
    const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombres: e.target.elements["nombres"].value,
            apellidos: e.target.elements["apellidos"].value,
            correo: e.target.elements["correo"].value,
            contraseña: e.target.elements["contraseña"].value
        })
    });
    if(!res.ok)return mensajeError.classList.toggle("hidden",false);
    const resJson = await res.json();
    if(resJson.redirect){
        window.location.href = resJson.redirect;
    }else {
        // Manejar el caso en que la respuesta no es exitosa
        console.error("Error en la solicitud HTTP:", res.status);
    }
});
