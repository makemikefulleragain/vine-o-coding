import { Link } from 'react-router-dom';
import { caseStudies, sectorInsights } from '../data/content';

export default function Insights() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-ku-teal font-semibold text-sm uppercase tracking-wide mb-2">
          Insights
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-ku-navy mb-4">
          What We're Seeing in the Community Sector
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
          Trends, case studies, and lessons from our work with community organisations,
          local government, and micro-NFPs across Australia.
        </p>
      </div>

      {/* Sector Insights */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-ku-navy mb-6">Sector Trends</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {sectorInsights.map((insight, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-ku-navy text-sm mb-2 leading-snug">{insight.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">{insight.content}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{insight.source}</span>
                <span className="text-xs bg-ku-teal-light text-ku-teal px-2 py-0.5 rounded-full font-medium">
                  {insight.relevance}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-ku-navy mb-6">Case Studies</h2>
        <div className="space-y-6">
          {caseStudies.map((study) => (
            <div key={study.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${study.tagColor}`}>
                    {study.tag}
                  </span>
                  {study.dimensions.map((dim) => (
                    <span key={dim} className="text-xs text-gray-400">{dim}</span>
                  ))}
                </div>
                <h3 className="font-bold text-ku-navy text-lg mb-2">{study.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{study.summary}</p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2">
                    What we're learning
                  </p>
                  <ul className="space-y-1.5">
                    {study.learnings.map((learning, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                        <span className="text-ku-teal shrink-0 mt-0.5">→</span>
                        {learning}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-ku-teal-light rounded-xl p-8 text-center">
        <h2 className="text-xl font-bold text-ku-navy mb-3">Want to be part of the conversation?</h2>
        <p className="text-gray-600 text-sm mb-6 max-w-lg mx-auto leading-relaxed">
          We're building a network of community organisations, peak bodies, and supporters
          who believe the sector deserves better digital tools. Start with the free audit
          to understand your position.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/audit"
            className="inline-flex items-center justify-center px-6 py-3 bg-ku-teal text-white font-semibold rounded-xl hover:bg-ku-teal-dark transition-colors no-underline"
          >
            Take the Free Audit
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-ku-teal font-semibold rounded-xl border-2 border-ku-teal hover:bg-ku-teal-light transition-colors no-underline"
          >
            View Services
          </Link>
        </div>
      </div>
    </div>
  );
}
