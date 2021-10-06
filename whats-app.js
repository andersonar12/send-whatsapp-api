const puppeteer = require("puppeteer");
const fs = require("fs");
//Requerido por puppeteer
let browser
let page
let interval 

let initBrowser = async () => {

    browser = await puppeteer.launch({headless: false,userDataDir: "~/.config/chromium"});
    page = await browser.newPage();
    await page.goto("https://web.whatsapp.com");  
    
    try {
      await page.waitForSelector('#app > div._1ADa8.nMnIl.app-wrapper-web.font-fix > div > div.landing-window > div.landing-main > div > div._25pwu > div > canvas',{timeout:60000})
      const target = await page.$('#app > div._1ADa8.nMnIl.app-wrapper-web.font-fix > div > div.landing-window > div.landing-main > div > div._25pwu > div > canvas')

      page.screenshot({ path: 'codigo-qr.png' }).then(()=>console.log('Codigo-Qr Screenshot created'));
        /* const path = "codigo-qr.png"; */
            /* console.log("QR-code does not exist:", path); */

    } catch (error) {
      console.log('error con selector',error);

    }
}

initBrowser()

// ENVIAR MENSAJES
module.exports.sendMessage = async (req, res) => {

  page = await browser.newPage();
  await page.goto(`https://web.whatsapp.com/send?phone=+584121153914&text=prueba`);

  /* await page.screenshot({ path: 'example.png' }); */

  await page.waitForSelector("#main > footer > div._2BU3P.tm2tP.copyable-area > div > div > div._2lMWa > div._3HQNh._1Ae7k > button")
      
  const target = await page.$("#main > footer > div._2BU3P.tm2tP.copyable-area > div > div > div._2lMWa > div._3HQNh._1Ae7k > button")

  /* await target.click(); */
  /* const inp = await page.$("div [role='textbox'][data-tab='9']")  */ 

  /* await inp.type("Mensajes desde Node.js"); */
  await page.keyboard.press("Enter");
  res.jsonp({mensaje:'Whatsapp enviado'})
  /*  await page.screenshot({ path: 'example.png' }); */
};

