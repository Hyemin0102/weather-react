import "./App.css";

function App() {
  //현재 위치 좌표값 구하는 함수
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude; //위도
      let lon = position.coords.longitude; //경도
      //console.log(lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    //async와 await를 사용하여 비동기적인 처리를 동기적으로 다룰 수 있음.
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b0eaab704afa34920707b67e1e7984fe`;
    let response = await fetch(url); //fetch는 promise 객체 반환하는 비동기함수
    let data = await response.json(); //자바스크립트 객체로 변환
    console.log("response", response);
    console.log("data", data);
  };

  getCurrentLocation();

  return <>날씨 앱</>;
}

export default App;
