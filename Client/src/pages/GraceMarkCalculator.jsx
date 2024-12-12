import React, { useState } from 'react';

function GraceMarkCalculator() {
  const [marks, setMarks] = useState('');
  const [attendance, setAttendance] = useState('');
  const [graceMarks, setGraceMarks] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);

  const handleMarksChange = (event) => {
    setMarks(event.target.value);
  };

  const handleAttendanceChange = (event) => {
    setAttendance(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const grace = calculateGraceMarks(parseFloat(attendance));
    setGraceMarks(grace);
    const total = parseFloat(marks) + grace;
    setTotalMarks(total);
  };

  const calculateGraceMarks = (attendance) => {
    if (attendance > 80 && attendance < 85) {
      return 1;
    } else if (attendance >= 85 && attendance < 90) {
      return 2;
    } else if (attendance >= 90 && attendance < 95) {
      return 3;
    } else if (attendance >= 95 && attendance < 100) {
      return 4;
    } else if (attendance === 100) {
      return 5;
    } else {
      return 0;
    }
  };

  return (
    <div className="GraceMarkCalculator">
      <h1>Grace Mark Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="marks">Enter Marks:</label>
        <input
          type="number"
          id="marks"
          name="marks"
          value={marks}
          onChange={handleMarksChange}
          required
        />

        <label htmlFor="percentage">Enter Attendance Percentage:</label>
        <input
          type="number"
          id="percentage"
          name="percentage"
          value={attendance}
          onChange={handleAttendanceChange}
          required
        />

        <button type="submit">Calculate Grace Marks</button>
      </form>

      <div>
        <p>Your Grace Marks:</p>
        <h2>{graceMarks}</h2>
      </div>

      <div>
        <p>Your Total Marks After Grace:</p>
        <h2>{totalMarks}</h2>
      </div>
    </div>
  );
}

export default GraceMarkCalculator;
