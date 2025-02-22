function checkAccess() {
    const correctPassword = 'drink';
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    const hashedPassword = btoa(password);
    const hashedCorrectPassword = btoa(correctPassword);

    if (hashedPassword === hashedCorrectPassword) {
        const expirationTime = Date.now() + (30 * 60 * 1000);
        const authData = {
            authenticated: true,
            expires: expirationTime
        };

        sessionStorage.setItem("authData", JSON.stringify(authData));
        window.location.href = "list.html";
    } else {
        errorMessage.style.display = "block";

        setTimeout(() => {
            errorMessage.style.display = "none";
        }, 3000);

        document.getElementById("password").value = "";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("password");

    passwordInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            checkAccess();
        }
    });

    window.addEventListener("beforeunload", () => {
        sessionStorage.removeItem("authData");
    });
});


