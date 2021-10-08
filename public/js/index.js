const loginBtn = document.getElementById('signin');
const container = document.getElementById('container');
const codeImg = document.getElementById('code');

if (loginBtn) {
  loginBtn.addEventListener('click', async () => {
    try {
      codeImg.setAttribute('src', ``);
      loginBtn.innerHTML = '<div class="spinner-border text-light" role="status"><span class="visually-hidden">Loading...</span> </div> <p class="mb-0"> Loading..</p>  ';
      let res = ''
      res = await axios({
        method: 'GET',
        url: '/whatsapp/login'
      })

      loginBtn.innerHTML = '<span class="material-icons">qr_code_2</span> <p class="mb-0">Solicitar Codigo QR.</p>';
      console.log(res);

      codeImg.setAttribute('src', `img/${res.data.img}`);
      loginBtn.style.display='none'
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  });
}