import Header from './components/Header.jsx'
import Dashboard from './components/Dashboard.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Dashboard />
      </main>
    </div>
  )
}

export default App