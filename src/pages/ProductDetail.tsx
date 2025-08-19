import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { IProductDetail } from '../types/types'

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<IProductDetail | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id) return

    const fetchProduct = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        if (!response.ok) {
          throw new Error('error response.ok')
        }
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        setError('error al obtener el producto catch')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) return <p>Cargando.......</p>
  if (error) return { error }
  if (!product) return <p>No se encontro producto</p>

  return (
    <div>
      <Link className="product-item-link" product-item-link to="/">
        Volver
      </Link>
      <div className="container-product-detail">
        <div>
          <h4> {product.title}</h4>
          <p> ${product.price}</p>
          <img
            className="li-product-list-img"
            src={product.images[0]}
            alt={product.title}
          />
        </div>
      </div>
    </div>
  )
}
