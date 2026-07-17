import PortfolioPage from './components/PortfolioPage'
import { MotionPrefProvider } from './hooks/useMotionPref'

function App() {
  return (
    <MotionPrefProvider>
      <PortfolioPage />
    </MotionPrefProvider>
  )
}

export default App
