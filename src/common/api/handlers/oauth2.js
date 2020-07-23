import base from "../base"

const prefix = "/oauth2"

const oauth2 = {
  async postToken(
    clientId = "", clientSecret = "", redirectUri = "", authorizationCode = "") {
    return base.postJson(
      `${prefix}/token`,
      {
        'grant_type': "authorization_code",
        'client_id': clientId,
        'client_secret': clientSecret,
        'redirect_uri': redirectUri,
        'code': authorizationCode
      },
      false
    )
  },
  async postTokenRefresh(
    clientId = "", clientSecret = "", refreshToken = "") {
    return base.postJson(
      `${prefix}/token`,
      {
        'grant_type': "refresh_token",
        'client_id': clientId,
        'client_secret': clientSecret,
        'refresh_token': refreshToken
      },
      false
    )
  }
}

export default oauth2
