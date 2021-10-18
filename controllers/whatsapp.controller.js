const { getQRImage, sendWhastAppMessage, checkLogStatus, logoutUser} = require("../whats-app");

exports.getQRfromWs = async (req, res, next) => {
  let img = ''
  try {
    img = await getQRImage();

    /* console.log(img); */

    res.status(200).json({
      status: "success",
      img,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Unable to get QR code from whatsapp.",
    });
  }
};

exports.sendMessage = async (req, res, next) => {
  const { code, phone, message } = req.body;

  if (!code || !phone || !message) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing field',
    });
  }

  try {
    const { status } = await sendWhastAppMessage(code, phone, message);

    if (status === 'error') {
      return res.status(500).json({
        status: "fail",
        message: "Actualmente no hay dispositivo disponible para enviar tu mensaje.",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Mensaje enviado exitosamente.",
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Unable to send message.",
    });
  }
};

exports.checkLoggin = async (req, res, next) => {
  try {
    const logStatus = await checkLogStatus();

    return res.status(200).json({
      status: "success",
      logStatus,
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Unable to check login",
    });
  }
};

exports.logoutUser = async (req, res, next) => {
  /* console.log('Logout User Processing...'); */
  try {
    const msg = await logoutUser();

    /* console.log(msg); */

    res.status(200).json({
      status: "success",
      msg,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Logout Failed",
    });
  }
};
