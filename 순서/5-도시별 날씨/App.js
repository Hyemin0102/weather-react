import { useEffect, useState } from "react";
import { WeatherBox } from "./components/WeatherBox";
import { WeatherButton } from "./components/WeatherButton";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  //날씨데이터 보관
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("current");
  const cities = ["Auckland", "Paris", "New York", "Tokyo"];

  //현재 위치 좌표값 구하는 함수
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude; //위도
      let lon = position.coords.longitude; //경도
      //console.log(lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  //좌표 이용해 날씨API 가져오기
  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b0eaab704afa34920707b67e1e7984fe&units=metric`;
    let response = await fetch(url); //fetch는 promise 객체 반환하는 비동기함수로 async와 await를 사용하여 비동기적인 처리를 동기적으로 다룰 수 있음. fetch(url)의 promise가 처리되고 실제 응답을 받을때까지 기다리라는 의미.
    let data = await response.json(); //자바스크립트 객체로 변환,response.json()의 promise가 처리되고 실제 JSON데이터를 반환할때까지 기다리라는 의미.
    setWeather(data); //날씨 상태 data로 할당
    //console.log("response", response);
    //console.log("data", data);
  };

  //도시 이용해 날씨API 가져오기
  //https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={키코드}
  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b0eaab704afa34920707b67e1e7984fe&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  };

  //useEffect(callback, dependencies) - 컴포넌트가 렌더링될때, 업데이트될때 특정 동작 수행함
  //dependencies은 배열 형태로 이 배열에 포함된 값이 변경될 때 callback함수 호출됨
  useEffect(() => {
    if (city === "current") {
      //처음 city의 초기값이 current이므로 처음엔 이렇게 실행
      getCurrentLocation();
    } else {
      //city가 바뀌면 useEffect 다시 실행됨
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div className="container">
      <WeatherBox weather={weather} />
      <WeatherButton cities={cities} setCity={setCity} />
    </div>
  );
}

export default App;
