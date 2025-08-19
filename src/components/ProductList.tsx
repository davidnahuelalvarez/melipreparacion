import type { IProduct } from '../types/types'
import { Link } from 'react-router-dom'

interface Props {
  // defino la interface de la funcion ProductList
  products: IProduct[]
}

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <ul className="ul-product-list">
      {products.map((product) => (
        <li className="li-product-list" key={product.id}>
          <Link to={`/items/${product.id}`} className="product-item-link">
            <h4> {product.title}</h4>
            <p> ${product.price}</p>
            <img
              className="li-product-list-img"
              src={product.images[0]}
              alt={product.title}
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
