import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import { useEventStream } from './hooks/useEventStream'
import Dashboard  from './pages/Dashboard'
import Home       from './pages/Home'
import CreateCoin from './pages/CreateCoin'
import Docs       from './pages/Docs'
import Packages   from './pages/Packages'
import NotFound   from './pages/NotFound'

function App() {
  const { connected } = useEventStream()

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout connected={connected} />}>
          <Route index          element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create"    element={<CreateCoin />} />
          <Route path="docs"      element={<Docs />} />
          <Route path="packages"  element={<Packages />} />
          <Route path="*"         element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
