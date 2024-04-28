// Manda a la página de inicio 
const $submit = document.getElementById("submit"),
      $password = document.getElementById("password"),
      $name = document.getElementById("name"),
      $cuenta = document.getElementById("cuenta")

document.addEventListener("click", (e) => {
    if (e.target === $submit) {
        if ($password.value !== "" && $name.value !== "") {
            e.preventDefault();
            window.location.href = "inicio.html";
        }
    }
});


// document.addEventListener("click", (e) => {
//     if (e.target === $cuenta) { 
//         e.preventDefault();
//         window.location.href = "register.html";
//     }
// });

