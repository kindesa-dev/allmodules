export const API_BASE_URL = '/api'

export async function getStudents() {
  const response = await fetch(`${API_BASE_URL}/students`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}
