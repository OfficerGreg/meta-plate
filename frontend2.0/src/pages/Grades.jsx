import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Table from '../components/table/Table';
import httpClient from '../httpClient';

const renderModulHead = (modul, index) => <th key={index}>{modul}</th>;

const renderModulBody = (modul, index) => (
  <tr key={index}>
    <td>{modul.name}</td>
    <td>{modul.zp ? modul.zp : 'N/A'}</td>
    <td>{modul.lb ? modul.lb : 'N/A'}</td>
    <td>{modul.teacher ? modul.teacher : 'N/A'}</td>
  </tr>
);

const Grades = () => {
  const [user, setUser] = useState(null);
  const [moduls, setModuls] = useState([]);
  const history = useHistory();

  const fetchUserData = async () => {
    try {
      const response = await httpClient.get('//localhost:5000/@me');
      const userData = response.data;
      setUser(userData);
    } catch (error) {
      console.log('Not authenticated');
      history.push('/login');
    }
  };

  const fetchModulsData = async () => {
    try {
      const response = await httpClient.get('//localhost:5000/modul/get_all');
      const modulsData = response.data.moduls;
      console.log(modulsData); // Check the data received from the backend
      setModuls(modulsData);
    } catch (error) {
      console.log('Error fetching modul data');
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchModulsData();
  }, []);

  return (
    <div>
      <h2 className="page-header">Grades</h2>
      <div className="grades-container">
        <div className="card">
          <div className="card__body">
            {moduls.length > 0 ? (
              <Table
                headData={['Name', 'ZP Grade', 'LB Grade', 'Teacher']}
                renderHead={(item, index) => renderModulHead(item, index)}
                bodyData={moduls}
                renderBody={(item, index) => renderModulBody(item, index)}
              />
            ) : (
              <p>No modules found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grades;
