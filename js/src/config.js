class Config {
  static get port() {
    return process.env.REDIS_PORT
  }

  static get server() {
    return process.env.REDIS_SERVER
  }

  static get password() {
    return process.env.REDIS_PASSWORD
  }
}

module.exports = Config
