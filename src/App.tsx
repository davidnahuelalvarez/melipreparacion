import { Route, Routes } from 'react-router-dom'

import { Header } from './components/Header'
import { SearchResults } from './pages/SearchResults'
import { ProductDetail } from './pages/ProductDetail'

import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <p className="text-main">Realice la Busqueda de su producto</p>
            }
          />
          <Route path="/items" element={<SearchResults />} />
          <Route path="/items/:id" element={<ProductDetail />} />
        </Routes>
      </main>
    </div>
  )
}
export default App
