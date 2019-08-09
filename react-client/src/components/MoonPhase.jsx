import React from 'react';
import FullMoon from '/Users/hh/Documents/Coding/hackReactor/hratx41-mvp-starter/react-client/dist/images/fullmoon.jpg';
import Quarter from '/Users/hh/Documents/Coding/hackReactor/hratx41-mvp-starter/react-client/dist/images/quarter.jpg';
import Gibbous from '/Users/hh/Documents/Coding/hackReactor/hratx41-mvp-starter/react-client/dist/images/gibbous.jpg';
import NewMoon from '/Users/hh/Documents/Coding/hackReactor/hratx41-mvp-starter/react-client/dist/images/newmoon.jpg';
import Crescent from '/Users/hh/Documents/Coding/hackReactor/hratx41-mvp-starter/react-client/dist/images/crescent.jpg';

const ListItem = ({moonPhase}) => {
  const phaseNameTuple = ((percent) => {
    if (percent < 1.0) return ["New Moon", NewMoon];
    if (percent < 49.0) return ["Crescent", Crescent];
    if (percent >= 49.0 && percent <= 51.0) return ["Quarter", Quarter];
    if (percent > 51.0 && percent <= 99.0) return ["Gibbous", Gibbous];
    if (percent > 99.0 && percent < 101.0) return ["Full Moon", FullMoon];
  })(Number.parseFloat(moonPhase));
  return (
    <div style = {{textAlign: 'center', marginTop: '15px'}}>
      <h1>Lunar Phase: <span className = "lightFont">{moonPhase + "%"}</span></h1>
      <div style = {{backgroundImage: 'url(' + phaseNameTuple[1] + ')', width: '275px', height: '275px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', margin: 'auto'}}>
      </div>
      <h2 className = "lightFont">{phaseNameTuple[0]}</h2>
    </div>
  )
}

export default ListItem;