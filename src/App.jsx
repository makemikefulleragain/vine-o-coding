import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import FeedbackButton from './components/FeedbackButton.jsx'
import FeedbackWidget from './components/FeedbackWidget.jsx'
import Home from './pages/Home.jsx'
import Widget from './pages/Widget.jsx'
import Method from './pages/Method.jsx'
import CaseStudy from './pages/CaseStudy.jsx'
import OurStory from './pages/OurStory.jsx'
import About from './pages/About.jsx'

export default function App() {
  const [feedbackOpen, setFeedbackOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/widget" element={<Widget />} />
          <Route path="/method" element={<Method />} />
          <Route path="/case-study" element={<CaseStudy />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
      {feedbackOpen && <FeedbackWidget onClose={() => setFeedbackOpen(false)} />}
      <FeedbackButton onClick={() => setFeedbackOpen(o => !o)} isOpen={feedbackOpen} />
    </div>
  )
}
