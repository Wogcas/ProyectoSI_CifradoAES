document.addEventListener("DOMContentLoaded", async () => {

    const $contraseñaCifrar = document.querySelector("#contraseñaCifrar"),
    $informacionCifrar = document.querySelector("#informacionCifrar"),
    $resultadoCifrar = document.querySelector("#resultadoCifrar"),
    $btnCifrar = document.querySelector("#btnCifrar"),
    $contraseñaDescifrar = document.querySelector("#contraseñaDescifrar"),
    $informacionDescifrar = document.querySelector("#informacionDescifrar"),
    $resultadoDescifrar = document.querySelector("#resultadoDescifrar"),
    $btnDescifrar = document.querySelector("#btnDescifrar");
    $btnLimpiarC = document.querySelector("#btnLimpiarC");
    $btnLimpiarD = document.querySelector("#btnLimpiarD");


const bufferABase64 = buffer => btoa(String.fromCharCode(...new Uint8Array(buffer)));
const base64ABuffer = buffer => Uint8Array.from(atob(buffer), c => c.charCodeAt(0));
const LONG_SAL = 16;
const LONG_VECTOR_INICIALIZACION = LONG_SAL;
const derivacionDeClaveContraseña = async (contraseña, sal, iteraciones, longitud, hash, algoritmo = "AES-CBC") => {
    const encoder = new TextEncoder();
    let KeyMaterial = await window.crypto.subtle.importKey(
        "raw",
        encoder.encode(contraseña),
        {name : "PBKDF2"}, //Agrega complejidad
        false, //Evita que se exponga accidentalmente
        ["deriveKey"] //Se puede utilizar para derivar otras claves criptográficas
    );
    return await window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: encoder.encode(sal),
            iterations: iteraciones,
            hash
        },
        KeyMaterial,
        { name: algoritmo, length: longitud },
        false,
        ["encrypt", "decrypt"]

    );
}
const encriptar = async(contraseña, textoPlano) => {
    const encoder = new TextEncoder();
    const sal = window.crypto.getRandomValues(new Uint8Array(LONG_SAL));
    const vectorInicializacion = window.crypto.getRandomValues(new Uint8Array(16));
    const bufferTextoPLano = encoder.encode(textoPlano);
    const clave = await derivacionDeClaveContraseña(contraseña, sal, 100000, 256, "SHA-256");
    const encrypted = await window.crypto.subtle.encrypt(
        {name: "AES-CBC", iv: vectorInicializacion},
        clave,
        bufferTextoPLano
    );
    
return bufferABase64([
        ...sal,
        ...vectorInicializacion,
        ...new Uint8Array(encrypted)
    ]);
};

const desencriptar = async (contraseña, encriptadoEnBase64) => {
    const decoder = new TextDecoder();
    const datosEncriptados = base64ABuffer(encriptadoEnBase64);
    const sal = datosEncriptados.slice(0, LONG_SAL);
    const vectorInicializacion = datosEncriptados.slice(0 + LONG_SAL, LONG_SAL + LONG_VECTOR_INICIALIZACION);
    const clave = await derivacionDeClaveContraseña(contraseña, sal, 100000, 256, "SHA-256");
    const datosDesencriptadosComoBuffer = await window.crypto.subtle.decrypt(
        { name: "AES-CBC", iv: vectorInicializacion },
        clave,
        datosEncriptados.slice(LONG_SAL + LONG_VECTOR_INICIALIZACION)
    );
    return decoder.decode(datosDesencriptadosComoBuffer);
}

$btnCifrar.onclick = async () => {
    const contraseña = $contraseñaCifrar.value;
    if(!contraseña){
        Swal.fire({
            title: 'Error!',
            text: 'No se encontró una contraseña para el cifrado',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        return;
    }
    const textoPlano = $informacionCifrar.value;
    if(!textoPlano){
        Swal.fire({
            title: 'Error!',
            text: 'No se encontró un texto para el cifrado',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        return;
    }
    const cifrado = await encriptar(contraseña, textoPlano);
    $resultadoCifrar.value = cifrado;
};
$btnDescifrar.onclick = async () => {
    const contraseña = $contraseñaDescifrar.value;
    if(!contraseña){
        Swal.fire({
            title: 'Error!',
            text: 'No se encontró una contraseña para el descifrado',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        return;  
    }
    const textoCifradoBase64 = $informacionDescifrar.value;
    if(!textoCifradoBase64){
        Swal.fire({
            title: 'Error!',
            text: 'No se encontró un texto para el descifrado',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        return;
    }
    try{
        const desencriptado = await desencriptar(contraseña, textoCifradoBase64);
        $resultadoDescifrar.value = desencriptado;
    }catch(e){
        $resultadoDescifrar.value = "Error descifrando! " + "¿Está seguro que contraseña y texto son los correctos?"
    }
};

$btnLimpiarC.onclick = async () => {
    document.getElementById("contraseñaCifrar").value="";
    document.getElementById("informacionCifrar").value="";
    document.getElementById("resultadoCifrar").value="";
};
$btnLimpiarD.onclick = async () => {
    document.getElementById("contraseñaDescifrar").value="";
    document.getElementById("informacionDescifrar").value="";
    document.getElementById("resultadoDescifrar").value="";
};

});