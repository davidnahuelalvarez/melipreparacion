import { useEffect, useReducer } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { IProduct } from '../types/types'
import { ProductList } from '../components/ProductList'

interface State {
  // interface del inicialState
  products: IProduct[]
  loading: boolean
  error: string | null
}

type Action = // type de las actions, osea que type tendran los cambios de los dispatch, START no cambia nada

    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: IProduct[] }
    | { type: 'FETCH_ERROR'; payload: string }

const initialState: State = {
  // creo el inicialState
  products: [],
  loading: false,
  error: null
}

function reducer(state: State, actions: Action): State {
  // funcion reducer que generara los cambios de acuerdo al caso que reciba
  switch (actions.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null, products: [] }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: actions.payload }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: actions.payload }
    default:
      return state
  }
}

export const SearchResults = () => {
  const [state, dispatch] = useReducer(reducer, initialState) // utilizo el useReducer, el state es la variable clave que va cambiando con los dispatch
  const [searchParams] = useSearchParams() // utilizo el useSearchParams para saber que busco el usuario mirando la URL
  const query = searchParams.get('search') // aca obtengo lo que buso el usuario y lo guardo en query

  useEffect(() => {
    if (!query) return

    const fetchProducts = async () => {
      dispatch({ type: 'FETCH_START' })
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${query}`
        )
        const data = await response.json()
        if (data.total === 0) {
          const errorMessage = 'No se encontraron productos para la busqueda'
          dispatch({
            type: 'FETCH_ERROR',
            payload: errorMessage
          })
        } else {
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: data.products
          })
        }
      } catch {
        const errorMessage = 'Ocurrio un Error'
        dispatch({
          type: 'FETCH_ERROR',
          payload: errorMessage
        })
      }
    }
    fetchProducts()
  }, [query])

  if (state.loading) return <p>Cargando......</p>

  if (state.error) return <p>{state.error}</p>

  return <ProductList products={state.products} />
}
