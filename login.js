function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  let loader = document.getElementById("loader");

  if (user && pass) {
    loader.style.display = "block"; // show loading

    setTimeout(() => {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("username", user);

      window.location.href = "app.html";
    }, 1500); // delay (1.5 sec)
  } else {
    alert("Enter username & password");
  }
}