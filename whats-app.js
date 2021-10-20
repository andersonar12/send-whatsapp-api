/* Aqui se concentra toda la logica para hacer Scrapping en WS WEB */

const puppeteer = require("puppeteer");
const path = require("path");

//Requerido por puppeteer
let browser;
let page;

const initBrowser = async () => {
  browser = await puppeteer.launch({
    headless: process.env.NODE_ENV === "production",
    userDataDir: "~/.config/chromium",
    args: ["--no-sandbox"],
  });

  if (browser) {
    console.log("Intialized Browser")
  }
};

const getQRImage = async () => {
  if (page) {
    page.close();
  }

  page = await browser.newPage();
  /* await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
  ); */
  await page.goto("https://web.whatsapp.com");

  try {

    await page
    .screenshot({ path: path.join(__dirname, "public/img/qr-page.png") })
    .then(() => console.log("qr-page Screenshoot"))

    await page.waitForSelector("canvas[role='img']",
      { timeout: 60000 }
    );
   
    return page
      .screenshot({ path: path.join(__dirname, "public/img/codigo-qr.png") })
      .then(() => "codigo-qr.png");

    /* const path = "codigo-qr.png"; */
    /* console.log("QR-code does not exist:", path); */
  } catch (error) {
    console.log("Error para obtener Codigo QR", error);
  }
};

const sendWhastAppMessage = async (code, phone, message) => {

  const { isLogged } = await checkLogStatus();

  if (isLogged === false) {
    return {
      status: "error",
      message:
        "There is no device paired, please connect your phone to send messages.",
    };
  }

  if (page) {
    page.close();
  }

  page = await browser.newPage();

  /* await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
  ); */

  await page.goto(
    `https://web.whatsapp.com/send?phone=${code}${phone}&text=${message}`
  );

  await page.waitForSelector(
    "div [aria-label='Lista de mensajes. Presiona la tecla de flecha hacia la derecha en un mensaje para abrir su menú contextual.']",
    {timeout: 80000},
  );
  
  const target = await page.$(
    "#main > footer > div._2BU3P.tm2tP.copyable-area > div > div > div._2lMWa > div._3HQNh._1Ae7k > button"
  );
  await target.click();
  await page.keyboard.press("Enter");

  await page
    .screenshot({ path: path.join(__dirname, "public/img/chat.png") })
    .then(() => "tomado");

  return { status: "success", message: "Mensage enviado." };
};

const checkLogStatus = async () => {
  try {
    if (page) {
      page.close();
    }

    page = await browser.newPage();

    /* await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
    ); */

    await page.goto(`https://web.whatsapp.com/`);

    await page.waitForSelector("#side > header > div.YtmXM > div > img", {
      timeout: 20000,
    });

    const target = await page.$("#side > header > div.YtmXM > div > img"); //cuando clickea imagen de perfil

    await target.click();

    const userProfile = await page.$('div [contenteditable="false"]');
    let value = await page.evaluate((el) => el.textContent, userProfile);

    return { isLogged: true, user: value }; //enviamos el Nombre de  Perfil de usuario
  } catch (err) {
    return { isLogged: false, user: null };
  }
};

const logoutUser = async () => {
  try {
    if (page) {
      page.close();
    }

    page = await browser.newPage();

    /* await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
    ); */

    await page.goto(`https://web.whatsapp.com/`);

    await page.waitForSelector("#side > header > div.YtmXM > div > img", {
      timeout: 60000,
    });

    const target = await page.$(
      "#side > header > div._3yZPA > div > span > div:nth-child(3) > div > span"
    ); //clickea en las opciones de Usuario

    await target.click();

    const clickLogout = await page.$(
      "div [role='button'][aria-label='Cerrar sesión']"
    );
    await clickLogout.click();

    return "Logout Succesfull";
  } catch (error) {
    console.log("Error intentando Cerrar Sesion : ", err);
    return err;
  }
};

module.exports = {
  initBrowser,
  sendWhastAppMessage,
  getQRImage,
  checkLogStatus,
  logoutUser,
};
