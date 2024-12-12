import React, { useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
// import './StudentDetails.css';

function StudentDetails() {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    fetch('http://localhost:3005/api/attendance')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'Name',
      },
      {
        Header: 'RollNumber',
        accessor: 'RollNumber',
      },
      {
        Header: 'Subject 1',
        accessor: 'sub1atten',
      },
      {
        Header: 'Subject 2',
        accessor: 'sub2atten',
      },
      {
        Header: 'Subject 3',
        accessor: 'sub3atten',
      },
      {
        Header: 'Subject 4',
        accessor: 'sub4atten',
      },
      {
        Header: 'Subject 5',
        accessor: 'sub5atten',
      },
      {
        Header: 'Publications',
        accessor: 'publications',
      },
      {
        Header: 'Academic Achievements',
        accessor: 'AcademicAchv',
      },
      {
        Header: 'Sports',
        accessor: 'Sports',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
      <div className="stud">
        <h2>ATTENDANCE</h2>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  );
}

export default StudentDetails;
