import { Item } from './CartItem'

export type State = {
  loading: boolean
  cart: Item[]
  total: number
  amount: number
  clearCart: () => void
  remove: (id: number) => void
  increase: (id: number) => void
  decrease: (id: number) => void
}

type ClearCartAction = { type: 'CLEAR_CART' }
type RemoveAction = { type: 'REMOVE'; payload: number }
type IncreaseAction = { type: 'INCREASE'; payload: number }
type DecreaseAction = { type: 'DECREASE'; payload: number }
type GetTotalAction = { type: 'GET_TOTAL' }
type LoadingAction = { type: 'LOADING' }
type DisplayItemsAction = { type: 'DISPLAY_ITEMS'; payload: Item[] }

export type Action =
  | ClearCartAction
  | RemoveAction
  | IncreaseAction
  | DecreaseAction
  | GetTotalAction
  | LoadingAction
  | DisplayItemsAction

const reducer = (state: State, action: Action): State => {
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] }
  }
  if (action.type === 'REMOVE') {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    }
  }
  if (action.type === 'INCREASE') {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 }
      }
      return cartItem
    })
    return { ...state, cart: tempCart }
  }

  if (action.type === 'DECREASE') {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 }
        }
        return cartItem
      })
      .filter((cartItem) => cartItem.amount !== 0)
    return { ...state, cart: tempCart }
  }

  if (action.type === 'GET_TOTAL') {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem
        const itemTotal = price * amount

        cartTotal.amount += amount
        cartTotal.total += itemTotal

        return cartTotal
      },
      { total: 0, amount: 0 },
    )
    total = parseFloat(total.toFixed(2))

    return { ...state, total, amount }
  }

  if (action.type === 'LOADING') {
    return { ...state, loading: true }
  }

  if (action.type === 'DISPLAY_ITEMS') {
    return { ...state, cart: action.payload, loading: false }
  }

  throw new Error('no matching action type')
}

export default reducer
