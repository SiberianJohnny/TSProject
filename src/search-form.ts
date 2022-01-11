import { renderBlock } from './lib.js'

export function renderSearchFormBlock(checkin?: Date, checkout?: Date) {
  const today = new Date()

  checkin = checkin ? checkin : new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2)
  checkout = checkout ? checkout : new Date(checkin.getFullYear(), checkin.getMonth(), checkin.getDate() + 2)

  const max = new Date(today.getFullYear(), today.getMonth() + 2, 1)

  const formatDate = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}`
  }

  renderBlock(
    'search-form-block',
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
<!--          &lt;!&ndash;<div class="providers">-->
<!--            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>-->
<!--            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>-->
<!--          </div>&#45;&#45;!>-->
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${formatDate(checkin)}" min="${formatDate(today)}" max="${formatDate(max)}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${formatDate(checkout)}" min="${formatDate(today)}" max="${formatDate(max)}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}