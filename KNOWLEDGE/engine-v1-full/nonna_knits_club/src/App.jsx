import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Board from './pages/Board'
import Groups from './pages/Groups'
import Resources from './pages/Resources'
import Saved from './pages/Saved'
import FeedbackWidget from './components/FeedbackWidget'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<Board />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
      <FeedbackWidget />
    </Layout>
  )
}

export default App
