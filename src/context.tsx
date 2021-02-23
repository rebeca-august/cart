import React, { useContext, useReducer, useEffect, ReactNode } from 'react'
import reducer from './reducer'
import { State } from './reducer'

const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext({} as State)

const initialState: State = {
  loading: false,
  cart: [],
  total: 0,
  amount: 0,
  clearCart: () => {},
  decrease: () => {},
  increase: () => {},
  remove: () => {},
}

type Props = {
  children: ReactNode
}

const AppProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const remove = (id: number) => {
    dispatch({ type: 'REMOVE', payload: id })
  }

  const increase = (id: number) => {
    dispatch({ type: 'INCREASE', payload: id })
  }

  const decrease = (id: number) => {
    dispatch({ type: 'DECREASE', payload: id })
  }

  const fetchData = async () => {
    dispatch({ type: 'LOADING' })
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({ type: 'DISPLAY_ITEMS', payload: cart })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    dispatch({ type: 'GET_TOTAL' })
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
