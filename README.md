<img src="https://github.com/Hyemin0102/weather-react/assets/128768462/c566f6d2-18dd-447e-808a-0d66cc57e1ce"/>

# Weather-React
OpenWeatherMap api 데이터를 연동한 날씨 앱

<br>

## 🔎프로젝트 소개
https://main--silver-sundae-f117dc.netlify.app/

리액트로 OpenWeatherMap api 데이터를 연동해 현재 위치를 파악하여 날씨를 알려주는 간단한 웹페이지입니다.

<br>

## ⚙개발 환경
React, react-bootstrap, react-spinners, OpenWeatherMap api

<br>

## 🚩주요 기능
- [현재 위치 좌표 구하기](#현재-위치-좌표-구하기)
- [좌표에 해당하는 실시간 날씨 데이터 구하기(fetch, awit/async)](#좌표에-해당하는-실시간-날씨-데이터-구하기)
- [도시 별 실시간 날씨 데이터 구하기(fetch, awit/async)](#도시-별-실시간-날씨-데이터-구하기)
- [받아온 외부 데이터 중 필요한 부분만 화면 출력](#받아온-외부-데이터-중-필요한-부분만-화면-출력)
- [도시별 버튼 컴포넌트](#도시별-버튼-컴포넌트)

<br>

## 📌코드 리뷰📌


## 현재 위치 좌표 구하기
```javascript
const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude; //위도
      let lon = position.coords.longitude; //경도
			getWeatherByCurrentLocation(lat, lon);
    });
  };
```
navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options) 라는 메서드를 사용하면 웹 애플리케이션에서 사용자의 현재 위치 정보를 가져올 수 있다.(사용자가 권한을 허락한 경우)

위에서 구한 위도와 경도값을 해당 좌표의 날씨를 구해주는 함수에 매개변수로 보내준다.

<br>

## 좌표에 해당하는 실시간 날씨 데이터 구하기

```javascript
const getWeatherByCurrentLocation = async (lat, lon) => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid={API key}&units=metric`;
     try{
      let response = await fetch(url); 
      let data = await response.json();
      setWeather(data); 
    } catch(err){
      console.log(err);
    }
    setLoading(false); 
  };
```

<br>

## 도시 별 실시간 날씨 데이터 구하기
```javascript
  const getWeatherByCity = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={API key}&units=metric`;
    try{
      let response = await fetch(url); 
      let data = await response.json();
      setWeather(data); 
    } catch(err){
      console.log(err);
    }
    setLoading(false); 
  };
```

그리고 페이지가 로드되었을 때 city의 값에 따라 다른 함수가 작동 되도록 useEffect 를 사용해 함수를 호출 시켰다.
```javascript
 useEffect(() => {
    if (city === "current") {
      //처음 city의 초기값이 current이므로 처음엔 이렇게 실행
      getCurrentLocation();
    } else {
      //city가 바뀌면 useEffect 다시 실행됨
      getWeatherByCity();
    }
    //eslint-disable-next-line
  }, [city]);
  ```
<br>

## 받아온 외부 데이터 중 필요한 부분만 화면 출력

받아온 data를 weather에 업데이트 시켰는데 현재 이 weather에는 불필요한 정보까지 전부 들어가있으므로 내가 필요한 정보만 뽑아서 화면에 출력시켜야한다. 나는 도시 이름, 온도, 습도, 설명, 아이콘 이렇게 추출해 사용했다.
```javascript
export const WeatherBox = ({weather}) => {
  const iconNow=weather?.weather[0].icon
  return (
    <div className='weather-box'> 
        <h5>{weather?.name}</h5>
        <h1 className='fw-semibold'>{weather?.main.temp}℃ / {weather?.main.humidity}%</h1>
        <div className='h3 fw-semibold'>{weather?.weather[0].description}</div>
        <div className='weather-icon'>
          <img src={`https://openweathermap.org/img/wn/${iconNow}.png` }alt="weather"/>
        </div>
    </div>
  )
}
```
<br>

## 도시별 버튼 컴포넌트

내가 미리 지정한 도시명을 배열로 관리하고 배열 안의 아이템들을 버튼 컴포넌트로 만들어 해당 버튼 클릭 시 그 도시의 날씨 정보를 보여주는 기능을 구현해야한다. city 배열은 App.js에서 만들고 props로 버튼 컴포넌트에 전달시킴
```javascript
export const WeatherButton = ({cities,setCity}) => {
  return (
    <div className='Weather-Button'>
      <Button variant="primary">Current Location</Button>
      {cities.map((city,index)=>( <Button variant="outline-primary" key={index} onClick={()=>setCity(city)}>{city}</Button>))}
    </div>
  )
}
```
이렇게 버튼 클릭시 city상태가 업데이트 되고 이것에 따라 위의 useEffect에서 설정했던 함수가 호출되어 날씨 데이터를 끌어오게 된다.

<br>

## 😊프로젝트를 마치며
외부 데이터를 활용해 간단한 토이 프로젝트를 만들어 보았는데 기능 구현은 완료하고 보니 간단한 것 같아도 처음 사용하는 api를 활용하는데 어려움이 있었다. 공식 사이트에서 제공하는 문법을 그대로 사용하면 되긴 하지만 처음 사용할 때는 이 부분을 찾는 것에 시간이 조금 걸렸고, 데이터를 받아온 이후에는 기본적인 useState, useEffect 훅을 사용해 오히려 이 부분이 더 쉽게 코드가 작성되었다. 몇가지 외부 api를 사용해보니 프론트엔드 개발자는 공식 문서를 잘 이해하고 올바르게 그리고 빠르게 제공되어 있는 오픈 코드를 활용하는 것도 중요한 능력이라고 느껴진다. 
