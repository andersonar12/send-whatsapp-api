/* Aqui se concentra toda la logica para hacer Scrapping en WS WEB */

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require('path');


//Requerido por puppeteer
let browser 
let page 

const initBrowser = async () =>{

  try {
    browser = await puppeteer.launch({
      /* headless:false, */
      userDataDir: "~/.config/chromium",
      args : [
        '--no-sandbox'
      ]
    });  
  } catch(err) {
    console.log('Error Iniciando Browser',err);
  }
}

initBrowser()

const getQRImage = async () => {

 
  if (page) {
    page.close()
  }


  page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
  await page.goto("https://web.whatsapp.com");

  try {
    await page.waitForSelector(
      "#app > div._1ADa8.nMnIl.app-wrapper-web.font-fix > div > div.landing-window > div.landing-main > div > div._25pwu > div > canvas",
      { timeout: 60000 }
    );

    return page
        .screenshot({ path: path.join(__dirname, 'public/img/codigo-qr.png') })
        .then(() => 'codigo-qr.png');

    /* const path = "codigo-qr.png"; */
    /* console.log("QR-code does not exist:", path); */
  } catch (error) {
    console.log("Error para obtener Codigo QR", error);
  }
};

const sendWhastAppMessage = async (code, phone, message) => {
  try {
    if (page) {
      page.close()
    }

    page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');

    await page.goto(
      `https://web.whatsapp.com/send?phone=${code}${phone}&text=${message}`
    );
  
    await page.waitForSelector(
      "#main > footer > div._2BU3P.tm2tP.copyable-area > div > div > div._2lMWa > div._3HQNh._1Ae7k > button",
      {timeout: 40000},
    );


  
     const target = await page.$(
       "#main > footer > div._2BU3P.tm2tP.copyable-area > div > div > div._2lMWa > div._3HQNh._1Ae7k > button"
    );
  
    await target.click();

    await page
        .screenshot({ path: path.join(__dirname, 'public/img/chat.png') })
        .then(() => 'tomado');

    
    return 'Mensage enviado.';

  } catch(err) {
    console.log("Error en envio de Mensaje de Whataspp",err);
    return err;
  }
}

const isLogged = async ()=>{

  try {

    if (page) {
      page.close()
    }

    page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');

    await page.goto(`https://web.whatsapp.com/`);

    await page.waitForSelector(
      "#side > header > div.YtmXM > div > img",
      { timeout: 45000 }
    );

    const target = await page.$("#side > header > div.YtmXM > div > img"); //cuando clickea imagen de perfil

    await target.click();

    const userProfile = await page.$('div [contenteditable="false"]')
    let value = await page.evaluate(el => el.textContent, userProfile)

    return value //enviamos el Nombre de  Perfil de usuario

  } catch (error) {
    console.log("Error chequeando si usuario esta logueado: ",err);
    return err;
  }
}

const logoutUser = async ()=>{

  try {

    if (page) {
      page.close()
    }

    page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');

    await page.goto(`https://web.whatsapp.com/`);

    await page.waitForSelector(
      "#side > header > div.YtmXM > div > img",
      { timeout: 60000 }
    );

    const target = await page.$( "#side > header > div._3yZPA > div > span > div:nth-child(3) > div > span"); //clickea en las opciones de Usuario

    await target.click();

    const clickLogout = await page.$("div [role='button'][aria-label='Cerrar sesión']")
    await clickLogout.click()

    return 'Logout Succesfull' 

  } catch (error) {
    console.log("Error intentando Cerrar Sesion : ",err);
    return err;
  }
}

module.exports = {
  sendWhastAppMessage,
  getQRImage,
  isLogged,
  logoutUser
}

// ENVIAR MENSAJES
// exports.sendMessage = async (req, res) => {
//   const { code, phone, message } = req.body;

//   try {
//     page = await browser.newPage();
//     await page.goto(
//       `https://web.whatsapp.com/send?phone=${code}${phone}&text=${message}`
//     );
  
//     /* await page.screenshot({ path: 'example.png' }); */
  
//     await page.waitForSelector(
//       "#main > footer > div._2BU3P.tm2tP.copyable-area > div > div > div._2lMWa > div._3HQNh._1Ae7k > button"
//     );
  
//     const target = await page.$(
//       "#main > footer > div._2BU3P.tm2tP.copyable-area > div > div > div._2lMWa > div._3HQNh._1Ae7k > button"
//     );
  
//     /* await target.click(); */
//     /* const inp = await page.$("div [role='textbox'][data-tab='9']")  */
  
//     /* await inp.type("Mensajes desde Node.js"); */
//     await page.keyboard.press("Enter");
//     res.json({ mensaje: "Whatsapp enviado" });
//     /*  await page.screenshot({ path: 'example.png' }); */
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({
//       status: 'fail',
//       message: 'Unable to send message.',
//     });
//   }
// };
