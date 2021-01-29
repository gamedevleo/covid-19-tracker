import React,{useContext} from 'react';
import '../css/Stats.css';
import {InfoBox} from './InfoBox.js';
import {CountryInfoContext} from '../App';

export const Stats = () => {
  const countryInfo = useContext(CountryInfoContext);
  const data = countryInfo.countryInfo;
  return (
    <div className='stats'>
      <InfoBox onClick={e=>countryInfo.setCasesType('cases')}
        active = {countryInfo.casesType === 'cases'}
        isCases
        title='Caronavirus'
        total={data.cases}
        cases={data.todayCases} />
      <InfoBox onClick={e=>countryInfo.setCasesType('recovered')}
        active = {countryInfo.casesType === 'recovered'}
        isRecovered
        title='Recovered'
        total={data.recovered}
        cases={data.todayRecovered} />
      <InfoBox  onClick={e=>countryInfo.setCasesType('deaths')}
        active={countryInfo.casesType ==='deaths'}
        isDeaths
        title='Deaths'
        total={data.deaths}
        cases={data.todayDeaths} />
    </div>
  )
}
