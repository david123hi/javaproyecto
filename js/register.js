const API_URL = "http://localhost:3000/api/auth/register";

const registerForm = document.getElementById("registerForm");
const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");

if (!registerForm) {
    console.error("No se encontró el formulario registerForm. Revisa el id en register.html.");
}

registerForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();
    const repeatPassword = document.getElementById("repeatPassword").value.trim();
    const birthDate = document.getElementById("birthDate").value;

    clearMessages();

    const validationError = validateRegisterForm(fullName, email, password, repeatPassword);

    if (validationError) {
        showError(validationError);
        return;
    }

    const newUser = {
        full_name: fullName,
        email: email,
        password: password,
        birth_date: birthDate || null,
        metadata: {
            sports: []
        }
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        });

        const result = await response.json();

        console.log("Respuesta del registro:", result);

        if (!response.ok || result.ok === false) {
            showError(getBackendError(result));
            return;
        }

        showSuccess("Usuario registrado correctamente. Redirigiendo al login...");

        registerForm.reset();

        setTimeout(function() {
            window.location.href = "login.html";
        }, 1500);

    } catch (error) {
        showError("No se pudo conectar con el backend. Revisa que el servidor esté encendido.");
        console.error("Error completo:", error);
    }
});

function validateRegisterForm(fullName, email, password, repeatPassword) {
    if (fullName === "" || email === "" || password === "" || repeatPassword === "") {
        return "Debes completar todos los campos obligatorios.";
    }

    if (fullName.length < 3) {
        return "El nombre completo debe tener al menos 3 caracteres.";
    }

    if (!isValidEmail(email)) {
        return "Debes ingresar un correo válido.";
    }

    if (password.length < 8) {
        return "La contraseña debe tener mínimo 8 caracteres.";
    }

    if (!hasLettersAndNumbers(password)) {
        return "La contraseña debe contener letras y números.";
    }

    if (password !== repeatPassword) {
        return "Las contraseñas no coinciden.";
    }

    return null;
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function hasLettersAndNumbers(password) {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return hasLetter && hasNumber;
}

function getBackendError(result) {
    if (result.message && !result.errors) {
        return result.message;
    }

    if (result.errors) {
        if (typeof result.errors === "string") {
            return result.errors;
        }

        if (Array.isArray(result.errors)) {
            return result.errors.join(" ");
        }

        if (typeof result.errors === "object") {
            const firstError = Object.values(result.errors)[0];

            if (Array.isArray(firstError)) {
                return firstError.join(" ");
            }

            if (typeof firstError === "string") {
                return firstError;
            }
        }
    }

    return "No se pudo registrar el usuario.";
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