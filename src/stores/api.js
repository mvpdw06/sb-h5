async function handleResponse(response) {
  const payload = await response.json()
  if (payload.code !== 'COMM0000') throw new Error(payload.msg)
  return payload.data
}

export const getBalance = () => {}

export const queryFeaturedMatches = () =>
  fetch('/mock/game/list/football.json').then(handleResponse)

export const queryInPlayMatches = queryFeaturedMatches

export const queryTodayMatches = queryFeaturedMatches

export const queryPreStartMatches = queryFeaturedMatches

export const getMatch = () =>
  fetch('/mock/game/single/football.json').then(handleResponse)

export const querySportMenu = () =>
  fetch('/mock/game/menu.json').then(handleResponse)

export const getBetSlip = () => {}

export const placeBet = () => {}
