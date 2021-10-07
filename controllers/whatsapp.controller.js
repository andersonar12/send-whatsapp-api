const { getQRImage, sendWhastAppMessage } = require("../whats-app");

exports.getQRfromWs = async (req, res, next) => {
  console.log('SOLICITUD ENTRANDO');
  try {
    const img = await getQRImage();

    console.log(img);

    res.status(200).json({
      status: "success",
      img,
    });
  } catch (err) {
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
    await sendWhastAppMessage(code, phone, message);
    res.status(200).json({
      status: "success",
      message: "Whatsapp message sent succesfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Unable to send message.",
    });
  }
};
