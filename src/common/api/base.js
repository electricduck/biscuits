import auth from "../auth"
import setting from "../setting"
import { TOKEN } from "../setting/keys"

let prefix = "https://api.monzo.com"

const request = async (
  endpoint = "",
  method = 'GET',
  data = {},
  auth = true,
  handleError = true,
  retryOnAuthFail = true
) => {
  if(endpoint.startsWith("http:") || endpoint.startsWith("https:")) {
    handleError = false
    prefix = ""
  }

  let form = null
  let path = `${prefix}${endpoint}`
  let token = ""

  if (auth) {
    let allTokens = await setting.get(TOKEN);
    if(allTokens) {
      token = `Bearer ${allTokens.access_token}`
    }
  }

  if (Object.entries(data).length > 0) {
    let entries = Object.entries(data)

    if (method !== 'GET' && method !== 'HEAD' && method !== 'DELETE') {
      form = new FormData()
      for (let [key, value] of entries) {
        form.append(key, value)
      }
    } else {
      path += "?"
      for (let [key, value] of entries) {
        path += `${key}=${value}&`
      }
    }
  }

  let response = await fetch(
    path,
    {
      body: form,
      cache: 'default',
      headers: {
        'Authorization': token
      },
      method: method
    }
  )

  if (response.status === 401 && retryOnAuthFail) {
    // refresh token
    return request(endpoint, method, data, auth, handleError, false)
  } else if (handleError & !response.ok) {
    // handle error
  } else {
    return response
  }
}

// TODO: Remove this function
const handle = async (
  response = new Response(),
  handleError = true
) => {
  if(handleError & !response.ok) {
    let code = response.status
    let error = response.statusText
    let throwError = true

    if(code === 401) {
      //await auth.logout()
    }

    if(code >= 400 && code < 500) {
      await response.json().then((data) => {
        if (data) {
          error += `${data["code"]}
       ${data["message"]}`
        }
      })
    }

    if(throwError) {
      throw new Error(error)
    }
  }

  return response
}

const base = {
  async get(endpoint = "", query = {}, auth = true, handleError = true) {
    return (await request(endpoint, 'GET', query, auth, handleError))
  },
  async post(endpoint = "", data = {}, auth = true, handleError = true) {
    return (await request(endpoint, 'POST', data, auth, handleError))
  },
  async put(endpoint = "", data = {}, auth = true, handleError = true) {
    return (await request(endpoint, 'PUT', data, auth, handleError))
  },

  async getJson(endpoint = "", query = {}, auth = true) {
    return (await this.get(endpoint, query, auth)).json()
  },
  async postJson(endpoint = "", data = {}, auth = true) {
    return (await this.post(endpoint, data, auth)).json()
  },
  async putJson(endpoint = "", data = {}, auth = true) {
    return (await this.ur(endpoint, data, auth)).json()
  },

  async getText(endpoint = "", query = {}, auth = true) {
    return (await this.get(endpoint, query, auth)).text()
  }
}

export default base
