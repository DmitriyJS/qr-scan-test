import type { User } from '@/types/index'
// проверяет залогинен юзер или нет через куки
// при необходимиост можно добавить новые типы для куки
type CookieName = 'userData'

// Функция для установки объекта в куки (сериализация в JSON строку)
export function setUserDataCookie(user: User) {
  const userJson = JSON.stringify(user) // Преобразуем объект в строку JSON
  setCookie('userData', userJson, 2)
}

export function setCookie(name: string, value: string, days: number) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000) // 2 дня
  const expiresStr = `expires=${expires.toUTCString()}`
  document.cookie = `${name}=${value}; ${expiresStr}; path=/` // Указываем путь для доступности куки
}

// Чтение куки
export function getCookie(name: CookieName) {
  const nameEq = name + '='
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    const c = cookies[i].trim()
    if (c.indexOf(nameEq) === 0) {
      return c.substring(nameEq.length, c.length)
    }
  }
  return null
}

// Получение и десериализация данных пользователя из куки
export function getUserDataFromCookies(name: CookieName) {
  const userJson = getCookie(name)
  if (userJson) {
    return JSON.parse(userJson)
  }
  return null
}

export function deleteCookie(name: CookieName) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
}
