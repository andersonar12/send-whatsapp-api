const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require('path');


//Requerido por puppeteer
let browser 
let page 

const initBrowser = async () =>{

  browser = await puppeteer.launch({
    headless: false,
    userDataDir: "~/.config/chromium",
  });
  
}

initBrowser()

const getQRImage = async () => {
  /* browser = await puppeteer.launch({
    headless: false,
    userDataDir: "~/.config/chromium",
  }); */
 
  if (page) {
    page.close()
  }

  /* fs.unlink(path.join(__dirname, 'public/img/codigo-qr.png'), function (err) {
      
    if (err) { 
      console.log(err);
    }
    console.log('codigo-qr! deleted');
  
  });  */

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
    console.log("error con selector", error);
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
      {timeout: 60000},
    );
  
    // const target = await page.$(
    //   "#main > footer > div._2BU3P.tm2tP.copyable-area > div > div > div._2lMWa > div._3HQNh._1Ae7k > button"
    // );
  
    await page.keyboard.press("Enter");
    
    return 'Mensage enviado.';

  } catch(err) {
    console.log(err);
    return err;
  }
}

module.exports = {
  sendWhastAppMessage,
  getQRImage
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
