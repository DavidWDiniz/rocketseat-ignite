import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Index } from './pages/History'
import { DefaultLayout } from './layouts/DefaultLayout'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<Index />} />
      </Route>
    </Routes>
  )
}
