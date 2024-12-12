import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import {useLocation} from "react-router-dom";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: '#F5F5F5',
}));

const PageContainer = styled('div')(({ theme }) => ({
  backgroundColor: '#CAF1DE',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function InteractiveList() {
  const [dense, setDense] = useState(false);
  const [showGrades, setShowGrades] = useState(false);
  const [showGraceMarks, setShowGraceMarks] = useState(false);
  const [marks, setMarks] = useState([]);
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [graceMarks, setGraceMarks] = useState([]);
  const [hasPaper, setHasPaper] = useState(false);
  const [hasSports, setHasSports] = useState(false);
  const [recommendedSubject, setRecommendedSubject] = useState('');
  const [tempMarks, setTempMarks] = useState([]);
  const location = useLocation()
  const studId = location.pathname.split("/")[2]

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3005/api/students/${studId}`);
      const data = await response.json();
      const { Name, sub1mark, sub2mark, sub3mark, sub4mark, sub5mark, sub1atten, sub2atten, sub3atten, sub4atten, sub5atten, publications, Sports } = data[0];

      const marksArray = [sub1mark, sub2mark, sub3mark, sub4mark, sub5mark];
      const attendanceArray = [sub1atten, sub2atten, sub3atten, sub4atten, sub5atten];

      setMarks(marksArray);
      setAttendance(attendanceArray);
      setName(Name);

      const gradesArray = calculateGrades(marksArray);
      setGrades(gradesArray);

      const graceMarksArray = calculateGraceMarks(attendanceArray);
      setGraceMarks(graceMarksArray);

      const tempMarksArray = marksArray.map((mark, index) => mark + graceMarksArray[index]);
      setTempMarks(tempMarksArray);

      const hasPaper = publications === 1;
      const hasSports = Sports === 1;

      setHasPaper(hasPaper);
      setHasSports(hasSports);

      const recommendedSubject = findRecommendedSubject(tempMarksArray, hasPaper, hasSports);
      setRecommendedSubject(recommendedSubject);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const calculateGrades = (marksArray) => {
    return marksArray.map((mark) => {
      if (mark >= 100) {
        return 'O';
      } else if (mark >= 90) {
        return 'A+';
      } else if (mark >= 85) {
        return 'A';
      } else if (mark >= 80) {
        return 'B+';
      } else if (mark >= 70) {
        return 'B';
      } else if (mark >= 50) {
        return 'C';
      } else {
        return 'F';
      }
    });
  };

  const calculateGraceMarks = (attendanceArray) => {
    return attendanceArray.map((attendance) => {
      if (attendance === 100) {
        return 5;
      } else if (attendance >= 95) {
        return 4;
      } else if (attendance >= 90) {
        return 3;
      } else if (attendance >= 85) {
        return 2;
      } else {
        return 0;
      }
    });
  };

  const findRecommendedSubject = (marksArray, hasPaper, hasSports) => {
    if (hasPaper && hasSports) {
      const lowestMark = Math.min(...marksArray);
      const lowestMarkIndex = marksArray.indexOf(lowestMark);
      return `Subject ${lowestMarkIndex + 1}`;
    } else if (hasPaper || hasSports) {
      const originalGrades = calculateGrades(marksArray);
      let recommendedSubject = '';
      let tempMarksCopy = [...marksArray];
      let subjectIndex = -1;
      let gradeChangedSubjects = [];

      for (let i = 0; i < marksArray.length; i++) {
        const tempMarksCopyWithExtra = [...tempMarksCopy]; // Create a copy to store modified marks

        if (tempMarksCopy[i] + 5 <= 100) {
          tempMarksCopyWithExtra[i] += 5; // Add 5 marks to the current subject
          const newGrades = calculateGrades(tempMarksCopyWithExtra);

          if (newGrades[i] !== originalGrades[i]) {
            gradeChangedSubjects.push(tempMarksCopyWithExtra[i]);
          }
        }
      }

      if (gradeChangedSubjects.length > 0) {
        const minSubjectIndex = Math.min(...gradeChangedSubjects);
        subjectIndex = marksArray.indexOf(minSubjectIndex - 5);
      }

      if (subjectIndex !== -1) {
        recommendedSubject = `Subject ${subjectIndex + 1}`;
      }

      return recommendedSubject;
    } else {
      return 'No extra marks to add';
    }
  };

  const handleShowGrades = () => {
    setShowGrades(!showGrades);
  };

  const handleShowGraceMarks = () => {
    setShowGraceMarks(!showGraceMarks);
  };

  return (
    <PageContainer>
      <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
        <Typography sx={{ mt: 2, mb: 2 }} variant="h4" component="div">
          {name}
        </Typography>
        <Typography sx={{ mt: 1, mb: 1 }} variant="h5" component="div">
          {studId}
        </Typography>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox checked={showGrades} onChange={handleShowGrades} />
            }
            label="Show Grades"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={showGraceMarks}
                onChange={handleShowGraceMarks}
              />
            }
            label="Show Grace Marks"
          />
        </FormGroup>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Marks
            </Typography>
            <Demo>
              <List dense={dense}>
                {marks.map((mark, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Subject ${index + 1}: ${mark}`}
                      secondary={showGrades ? `Grade: ${grades[index]}` : null}
                    />
                  </ListItem>
                ))}
              </List>
            </Demo>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Attendance
            </Typography>
            <Demo>
              <List dense={dense}>
                {attendance.map((att, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Subject ${index + 1}: ${att}`}
                      secondary={showGraceMarks ? `Grace Marks: ${graceMarks[index]}` : null}
                    />
                  </ListItem>
                ))}
              </List>
            </Demo>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Paper Publication
            </Typography>
            <Demo>
              <Box sx={{ p: 2 }}>
              <Typography variant="body1">
            {hasPaper ? 'Yes' : 'No'}
            </Typography>
              </Box>
            </Demo>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Sports Achievement
            </Typography>
            <Demo>
              <Box sx={{ p: 2 }}>
              <Typography variant="body1">
            {hasSports ? 'Yes' : 'No'}
            </Typography>
              </Box>
            </Demo>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Recommended Subject
            </Typography>
            <Demo>
              <Box sx={{ p: 2 }}>
                <Typography variant="body1">{recommendedSubject}</Typography>
              </Box>
            </Demo>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}


