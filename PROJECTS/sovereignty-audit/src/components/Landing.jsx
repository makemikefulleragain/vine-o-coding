import { Link } from 'react-router-dom';
import { guides } from '../data/toolkit';
import { loadAuditResults, getGuideCompletionStats } from '../utils/auditStorage';

export default function Landing() {
  const saved = loadAuditResults();
  const hasResults = saved?.scores?.totalScore != null;
  const guideProgress = hasResults
    ? guides.map(g => ({ ...g, ...getGuideCompletionStats(g.id) }))
    : null;
  const guidesStarted = guideProgress ? guideProgress.filter(g => g.checked > 0).length : 0;

  return (
    <div>
      {/* Welcome back banner */}
      {hasResults && (
        <div className="bg-ku-navy text-white print:hidden">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-sm font-bold">{saved.scores.totalScore}</span>
              </div>
              <div>
                <p className="text-sm font-medium">Welcome back! Your sovereignty score: {saved.scores.totalScore}/100</p>
                <p className="text-xs text-white/60">
                  {guidesStarted > 0
                    ? `${guidesStarted} of ${guides.length} toolkit guides started`
                    : 'Start your toolkit guides to improve your score'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/results" className="text-xs font-medium text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg no-underline transition-colors">
                View Results
              </Link>
              <Link to="/toolkit" className="text-xs font-medium text-ku-navy bg-white hover:bg-white/90 px-3 py-1.5 rounded-lg no-underline transition-colors">
                Continue Toolkit
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="bg-linear-to-b from-ku-teal-light to-ku-warm">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-ku-teal font-semibold text-sm uppercase tracking-wide mb-3">
              Free Digital Sovereignty Self-Assessment
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ku-navy leading-tight mb-6">
              Where is your organisation
              <span className="text-ku-teal"> locked in</span>,{' '}
              <span className="text-ku-amber">leaking data</span>, or{' '}
              <span className="text-ku-red">overpaying</span>?
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              A 2-minute self-assessment for community organisations. Get a personalised
              sovereignty map showing exactly where you stand, and what to do next.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/audit"
                className="inline-flex items-center justify-center px-8 py-4 bg-ku-teal text-white font-semibold rounded-xl hover:bg-ku-teal-dark transition-colors text-lg no-underline shadow-md hover:shadow-lg"
              >
                {hasResults ? 'Retake Your Audit' : 'Start Your Free Audit'}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No sign-up required. No data leaves your device.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toolkit cards — enhanced */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-ku-navy mb-3">
            Your sovereignty toolkit
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Four focused guides that build to a complete picture of your digital sovereignty.
            Complete all four for your full sovereignty report.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.id}
              to={guide.path}
              className="group block rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-xl transition-all no-underline hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-36 overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <span className="text-white font-bold text-lg drop-shadow-md">{guide.icon} {guide.title}</span>
                </div>
                <div className="absolute top-3 right-3 flex gap-1.5">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
                    {guide.time}
                  </span>
                  <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
                    {guide.order} of 4
                  </span>
                </div>
              </div>
              {/* Content */}
              <div className="p-5">
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{guide.description}</p>
                <div className="flex items-start gap-2 bg-gray-50 rounded-lg p-3">
                  <svg className="w-4 h-4 text-ku-teal shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs text-gray-700 font-medium leading-relaxed">
                    <span className="text-ku-teal">You'll get:</span> {guide.deliverable}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">
          Photos by {guides.map(g => g.imageCredit).join(', ')} on Unsplash
        </p>
      </section>

      {/* How it works */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-ku-navy mb-8 text-center">
            How it works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Answer 10 questions',
                desc: 'Simple, jargon-free questions about your current digital tools and practices. Takes about 2 minutes.',
              },
              {
                step: '2',
                title: 'Get your sovereignty map',
                desc: 'See where you stand across four key dimensions, with a clear traffic-light view of your position.',
              },
              {
                step: '3',
                title: 'Use the toolkit',
                desc: 'Four focused guides help you act on your results. Each builds toward a full sovereignty picture.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 bg-ku-teal text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-ku-navy mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/audit"
              className="inline-flex items-center justify-center px-8 py-4 bg-ku-teal text-white font-semibold rounded-xl hover:bg-ku-teal-dark transition-colors text-lg no-underline shadow-md"
            >
              Start Your Free Audit
            </Link>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-ku-navy mb-4 text-center">
          Built for community organisations
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
          If you manage the tech because nobody else will, this is for you. NFPs, volunteer-led groups,
          neighbourhood centres, local sporting clubs, Aboriginal community organisations, anyone
          running on a mix of free tools and paid subscriptions who suspects they could be doing better.
        </p>
        <div className="bg-ku-teal-light rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-sm">
          <p className="text-ku-navy text-sm leading-relaxed italic">
            "I manage the Google Workspace, the Xero, the booking system. I have maybe 30 minutes
            a week for 'digital stuff.' I just need to know: are we doing this right?"
          </p>
          <p className="text-ku-teal-dark font-semibold text-sm mt-3">
            Priya, Operations Coordinator, 12-person NFP
          </p>
        </div>
      </section>

      {/* Privacy commitment */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex items-start gap-4 max-w-2xl mx-auto">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-1">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-ku-navy mb-1">Your data stays yours</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                This tool runs entirely in your browser. Your answers are never transmitted to any server.
                No accounts, no cookies, no analytics, no tracking. We practice what we preach about digital sovereignty.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
