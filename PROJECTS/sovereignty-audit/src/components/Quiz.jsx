import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import { calculateScores } from '../utils/scoring';
import { saveAuditResults, saveAuditToHistory } from '../utils/auditStorage';

export default function Quiz({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);

  const question = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;
  const isLast = currentIndex === questions.length - 1;
  const navigate = useNavigate();

  function handleSelect(option) {
    setSelectedOption(option.id);
    setAnswers((prev) => ({
      ...prev,
      [question.id]: {
        questionId: question.id,
        dimension: question.dimension,
        optionId: option.id,
        score: option.score,
      },
    }));
  }

  function handleNext() {
    if (!selectedOption) return;

    if (isLast) {
      const finalAnswers = {
        ...answers,
        [question.id]: {
          questionId: question.id,
          dimension: question.dimension,
          optionId: selectedOption,
          score: questions[currentIndex].options.find((o) => o.id === selectedOption)?.score || 0,
        },
      };
      const scores = calculateScores(finalAnswers);
      saveAuditResults(finalAnswers, scores);
      saveAuditToHistory(finalAnswers, scores);
      onComplete(finalAnswers);
      navigate('/results');
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(answers[questions[currentIndex + 1]?.id]?.optionId || null);
    }
  }

  function handleBack() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedOption(answers[questions[currentIndex - 1]?.id]?.optionId || null);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-ku-teal h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Dimension badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-ku-teal-light text-ku-teal-dark text-xs font-semibold rounded-full uppercase tracking-wide">
          {question.dimension === 'dataOwnership' && 'Data Ownership'}
          {question.dimension === 'vendorLockin' && 'Vendor Lock-in'}
          {question.dimension === 'costTransparency' && 'Cost Transparency'}
          {question.dimension === 'aiReadiness' && 'AI Readiness'}
        </span>
      </div>

      {/* Question */}
      <h2 className="text-xl sm:text-2xl font-bold text-ku-navy mb-3 leading-snug">
        {question.text}
      </h2>
      {question.helpText && (
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          {question.helpText}
        </p>
      )}

      {/* Options */}
      <div className="space-y-3 mb-8">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-150 cursor-pointer ${
              selectedOption === option.id
                ? 'border-ku-teal bg-ku-teal-light'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className={`text-sm leading-relaxed ${
              selectedOption === option.id ? 'text-ku-navy font-medium' : 'text-gray-700'
            }`}>
              {option.text}
            </span>
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={currentIndex === 0}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            currentIndex === 0
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-600 hover:text-ku-navy hover:bg-gray-100 cursor-pointer'
          }`}
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedOption}
          className={`px-6 py-3 text-sm font-semibold rounded-xl transition-colors ${
            selectedOption
              ? 'bg-ku-teal text-white hover:bg-ku-teal-dark cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isLast ? 'See My Results' : 'Next →'}
        </button>
      </div>

      {/* Privacy reminder */}
      <p className="text-center text-xs text-gray-400 mt-8">
        Your answers stay on your device. Nothing is sent to any server.
      </p>
    </div>
  );
}
