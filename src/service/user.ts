import http from '../utils/http/index';

export const login = (payload: Params.Login) => {
  return http.post<Res.Login>('/login', payload)
}

export const logina = (payload: Params.Login) => {
  return http.post<Res.Login>('/login', payload)
}
