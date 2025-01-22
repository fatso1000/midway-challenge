type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface ApiRequestOptions<TBody> {
  method?: HttpMethod
  body?: TBody
  headers?: Record<string, string>
  queryParams?: Record<string, string | number>
}

const BASE_URL = 'https://fe-sr-challenge.baymark.net/api/reports'

export default async function apiRequest<TResponse, TBody = undefined>(
  options: ApiRequestOptions<TBody> = {},
): Promise<TResponse> {
  const { method = 'GET', body, headers = {}, queryParams } = options

  const queryString = queryParams
    ? '?' +
      Object.entries(queryParams)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&')
    : ''

  const fullUrl = `${BASE_URL}${queryString}`

  const fetchOptions: RequestInit = {
    method,
    headers: {
      Authorization: 'Bearer 8def2320e7486ac76d003497fe22ce5a',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  }

  try {
    const response = await fetch(fullUrl, fetchOptions)

    if (!response.ok) {
      const errorBody = await response.json()
      throw new Error(
        `HTTP Error: ${response.status} - ${errorBody.message || response.statusText}`,
      )
    }

    const responseData: TResponse = await response.json()
    return responseData
  } catch (error) {
    throw error
  }
}
