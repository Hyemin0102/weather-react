import React from 'react'

export const WeatherBox = ({weather}) => {
  const iconNow=weather?.weather[0].icon
  return (
    <div className='weather-box'> 
        <h5>{weather?.name}</h5> {/* weather가 있을때 weather.name들어옴, 처음은 null값이라 시간차때문에 오류생길수있음 */}
        <h1 className='fw-semibold'>{weather?.main.temp}℃ / {weather?.main.humidity}%</h1>
        <div className='h3 fw-semibold'>{weather?.weather[0].description}</div>
        <div className='weather-icon'>
          <img src={`https://openweathermap.org/img/wn/${iconNow}.png` }alt="weather"/>
        </div>
    </div>
  )
}

  //{weather && weather.name} 축약
  //{weather?.name}
 //{weather && weather.weather[0].description} = {weather?.weather[0].description}
//https://openweathermap.org/weather-conditions 날씨 정보 가져온 곳에서 weather정보 알수있음
