import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUESTIONS, ANSWER_OPTIONS, DIMENSIONS } from '../data/questions'

export default function Quiz({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const navigate = useNavigate()

  const question = QUESTIONS[currentIndex]
  const totalQuestions = QUESTIONS.length
  const progress = ((currentIndex) / totalQuestions) * 100
  const isAnswered = answers[question.id] !== undefined
  const isLast = currentIndex === totalQuestions - 1
  const allAnswered = Object.keys(answers).length === totalQuestions

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentIndex])

  function handleAnswer(value) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }))
  }

  function handleNext() {
    if (isLast && allAnswered) {
      onComplete(answers)
      navigate('/results')
    } else if (!isLast) {
      setCurrentIndex((i) => i + 1)
    }
  }

  function handleBack() {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && isAnswered) {
      handleNext()
    }
  }

  const dimensionLabel = DIMENSIONS[question.dimension]?.label || ''

  return (
    <div
      className="max-w-2xl mx-auto px-4 py-8 md:py-12"
      onKeyDown={handleKeyDown}
    >
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span className="text-moss-500 font-medium">{dimensionLabel}</span>
        </div>
        <div className="w-full bg-moss-100 rounded-full h-2">
          <div
            className="bg-moss-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={currentIndex + 1}
            aria-valuemin={1}
            aria-valuemax={totalQuestions}
          />
        </div>
      </div>

      {/* Question */}
      <div className="card mb-8">
        <p className="text-xl md:text-2xl font-medium text-charcoal leading-relaxed">
          {question.text}
        </p>
      </div>

      {/* Answer options */}
      <div className="space-y-3 mb-8" role="radiogroup" aria-label={question.text}>
        {ANSWER_OPTIONS.map((option) => {
          const isSelected = answers[question.id] === option.value
          return (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 font-medium text-lg
                ${
                  isSelected
                    ? 'border-moss-500 bg-moss-50 text-moss-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-moss-300 hover:bg-moss-50/50'
                }
                focus:outline-none focus:ring-2 focus:ring-moss-500 focus:ring-offset-2
              `}
              role="radio"
              aria-checked={isSelected}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                    ${isSelected ? 'border-moss-500' : 'border-gray-300'}
                  `}
                >
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-moss-500" />
                  )}
                </span>
                {option.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleBack}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${
              currentIndex === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-500 hover:text-moss-600 hover:bg-moss-50'
            }
          `}
        >
          ← Back
        </button>

        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200
            ${
              isAnswered
                ? 'bg-moss-500 text-white hover:bg-moss-600 focus:ring-2 focus:ring-moss-500 focus:ring-offset-2'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {isLast ? 'See My Results' : 'Next →'}
        </button>
      </div>

      {/* Quick nav dots */}
      <div className="flex justify-center gap-1.5 mt-8">
        {QUESTIONS.map((q, i) => (
          <button
            key={q.id}
            onClick={() => setCurrentIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-200
              ${
                i === currentIndex
                  ? 'bg-moss-500 scale-125'
                  : answers[q.id] !== undefined
                  ? 'bg-moss-300'
                  : 'bg-gray-200'
              }
            `}
            aria-label={`Go to question ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
