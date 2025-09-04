import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Question from './Question.jsx'
import ProgressBar from './ProgressBar.jsx'
import questionsData from '../data/questions.json'

export default function Quiz() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([]) // {id, question, selected, answer, correct}
  const [score, setScore] = useState(0)
  const [locked, setLocked] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30) // 30s per question

  const questions = useMemo(() => questionsData.slice(0, 10), [])

  useEffect(() => {
    setSelected(null)
    setLocked(false)
    setTimeLeft(30)
  }, [index])

  useEffect(() => {
    if (locked) return
    if (timeLeft <= 0) {
      // auto lock
      handleLockAndNext()
      return
    }
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, locked])

  const handleLockAndNext = () => {
    const q = questions[index]
    const isCorrect = selected === q.answer
    const entry = { id: q.id, question: q.question, options: q.options, selected, answer: q.answer, correct: isCorrect }
    setAnswers((prev) => [...prev, entry])
    if (isCorrect) setScore((s) => s + 1)
    setLocked(true)

    // move next after short delay to show lock
    setTimeout(() => {
      if (index + 1 < questions.length) {
        setIndex(index + 1)
      } else {
        // end
        sessionStorage.setItem('quiz:results', JSON.stringify({ score: isNaN(score) ? 0 : (score + (isCorrect ? 1 : 0)), total: questions.length, answers: [...answers, entry] }))
        navigate('/results')
      }
    }, 400)
  }

  const handleNext = () => {
    if (!selected) return
    handleLockAndNext()
  }

  const handlePrev = () => {
    if (index === 0) return
    // simple previous: move back without changing previous saved entries (lightweight implementation)
    setIndex(index - 1)
  }

  return (
    <div className="card">
      <ProgressBar current={index + 1} total={questions.length} />

      <div className="timer" aria-live="polite">
        Time left: <strong>{timeLeft}s</strong>
      </div>

      <Question
        data={questions[index]}
        selected={selected}
        setSelected={setSelected}
        locked={locked}
      />

      <div className="actions">
        <button className="btn secondary" onClick={handlePrev} disabled={index === 0}>Previous</button>
        <button
          className="btn primary"
          onClick={handleNext}
          disabled={!selected}
        >
          {index + 1 === questions.length ? 'Finish' : 'Next'}
        </button>
      </div>
      <div className="hint">Select an answer to continue. Answers auto-submit if the timer ends.</div>
    </div>
  )
}
