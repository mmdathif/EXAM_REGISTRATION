import { useState } from 'react';
import './OnlineExam.css';

function OnlineExam() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSendEmail = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/send-exam-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Something went wrong!');
    }
  };

  return (
    <div className="online-exam-form">
      <h2>Online Exam Registration</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter your Gmail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSendEmail}>Send Exam Link</button>
    </div>
  );
}

export default OnlineExam;
