import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
  const [query, setquery] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/items?search=${query}`) //esto cambiara la ruta y lo hara utilizando el queri que se actualuiza en el onChange del input
    }
  }

  return (
    <div>
      <form className="header" onSubmit={handleSubmit}>
        <input
          className="search"
          type="text"
          value={query}
          onChange={(e) => {
            setquery(e.target.value)
          }}
        />
        <button className="search-button" type="submit">
          Buscar
        </button>
      </form>
    </div>
  )
}
