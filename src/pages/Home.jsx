import useDocTitle from '../hooks/useDocTitle.js'
import Hero from '../components/Hero.jsx'
import Process from '../components/Process.jsx'
import Toolkit from '../components/Toolkit.jsx'
import MethodologyFlow from '../components/MethodologyFlow.jsx'
import FadeIn from '../components/FadeIn.jsx'
import Proof from '../components/Proof.jsx'

export default function Home() {
  useDocTitle('Build real things with AI')
  return (
    <>
      <Hero />
      <Process />
      <Toolkit />
      <section className="py-14 lg:py-18 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                The loop behind every phase
              </h2>
              <p className="mt-3 text-slate-500">
                Each phase of your project follows this cycle. Press play to see it in action.
              </p>
            </div>
            <MethodologyFlow />
          </FadeIn>
        </div>
      </section>
      <Proof />
    </>
  )
}
