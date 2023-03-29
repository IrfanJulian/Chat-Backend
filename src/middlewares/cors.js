const myCors = (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    // http://domain-website-kamu.com
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  }

  module.exports = {
    myCors
  }