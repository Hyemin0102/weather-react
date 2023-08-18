import React from 'react';
import Button from 'react-bootstrap/Button';

export const WeatherButton = ({cities,setCity}) => {
  return (
    <div className='Weather-Button'>
      <Button variant="primary">Current Location</Button>
      {cities.map((city,index)=>( <Button variant="outline-primary" key={index} onClick={()=>setCity(city)}>{city}</Button>))}
     {/*  여기서 city는 setCity에서 관리하고있는 아이템 이름과 동일 */}
    </div>
  )
}
