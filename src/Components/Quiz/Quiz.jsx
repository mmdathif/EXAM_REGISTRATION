import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({}); // to track selected answers
  const [score, setScore] = useState(0); // to store the score
  const [quizFinished, setQuizFinished] = useState(false); // to check if quiz is finished
  const [email, setEmail] = useState(''); // to store email input
  const { username } = useParams();

  useEffect(() => {
    fetch('http://localhost:5000/api/questions')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch questions');
        }
        return res.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption,
    });
  };

  const handleSubmit = () => {
    let totalScore = 0;

    // Loop through questions and check answers
    questions.forEach((q) => {
      const questionId = q.id || q.question_id; // Ensure you're using the correct id
      const selectedAnswer = answers[questionId]; // Get selected answer
      
      // Compare selected answer with the correct answer
      if (selectedAnswer && selectedAnswer === q.correct_answer) {
        totalScore += 1; // Increment score if the answer is correct
      }
    });

    setScore(totalScore); // Set final score
    setQuizFinished(true); 

    // Send summary email after quiz submission
    fetch('http://localhost:5000/api/send-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: username,
        email: email,
        score: totalScore,
        total: questions.length,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Summary email sent:', data);
      })
      .catch((err) => {
        console.error('Error sending summary email:', err);
      });
  };

  if (loading) {
    return <div>Loading quiz...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Hello {username}, here is your quiz!</h2>

      {/* Email input field */}
      <div style={{ marginTop: '20px' }}>
        <label htmlFor="email">Enter your email to receive results:</label>
        <br />
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@example.com"
          required
          style={{
            padding: '8px',
            marginTop: '5px',
            width: '300px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      {quizFinished ? (
        <div>
          <h3>Your Score: {score}/{questions.length}</h3>
          <button onClick={() => window.location.reload()}>Restart Quiz</button>
        </div>
      ) : (
        <div>
          {questions.length === 0 ? (
            <p>No questions available.</p>
          ) : (
            questions.map((q, index) => {
              const questionId = q.id || q.question_id; 
              return (
                <div key={questionId} style={{ marginBottom: '20px' }}>
                  <p>
                    <strong>{index + 1}. {q.question_text}</strong>
                  </p>
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {['A', 'B', 'C', 'D'].map((opt) => (
                      <li key={opt} style={{ marginBottom: '5px' }}>
                        <button
                          onClick={() => handleAnswerChange(questionId, opt)}
                          style={{
                            backgroundColor: answers[questionId] === opt ? '#d3d3d3' : '',
                            padding: '8px 12px',
                            cursor: 'pointer',
                          }}
                        >
                          {opt}. {q[`option_${opt.toLowerCase()}`]}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })
          )}

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < questions.length || !email.trim()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor:
                Object.keys(answers).length < questions.length || !email.trim()
                  ? '#ccc'
                  : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor:
                Object.keys(answers).length < questions.length || !email.trim()
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
