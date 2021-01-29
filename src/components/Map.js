import React,{useEffect,useState} from 'react';
import {MapContainer,TileLayer,useMap,Marker,Popup,Circle} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/Map.css';
import numeral from 'numeral';

export const Map = ({countries,casesType='recovered',center,zoom}) => {
  const CasesTypeColors = {
    cases:{
      hex:'#cc1034',
      multiplier:200,
    },
    recovered:{
      hex:'#7dd71d',
      multiplier:200,
    },
    deaths:{
      hex:'#fb4443',
      multiplier:500,
    },
  };

  const UpdateMap= ()=> {
    const map = useMap();

    useEffect(()=>{

      const SetView = ()=>{
        map.setView(center, zoom);
      }

      SetView();
    },[map])
    return (
      <></>
    )
  }
  const CircleList =({data}) =>{
    return <div>
      {data?.map(country=>(
        <Circle
          center= {[country.countryInfo.lat,country.countryInfo.long]}
          fillOpacity={0.4}
          color={CasesTypeColors[casesType].hex}
          fillColor={CasesTypeColors[casesType].hex}
          radius={
            Math.sqrt(country[casesType]) * CasesTypeColors[casesType].multiplier
          }
          >
          <Popup >
            <div className='infoContainer'>
              <div
                className='info_flag' style={{backgroundImage:`url(${country.countryInfo.flag})`}}>
              </div>

              <h2 className='info_name'>
                {country.country}
              </h2>

              <div className='info_confirmed'>
                Cases:{numeral(country.cases).format('0,0')}
              </div>

              <div className='info_recovered'>
                Recovered:{numeral(country.recovered).format('0,0')}
              </div>
              <div className='info_deaths'>Deaths:{numeral(country.deaths).format('0,0')}</div>
            </div>
          </Popup>
        </Circle>
      )
    )
  }
    </div>

  }

  return (
    <div  className='map'>
      <MapContainer  center={center} zoom={zoom}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <CircleList data={countries}/>
        <UpdateMap />
      </MapContainer>
    </div>
  )
}
