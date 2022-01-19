import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'

type UserType = {
  userName: string,
  avatarUrl: string
};
type favoritesAmountType = number;

let userValue: UserType = {
  userName: "Warren",
  avatarUrl: "/img/avatar.png"
};

localStorage.user = JSON.stringify(userValue);
localStorage.setItem('favoritesAmount', '5');

function getUserData() {
  const userData: unknown = JSON.parse(localStorage.user)
  return userData as UserType;
}
const user = getUserData();

function getFavoritesAmount() {
  const favoritesData: unknown = localStorage.getItem('favoritesAmount');
  return favoritesData as favoritesAmountType;
}
const favoritesAmount = getFavoritesAmount();

interface SearchFormData {
  City: string
  CheckInDate: string
  CheckOutDate: string
  Price: number
};

function searchHandler() {
  const form: HTMLFormElement = document.querySelector('form')
  const cityData = <HTMLInputElement>document.getElementById('city')
  const checkinData = <HTMLInputElement>document.getElementById('check-in-date')
  const checkoutData = <HTMLInputElement>document.getElementById('check-out-date')
  const maxpriceData = <HTMLInputElement>document.getElementById('max-price')

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchData: SearchFormData = {
      City: cityData.value,
      CheckInDate: checkinData.value,
      CheckOutDate: checkoutData.value,
      Price: Number(maxpriceData.value),
    }
    search(searchData)
  })
}

function search(searchData: SearchFormData) {
  console.log(searchData)
}

interface dataType {
  completed: boolean
  id: number
  title: string
  userId: number
}

window.addEventListener('DOMContentLoaded', () => {

  async function fetchAPI() {
    return await fetch('https://jsonplaceholder.typicode.com/todos')
      .then<dataType[]>((res) => res.json())
  }

  function getTodosByCount(count: number) {
    console.log(count)
  }

  fetchAPI().then((res) => {
    const completedToDos = res.filter((item) => item.completed === false)
    const notCompletedToDos = res.filter((item) => item.completed === true)
    console.log('Completed Todos count:')
    getTodosByCount(completedToDos.length)
    console.log('Not completed Todos count:')
    getTodosByCount(notCompletedToDos.length)
  }).catch((e) => {
    console.log('Ошибка: ' + e)
  })


  renderUserBlock(user.userName, user.avatarUrl, favoritesAmount)
  renderSearchFormBlock()
  renderSearchStubBlock()
  searchHandler()
  renderToast(
    { text: 'Это пример уведомления. Используйте его при необходимости', type: 'success' },
    { name: 'Понял', handler: () => { console.log('Уведомление закрыто') } }
  )
})
