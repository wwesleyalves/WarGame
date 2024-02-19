function register() {
    const login = document.getElementById('registerLogin').value;
    const nome = document.getElementById('registerName').value;
    const senha = document.getElementById('registerPassword').value;

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, nome, senha }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("User registered");
        } else {
            console.error("Registration failed:", data.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);

        const errorMessage = document.createElement("p");
        errorMessage.innerHTML = `Error: ${error}`;
        document.body.appendChild(errorMessage);
    });
}

function login() {
    const login = document.getElementById('loginLogin').value;
    const senha = document.getElementById('loginSenha').value;
    const url = `http://localhost:3000/login/${login}/${senha}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("User logged in:", data.userInfo);

                document.cookie = `sessionID=${data.sessionID}; path=/`;
                console.log("Session ID:", data.sessionID);

                window.location.href = 'filtrar_vulnerabilidades.html';
            } else {
                console.error("Login failed:", data.message);
            }
        })
        .catch(error => console.error("Error:", error));
}

function getSessionID() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'sessionID') {
            return value;
        }
    }
    return null;
}

function checkAuthentication() {
    const sessionID = getSessionID();
    if (sessionID) {
        
        console.log("Usuario ja autenticado! Session ID:", sessionID);
        window.location.href = 'filtrar_vulnerabilidades.html';
    } else {
        console.log("Usuario não autenticado!");
    }
}

window.onload = checkAuthentication;