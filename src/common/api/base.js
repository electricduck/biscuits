import auth from "../auth"
import setting from "../setting"
import { TOKEN } from "../setting/keys"

let prefix = "https://api.monzo.com"

const handle = async (
  response = new Response()
) => {
  if(!response.ok) {
    let code = response.status
    let error = ""
    let throwErr = true

    if(code === 418) {
      throw new Error("☕ I'm a teapot")
    }

    if(code === 401) {
      await auth.logout()
      throwErr = false
    }

    if(code >= 400 && code < 600) {
      error = `HTTP ${code}`
      await response.json().then((data) => {
        if (data) {
          error += ` (${data["code"]})
${data["message"]}`
        }
      })
    }

    if(throwErr) {
      throw new Error(error)
    }
  }

  return response.json()
}

const request = async (
  endpoint = "",
  method = 'GET',
  data = {},
  auth = true
) => {
  if(endpoint.startsWith("http:") || endpoint.startsWith("https:")) {
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

  return handle(response)
}

const base = {
  async get(endpoint = "", query = {}, auth = true) {
    return (await request(endpoint, 'GET', query, auth))
  },
  async post(endpoint = "", data = {}, auth = true) {
    return (await request(endpoint, 'POST', data, auth))
  },
}

export default base
