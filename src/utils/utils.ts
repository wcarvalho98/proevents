export const fetcher = async (url: string) => {
  const res = await fetch(`${process.env.BASE_FETCH_URL ?? "http://localhost:3000/"}${url}`)
  return await res.json()
}