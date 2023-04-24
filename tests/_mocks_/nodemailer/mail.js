module.exports = {
  createTransport() {
    return {
      sendMail() {
        return Promise.resolve();
      }
    }
  }
};