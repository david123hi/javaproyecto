const API_URL = "db.json";

const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const emailInput = document.getElementById("email").value.trim().toLowerCase();
    const passwordInput = document.getElementById("password").value.trim();

    errorMessage.textContent = "";

    if (emailInput === "" || passwordInput === "") {
        showError("Debes completar todos los campos.");
        return;
    }

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            showError("Error al cargar los usuarios.");
            return;
        }

        const data = await response.json();
        const users = data.users;

        const foundUser = users.find(function(user) {
            return user.email.toLowerCase() === emailInput && user.password === passwordInput;
        });

        if (!foundUser) {
            showError("Credenciales incorrectas. Verifica tu correo o contraseña.");
            return;
        }

        const loggedUser = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role
        };

        localStorage.setItem("user", JSON.stringify(loggedUser));

        window.location.href = "dashboard.html";

    } catch (error) {
        showError("No se pudieron cargar los datos. Revisa que db.json exista.");
        console.error("Error:", error);
    }
});

function showError(message) {
    errorMessage.textContent = message;
}