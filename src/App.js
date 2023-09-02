import { useEffect, useState } from "react";
import { WeatherBox } from "./components/WeatherBox";
import { WeatherButton } from "./components/WeatherButton";
import FadeLoader from "react-spinners/FadeLoader";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  //날씨데이터 보관
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("current");
  const [loading, setLoading] = useState("true");
  const cities = ["Auckland", "Paris", "New York", "Tokyo"];

  //현재 위치 좌표값 구하는 함수
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude; //위도
      let lon = position.coords.longitude; //경도

      getWeatherByCurrentLocation(lat, lon);
    });
  };

  //좌표 이용해 날씨API 가져오기
  const getWeatherByCurrentLocation = async (lat, lon) => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b0eaab704afa34920707b67e1e7984fe&units=metric`;
    try{
      let response = await fetch(url); 
      let data = await response.json();
      setWeather(data); 
    } catch(err){
      console.log(err);
    }
    setLoading(false); 
  };

  //도시 이용해 날씨API 가져오기
  //https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={키코드}
  const getWeatherByCity = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b0eaab704afa34920707b67e1e7984fe&units=metric`;
    try{
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
    } catch(err){
      console.log(err);
    }
    setLoading(false);
  };

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

  const LoadingSpinner = () =>{
    return <FadeLoader color="#36d7b7" height={10} margin={2} width={5} />
  }

  return (
    <>
      {loading ? ( //loading이 true면 FadeLoader만 보이고, loading 끝나면 내용 보임
        <div className="container">
          <LoadingSpinner/>
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} setCity={setCity} />
        </div>
      )}
    </>
  );
}

export default App;
