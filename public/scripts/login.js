window.onload = init();

function init(){
    console.log("Page OK");

    const fullForm = document.querySelector(".full-form");
    
    loggedIn = localStorage.getItem("loggedIn");
    if(loggedIn){
        const loggedIn_div = document.querySelector(".logged-in");
        const pseudo = document.getElementById("pseudo");

        pseudo.textContent = loggedIn;
        loggedIn_div.style.display = "flex"
        if(fullForm) fullForm.style.display = "none"
    }

    setListeners();
}

function login(username, password) {

    const testUser = localStorage.getItem(username)

    if(testUser){

        const parsedUser = JSON.parse(testUser)
        console.log(parsedUser)


        const testPassword = parsedUser["password"]
        
        if(testPassword == password) {
            localStorage.setItem("loggedIn", username);
            // Password is wrong
        }   
        // Username doesn't exist 
    }

}


async function signin(username, password, email) {

    // Si le pseudo existe déjà
    if(localStorage.getItem(username)) {
        //ERREUR
        return;
    }

    const user = {
        "username" : username,
        "password" : password,
        "email" : email,
        "createdAt" : Date.now(),
    }

    const insertResponse = await fetch(`/mongo/insert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });

    // Si la requete est reussi on renvoi directement à la page de base sinon erreur
    const insertResult = await insertResponse.json();
    if (insertResponse.ok) {
        alert(`Success: ${insertResult.message}`);
    } else {
        alert(`Error: ${insertResult.error}`);
    }

    localStorage.setItem(username, JSON.stringify(user)); 
    localStorage.setItem("loggedIn", username);
}

function logout(){
    localStorage.removeItem("loggedIn");
}

function setListeners() {

    const login_form = document.querySelector(".login-form");
    const signin_form = document.querySelector(".signin-form");
    const logoutBtn = document.getElementById("logout");

    if(login_form){
        login_form.addEventListener("submit", (e) => {
            var formData = new FormData(login_form)

            const username = sanitize(formData.get("username"))
            const password = hash(formData.get("password"))

            login(username, password)     
        })
    }

    if(signin_form){
        signin_form.addEventListener("submit", async (e) => {
            var formData = new FormData(signin_form)

            const username = sanitize(formData.get("username"))
            const email = sanitize(formData.get("email"))
            const password = hash(formData.get("password"))

            await signin(username, password, email)     
        })
    }

    if(logoutBtn){
        logoutBtn.addEventListener("click", () => {
            console.log("CLICK")
            logout();
        });
    }
}

function sanitize(str) {
    return str.replace(/[<>&"'`]/g, "");
}

function hash(password) {
    //fait rien pour le moment
    return password
}

