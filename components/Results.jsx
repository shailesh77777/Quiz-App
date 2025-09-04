import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Results() {
  const navigate = useNavigate()
  const [data, setData] = useState({ score: 0, total: 0, answers: [] })

  useEffect(() => {
    const raw = sessionStorage.getItem('quiz:results')
    if (raw) {
      setData(JSON.parse(raw))
    }
  }, [])

  const restart = () => {
    sessionStorage.removeItem('quiz:results')
    navigate('/quiz')
    window.location.reload()
  }

  return (
    <div className="card">
      <h2 className="heading">Quiz Complete 🎉</h2>
      <p className="score">You scored <strong>{data.score}</strong> out of <strong>{data.total}</strong></p>

      <ul className="answer-list">
        {data.answers.map((ans, idx) => (
          <li key={idx} className="answer-item">
            <p className="question-line">{ans.question}</p>
            <p className={ans.correct ? 'good' : 'bad'}>Your Answer: {String(ans.selected || '—')}</p>
            {!ans.correct && (
              <p className="good">Correct Answer: {ans.answer}</p>
            )}
          </li>
        ))}
      </ul>

      <button className="btn primary full" onClick={restart}>Restart Quiz</button>
    </div>
  )
}
