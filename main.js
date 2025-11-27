let cuentas = [
    { nombre: "Mali", saldo: 200, password: "1234", dni: 44788834 },
    { nombre: "Gera", saldo: 150, password: "5678", dni: 10247439 },
    { nombre: "Sabi", saldo: 60,  password: "9102", dni: 98005362 }
];

let cuentaActiva = null;
let accionActual = "";

function showPage(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function volverInicio() {
    cuentaActiva = null;

    document.getElementById("dniInput").value = "";
    document.getElementById("pinLoginInput").value = "";
    document.getElementById("loginError").innerText = "";

    showPage("page-bienvenida");
}

function goToLogin() {
    showPage("page-login");
}

function volverLogin() {
    showPage("page-login");
}

function loginDni() {
    let dni = document.getElementById("dniInput").value.trim();
    let pin = document.getElementById("pinLoginInput").value.trim();


    cuentaActiva = cuentas.find(c => c.dni.toString() === dni && c.password === pin);

    if (!cuentaActiva) {
        document.getElementById("loginError").innerText = "DNI o PIN incorrecto";
        return;
    }

    document.getElementById("loginError").innerText = "";


    document.getElementById("welcomeUser").innerText = "Hola " + cuentaActiva.nombre;

    document.getElementById("recuadroCuenta").textContent = "Cuenta: " + cuentaActiva.dni;

    mostrarProcesando(() => {
        showPage("page-menu");  
    });
}

function openPinPage(acc) {
    accionActual = acc;

    if (acc === "saldo") {
        actualizarSaldo();         
        showPage("page-saldo");
    }

    if (acc === "deposito") {
        document.getElementById("depositoInput").value = "";
        document.getElementById("depositoMensaje").innerText = "";
        showPage("page-deposito");
    }

    if (acc === "retiro") {
        document.getElementById("retiroInput").value = "";
        document.getElementById("retiroMensaje").innerText = "";
        showPage("page-retiro");
    }
}

function actualizarSaldo() {
    document.getElementById("saldoActual").innerText = "S/ " + cuentaActiva.saldo;
}

function volverMenu() {
    showPage("page-menu");
}

function depositar() {
    let monto = Number(document.getElementById("depositoInput").value);
    if (monto <= 0) return;

    cuentaActiva.saldo += monto;

    document.getElementById("depositoMensaje").innerText =
        `Has depositado S/ ${monto}. Nuevo saldo: S/ ${cuentaActiva.saldo}`;
}


function setMontoDeposito(valor) {
    document.getElementById("depositoInput").value = valor;
}

function otroMontoDeposito() {
    document.getElementById("depositoInput").value = "";
    document.getElementById("depositoInput").focus();
}

function retirar() {
    let monto = Number(document.getElementById("retiroInput").value);
    if (monto <= 0) return;

    if (cuentaActiva.saldo - monto < 0) {
        document.getElementById("retiroMensaje").innerText = "Saldo insuficiente";
        return;
    }
    cuentaActiva.saldo -= monto;
    document.getElementById("retiroMensaje").innerText =
        `Retiraste S/ ${monto}. Nuevo saldo: S/ ${cuentaActiva.saldo}`;

}

function setMontoRetiro(valor) {
    document.getElementById("retiroInput").value = valor;
}

function otroMontoRetiro() {
    document.getElementById("retiroInput").value = "";
    document.getElementById("retiroInput").focus();
}

function openTransfer() {
    document.getElementById("transferMonto").value = "";
    document.getElementById("transferMensaje").innerText = "";
    showPage("page-transfer");
}

function transferir() {

    let monto = Number(document.getElementById("transferMonto").value);
    let dniDestino = document.getElementById("dniDestino").value.trim();

    if (monto <= 0) {
        document.getElementById("transferMensaje").innerText = "Ingrese un monto válido";
        return;
    }

    if (dniDestino === cuentaActiva.dni.toString()) {
        document.getElementById("transferMensaje").innerText = "No puedes transferirte a ti mismo";
        return;
    }

    let destinatario = cuentas.find(c => c.dni.toString() === dniDestino);

    if (!destinatario) {
        document.getElementById("transferMensaje").innerText = "El DNI no existe";
        return;
    }

    if (cuentaActiva.saldo < monto) {
        document.getElementById("transferMensaje").innerText = "Saldo insuficiente";
        return;
    }

    cuentaActiva.saldo -= monto;
    destinatario.saldo += monto;

    document.getElementById("transferMensaje").innerText =
        `Transferiste S/ ${monto} al DNI ${dniDestino}. Nuevo saldo: S/ ${cuentaActiva.saldo}`;
}


function setMontoTrans(valor) {
    document.getElementById("transferMonto").value = valor;
}

function otroMontoTransferido() {
    document.getElementById("transferMonto").value = "";
    document.getElementById("transferMonto").focus();
}

function mostrarProcesando(callback) {
    showPage("page-procesando");   
    setTimeout(() => {
        callback();                
    }, 3000);                      
}
