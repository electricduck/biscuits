import setting from "../setting"
import { TOKEN } from "../setting/keys"

let prefix = "https://api.monzo.com"

const request = async (
  endpoint = "",
  method = 'GET',
  data = {},
  auth = true
) => {
  let form = null
  let query = ""
  let token = ""

  if(auth) {
    token = await setting.get(TOKEN);
    if(token) {
      token = `Bearer ${token}`
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
      query = "?"
      for (let [key, value] of entries) {
        query += `${key}=${value}&`
      }
    }
  }

  let response = await fetch(
    `${prefix}${endpoint}${query}`,
    {
      body: form,
      cache: 'default',
      headers: {
        'Authorization': token
      },
      method: method
    }
  )

  return response.json()
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