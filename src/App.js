import React,{useState} from 'react';
import './App.css';
import {Header} from './components/Header';
import {Stats} from './components/Stats';
import {Map} from './components/Map';
import {Card,CardContent} from '@material-ui/core';
import {Table} from './components/Table';
import {LineGraph} from './components/LineGraph';

export const CountryInfoContext= React.createContext();

function App() {
  const [countryInfo,setCountryInfo] = useState({});
  const [countries,setCountries]=useState([]);
  const [tableData,setTableData] = useState([]);
  const [mapCenter,setMapCenter] =useState([10.80746,10.4796])
  const [mapZoom,setMapZoom] = useState(2);
  const [mapCountries,setMapCountries] =useState([]);
  const [casesType,setCasesType] = useState('cases');


  const value ={
    casesType,
    countryInfo,
    countries,
    tableData,
    mapCountries,
    SetCountryInfo: (data)=>{
      setCountryInfo(data);
    },
    SetCountries:(data)=>{
      setCountries(data);
    },
    SetTableData:(data)=>{
      setTableData(data);
    },
    SetMapCenter:(data)=>{
      setMapCenter(data);
    },
    SetMapZoom:(data)=>{
      setMapZoom(data);
    },
    SetMapCountries:(data)=>{
      setMapCountries(data);
    },
    setCasesType:data=>{
      setCasesType(data);
    }
  }

  return (
    <CountryInfoContext.Provider value={value} >
      <div className="app">
        <div className='app_left'>
          <Header />
          <Stats />
          <Map
            casesType={casesType}
            countries = {mapCountries}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
        <Card className='app_right'>
          <CardContent>
            <h3>Live Cases by Country </h3>
            <Table countries={tableData}/>
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType}/>
          </CardContent>
        </Card>
      </div>

    </CountryInfoContext.Provider>

  );
}

export default App;
