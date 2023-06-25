import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import JsonData from "../../data/grades.json";

interface Grade {
  modul: string;
  ZP: string;
  LB: string;
}

const Grades: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const handleModuleClick = (modul: string) => {
    setSelectedModule(prevSelectedModule => prevSelectedModule === modul ? null : modul);
  };

  return (
    <section>
      <h1>Test</h1>
      <table style={{ borderCollapse: 'collapse', border: '2px solid black', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '2px solid black', padding: '8px' }}>Module</th>
          </tr>
        </thead>
        <tbody>
          {JsonData.map((grade: Grade, index: number) => (
            <React.Fragment key={index}>
              <tr>
                <td
                  style={{
                    border: '2px solid black',
                    padding: '8px',
                    cursor: 'pointer',
                    backgroundColor: selectedModule === grade.modul ? 'lightblue' : 'white',
                  }}
                  onClick={() => handleModuleClick(grade.modul)}
                >
                  {grade.modul}
                </td>
              </tr>
              {selectedModule === grade.modul && (
                <tr>
                  <td colSpan={3}>
                    <table style={{ borderCollapse: 'collapse', border: '1px solid black', width: '100%' }}>
                      <thead>
                        <tr>
                          <th style={{ border: '1px solid black', padding: '8px' }}>ZP</th>
                          <th style={{ border: '1px solid black', padding: '8px' }}>LB</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ border: '1px solid black', padding: '8px' }}>{grade.ZP}</td>
                          <td style={{ border: '1px solid black', padding: '8px' }}>{grade.LB}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Grades;
