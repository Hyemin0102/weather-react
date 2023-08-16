import React from 'react';
import Button from 'react-bootstrap/Button';

export const WeatherButton = () => {
  return (
    <div className='Weather-Button'>
      <Button variant="primary">Current Location</Button>
      <Button variant="outline-primary">Auckland</Button>
      <Button variant="outline-primary">Paris</Button>
      <Button variant="outline-primary">Stockholm</Button>
    </div>
  )
}
