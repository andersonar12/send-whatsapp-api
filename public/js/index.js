const loginBtn = document.getElementById('signin');
const container = document.getElementById('container');
const codeImg = document.getElementById('code');

if (loginBtn) {
  loginBtn.addEventListener('click', async () => {
    try {
      loginBtn.textContent = 'Loading...';
      const res = await axios({
        method: 'GET',
        url: '/whatsapp/login'
      })

      loginBtn.textContent = 'Solicitar Codigo QR.';
      console.log(res);

      codeImg.setAttribute('src', `img/${res.data.img}`);

    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  });
}