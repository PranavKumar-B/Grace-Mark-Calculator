import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function renderRow(props: ListChildComponentProps, items: any[]) {
  const { index, style } = props;
  const student = items[index];

  if (!student) {
    return null;
  }

  return (
    <tr style={style} key={student.id}>
      <td>{student.id}</td>
      <td>
        <Link to={`/rec/${student.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {student.name}
        </Link>
      </td>
    </tr>
  );
}

function VirtualizedList() {
  const [items, setItems] = useState([]);
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3005/fff')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          // navigate('/login')
        } else {
          setAuth(false);
          setMessage(res.data.Error);
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/students');
      const data = await response.json();
      const transformedData = data.map(student => ({
        id: student.RollNumber,
        name: student.Name,
      }));
      setItems(transformedData);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '76vh',
    overflow: 'auto',
  };

  const tableStyle = {
    width: '110%',
    maxWidth: 560,
    marginTop: '16px',
    borderCollapse: 'collapse',
  };

  const tableHeadStyle = {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
  };

  const tableCellStyle = {
    border: '1px solid #ddd',
    padding: '20px',
  };
  return (
    <div style={containerStyle}>
      <Box sx={{ maxWidth: 560 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={{ ...tableCellStyle, ...tableHeadStyle }}>Rollnumber</th>
              <th style={{ ...tableCellStyle, ...tableHeadStyle }}>Name</th>
            </tr>
          </thead>
          <tbody>
            {items.map(student => (
              <tr key={student.id}>
                <td style={tableCellStyle}>
                  <Link to={`/rec/${student.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {student.id}
                  </Link>
                </td>
                <td style={tableCellStyle}>
                  <Link to={`/rec/${student.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {student.name}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </div>
  );
}

export default VirtualizedList;
