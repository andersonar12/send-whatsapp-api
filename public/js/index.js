/* const container = document.getElementById("container"); */
const loginBtn = document.getElementById("signin");
const codeImg = document.getElementById("code");
const userDesc = document.getElementById("user");
const logoutBtn = document.getElementById("logoutBtn");

const login = () => {
  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      try {
        codeImg.setAttribute("src", ``);
        loginBtn.innerHTML =
          '<div class="spinner-border text-light" role="status"><span class="visually-hidden">Loading...</span> </div> <p class="mb-0"> Loading..</p>  ';
        let res = "";
        res = await axios({
          method: "GET",
          url: "/whatsapp/login",
        });

        loginBtn.innerHTML =
          '<span class="material-icons">qr_code_2</span> <p class="mb-0">Solicitar Codigo QR.</p>';
        console.log(res);

        codeImg.setAttribute("src", `../img/${res.data.img}`);
        loginBtn.style.display = "none";
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
    });
  }
};

const checkLogin = async () => {
  try {
    userDesc.innerHTML = 'Loading...<div class="spinner-border text-dark" role="status"><span class="visually-hidden">Loading...</span> </div> ';
    logoutBtn.setAttribute("disabled", "")
    loginBtn.setAttribute("disabled", "");

    let res = "";
    res = await axios({
      method: "GET",
      url: "/whatsapp/check-login",
    });

    console.log(res);
    userDesc.innerHTML = res.data.userProfile;
    loginBtn.removeAttribute("disabled");
    logoutBtn.removeAttribute("disabled");
  } catch (err) {
    userDesc.innerHTML = "No hay usuario logueado";
    console.log(err);
    loginBtn.removeAttribute("disabled");

    alert('No hay usuario logueado');
  }
};


checkLogin();
login();

logoutBtn.addEventListener("click", async () => {
  try {
    userDesc.innerHTML = "Loading...";
    loginBtn.setAttribute("disabled","");
    logoutBtn.setAttribute("disabled","");

    res = await axios({
      method: "GET",
      url: "/whatsapp/logout",
    });

    if (res) {
      location.reload();
    }
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
});
