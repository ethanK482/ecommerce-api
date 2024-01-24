class ENVGetter {
  getHost() {
    return process.env.HOST;
  }

  getPort() {
    return process.env.PORT;
  }
  getPaymentSecretKey() {
    return process.env.PAYMENT_SECRET_KEY;
  }
  getEndPointSecret() {
    return process.env.ENDPOINT_SECRET;
  }
  getCloundinaryName() {
    return process.env.CLOUDINARY_CLOUD_NAME;
  }

  getCloundinarApiKey() {
    return process.env.CLOUDINARY_API_KEY;
  }

  getCloundinarApiSecretKey() {
    return process.env.CLOUDINARY_API_SECRET_KEY;
  }
  getTokenExpiresTime() {
    return process.env.TOKEN_EXPIRES;
  }
}
export default new ENVGetter();
