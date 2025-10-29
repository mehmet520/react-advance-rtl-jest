import { useState } from "react";

export default function FeedbackForm({ onSubmit }) {
  const [score, setScore] = useState("10");
  const [comment, setComment] = useState("");

  const isDisabled = Number(score) < 5 && comment.length <= 10;

  const textAreaPlaceholder = isDisabled
    ? "please provide a comment explaining why the experience was not good. That minimum length is 10 character."
    : "optional feedback";

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ score, comment });
  };

  return (
    <div className="App.css">
      <form onSubmit={handleSubmit} action="">
        <fieldset>
          <h2>Feedback form</h2>

          <div className="Field">
            {/* BURAYA id ve htmlFor EKLENDİ */}
            <label htmlFor="score-range">Score: {score}</label>
            <input
              id="score-range"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              type="range"
              min="0"
              max="10"
            />
          </div>

          <div className="Field">
            <label htmlFor="commentt">Comments:</label>
            <textarea
              placeholder={textAreaPlaceholder}
              name="comment"
              id="commentt"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="text"
            />
          </div>

          <button type="submit" disabled={isDisabled}>
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}