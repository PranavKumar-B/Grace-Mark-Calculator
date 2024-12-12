import React, { useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
// import './StudentDetails.css';

function StudentDetails() {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    fetch('http://localhost:3005/api/students')
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
        accessor: 'sub1mark',
      },
      {
        Header: 'Subject 2',
        accessor: 'sub2mark',
      },
      {
        Header: 'Subject 3',
        accessor: 'sub3mark',
      },
      {
        Header: 'Subject 4',
        accessor: 'sub4mark',
      },
      {
        Header: 'Subject 5',
        accessor: 'sub5mark',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
      <div className="stud">
        <h2>STUDENTS MARKS</h2>
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
