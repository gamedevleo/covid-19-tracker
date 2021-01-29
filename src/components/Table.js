import React from 'react';
import '../css/Table.css';
import numeral from 'numeral';

export const Table = ({countries}) => {

  return (
    <div className='table'>
      <table>
        <tbody>
          {countries.map(({country,cases})=>(
            <tr>
              <td>{country}</td>
              <td>{numeral(cases).format('0,0')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
