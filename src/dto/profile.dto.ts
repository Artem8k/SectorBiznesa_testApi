export type profileChangeDto = {
  id: string,
  name?: string,
  secondName?: string,
  email?: string,
  sex?: 'Мужской' | 'Женский',
  photo?: string,
}