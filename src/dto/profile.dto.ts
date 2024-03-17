export type profileChangeDto = {
  token: string,
  name?: string,
  secondName?: string,
  email?: string,
  gender?: 'Мужской' | 'Женский',
  photoPath?: string,
}