import React, { useState } from "react";

const QuestionBox = ({ question, options, correct }) => {
  const [answer, selected] = useState(options);

  return (
    <div className="questionBox">
      <div className="question">{question}</div>
      {answer.map((ans, index) => (
        <button
          key={index}
          className="answerBtn"
          onClick={() => {
            selected([ans]);
            correct(ans);
          }}
        >
          {ans}
        </button>
      ))}
    </div>
  );
};
export default QuestionBox;
