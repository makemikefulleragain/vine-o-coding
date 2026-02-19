import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center py-12">
        <div className="inline-block mb-4">
          <img src="/yarn.svg" alt="" className="w-16 h-16 mx-auto" />
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl text-rose-deep mb-4 leading-tight">
          Nonna's &amp; Auntie's<br />Knitting Circle
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          A cozy place for knitters, crocheters, and crafters to share what they've made, 
          ask questions, and find their people — online and around the corner.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link to="/board" className="btn-primary text-lg px-8 py-3">
            Visit the Board
          </Link>
          <Link to="/groups" className="btn-secondary text-lg px-8 py-3">
            Find Groups
          </Link>
        </div>
      </section>

      {/* What is this */}
      <section className="grid sm:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-3xl mb-3">🧶</div>
          <h2 className="font-heading text-lg text-gray-800 mb-2">Share &amp; Show</h2>
          <p className="text-gray-600 text-sm">
            Finished a project? Learning something new? Post it on the community board. 
            Show off, ask for help, or just have a natter.
          </p>
        </div>
        <div className="card text-center">
          <div className="text-3xl mb-3">📍</div>
          <h2 className="font-heading text-lg text-gray-800 mb-2">Find Your People</h2>
          <p className="text-gray-600 text-sm">
            Browse our directory of knitting and crochet groups — online communities 
            and in-person meetups. No more searching five different websites.
          </p>
        </div>
        <div className="card text-center">
          <div className="text-3xl mb-3">💡</div>
          <h2 className="font-heading text-lg text-gray-800 mb-2">Patterns &amp; Help</h2>
          <p className="text-gray-600 text-sm">
            Curated links to the best free patterns, YouTube tutorials, and craft resources. 
            Everything in one place, no hunting around.
          </p>
        </div>
      </section>

      {/* What this isn't */}
      <section className="max-w-2xl mx-auto text-center">
        <h2 className="font-heading text-2xl text-gray-800 mb-4">What this is</h2>
        <p className="text-gray-600 leading-relaxed mb-3">
          This is a community notice board — like the one at your local yarn shop, 
          but online. It's simple on purpose. No algorithms, no ads, no tracking. 
          Your data stays in your browser.
        </p>
        <p className="text-gray-600 leading-relaxed">
          It's made for people who love making things with yarn and want to connect 
          with others who do too. Whether you're a nonna who's been knitting for 
          50 years or someone who just picked up their first hook last week — 
          you belong here.
        </p>
      </section>
    </div>
  )
}

export default Home
