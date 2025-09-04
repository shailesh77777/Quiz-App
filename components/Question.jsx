import React from 'react'

export default function Question({ data, selected, setSelected, locked }) {
  return (
    <div>
      <p className="question-text">{data.question}</p>
      <div className="options">
        {data.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => !locked && setSelected(option)}
            className={`option ${selected === option ? 'selected' : ''}`}
            aria-pressed={selected === option}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
