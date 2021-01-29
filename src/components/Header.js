import React,{useState,useEffect,useContext} from 'react';
import '../css/Header.css';
import {MenuItem,FormControl,Select} from '@material-ui/core';
import {CountryInfoContext} from '../App';
import {SortData} from '../util';



export const Header = ({test,setTest}) => {
  const [country,setCountry] = useState('worldwide');
  const countryInfo = useContext(CountryInfoContext);

  useEffect(()=>{
    const getData=async ()=>{
      await fetch('https://disease.sh/v3/covid-19/all')
       .then(res=>res.json())
       .then(data=>{
         countryInfo.SetCountryInfo(data);
       })
    }

    getData();
  },[])


  useEffect(()=>{

    const getCountriesData = async ()=>{
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then(res=>res.json())
      .then(data=>{
        const countries=data.map(each=>(
          {
            name:each.country,
            value:each.countryInfo.iso2
          }
        ));
        countryInfo.SetCountries(countries);
        const SortedData = SortData(data);
        countryInfo.SetTableData(SortedData);
        countryInfo.SetMapCountries(data);
      })
    }
    getCountriesData();
  },[]);

  const onCountryChange = async (e)=>{
    const countryCode = e.target.value;

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(res=> res.json())
    .then(data=>{
      setCountry(countryCode);
      countryInfo.SetCountryInfo(data);
      if(countryCode === 'worldwide'){
        countryInfo.SetMapCenter([10.80746,10.4796]);
        countryInfo.SetMapZoom(2);
      }
      else{
          countryInfo.SetMapCenter([data.countryInfo.lat,data.countryInfo.long]);
          countryInfo.SetMapZoom(4);
      }


    })
  }

  return (
    <div className='header'>
      <h1>COVID-19 TRACKER</h1>
      <FormControl className='header_dropdown'>
        <Select variant='outlined' value={country} onChange={onCountryChange}>
          <MenuItem value='worldwide'>Worldwide</MenuItem>
          {countryInfo.countries.map(country=>(
            <MenuItem key={country.name} value={country.value}>{country.name}</MenuItem>
          ))}
        </Select>

      </FormControl>
    </div>
  )
}
