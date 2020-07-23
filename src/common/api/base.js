import auth from "../auth"
import setting from "../setting"
import { TOKEN } from "../setting/keys"

let prefix = "https://api.monzo.com"

const request = async (
  endpoint = "",
  method = 'GET',
  data = {},
  requiresAuth = true,
  throwOnFailure = true,
  retryOnAuthFail = true
) => {
  let input = parseInput(endpoint, method, data)
  let token = ""

  if (requiresAuth) {
    let allTokens = await setting.get(TOKEN);
    if (allTokens) {
      token = `Bearer ${allTokens.access_token}`
    }
  }

  let response = await fetch(
    input.path,
    {
      body: input.body,
      cache: 'default',
      headers: {
        'Authorization': token
      },
      method: input.method
    }
  )

  if (!response.ok && response.status !== 418) {
    if (response.status === 401) {
      if (retryOnAuthFail) {
        auth.refresh().then(() => {
          return request(endpoint, method, data, false, throwOnFailure, false)
        })
      } else {
        auth.logout();
        // TODO: Cancel request, as currently an error will throw since `response` is null
      }
    } else if (throwOnFailure) {
      return handleError(response)
    }
  }

  return response
}

const handleError = async (
  response = new Response()
) => {
  let code = response.status
  let error = response.statusText

  if (code >= 400 && code < 500) {
    await response.json().then((data) => { // TODO: Handle if this is missing and/or not JSON
      if (data) {
        error += `${data["code"]}
      ${data["message"]}`
      }
    })
  }

  throw new Error(error)
}

const parseInput = (
  endpoint = "",
  method = 'GET',
  data = {}
) => {
  let form = null
  let query = ""

  if (endpoint.startsWith("http:") || endpoint.startsWith("https:")) {
    prefix = ""
  }

  if (Object.entries(data).length > 0) {
    let entries = Object.entries(data)

    if (method !== 'GET' && method !== 'HEAD' && method !== 'DELETE') {
      form = new FormData()
      for (let [key, value] of entries) {
        form.append(key, value)
      }
    } else {
      query += "?"
      for (let [key, value] of entries) {
        query += `${key}=${value}&`
      }
    }
  }

  return {
    body: form,
    method: method,
    path: `${prefix}${endpoint}${query}`
  }
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
