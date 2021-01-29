import React from 'react';
import '../css/InfoBox.css';
import {Card,CardContent,Typography} from '@material-ui/core';

export const InfoBox = ({casesType,active,title,cases,isRecovered,isCases,isDeaths,total,...props}) => {

  return (
    <Card onClick={props.onClick} className={`infoBox ${active && 'infoBox-selected'} ${isRecovered && 'infoBox-isRecovered'} ${isDeaths && 'infoBox-isDeaths'} ${isCases && 'infoBox-isCases' }`}>
      <CardContent>
        <Typography className='infoBox_title' color='textSecondary'>
          {title}
        </Typography>
        <h2 className='infoBox_cases'>+{cases}</h2>

        <Typography className='infoBox_total'color='textSecondary'>
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  )
}
