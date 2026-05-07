const API_URL = "http://localhost:3000/api/auth/login";

const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");

loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const emailInput = document.getElementById("email").value.trim().toLowerCase();
    const passwordInput = document.getElementById("password").value.trim();

    clearMessages();

    if (emailInput === "" || passwordInput === "") {
        showError("Debes completar todos los campos.");
        return;
    }

    if (!isValidEmail(emailInput)) {
        showError("Debes ingresar un correo válido.");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailInput,
                password: passwordInput
            })
        });

        const result = await response.json();

        if (!response.ok || result.ok === false) {
            showError(result.message || "Credenciales inválidas.");
            return;
        }

        const token = result.data?.token;
        const user = result.data?.user;

        if (!token || !user) {
            showError("El servidor no devolvió token o usuario.");
            console.log("Respuesta del backend:", result);
            return;
        }

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        showSuccess("Login exitoso. Redirigiendo...");

        setTimeout(function() {
            window.location.href = "dashboard.html";
        }, 700);

    } catch (error) {
        showError("No se pudo conectar con el backend. Revisa que el servidor esté encendido.");
        console.error("Error:", error);
    }
});

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showError(message) {
    errorMessage.textContent = message;
    successMessage.textContent = "";
}

function showSuccess(message) {
    successMessage.textContent = message;
    errorMessage.textContent = "";
}

function clearMessages() {
    errorMessage.textContent = "";
    successMessage.textContent = "";
}