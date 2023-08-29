<img src="https://github.com/Hyemin0102/weather-react/assets/128768462/c566f6d2-18dd-447e-808a-0d66cc57e1ce"/>

# Weather-React
OpenWeatherMap api 데이터를 연동한 날씨 앱

## 🔎프로젝트 소개
https://main--silver-sundae-f117dc.netlify.app/

리액트로 OpenWeatherMap api 데이터를 연동해 현재 위치를 파악하여 날씨를 알려주는 간단한 웹페이지입니다.

## ⚙개발 환경
React, react-bootstrap, react-spinners, OpenWeatherMap api

## 🚩주요 기능
- 앱 실행 시 현재 위치 기반 날씨 화면에 나타남(도시, 온도, 습도, 날씨 상태)
- 다른 도시 버튼 클릭하면 해당 도시 날씨 나타남
- 데이터 가져오는 동안 로딩 스피너 기능 구현

## 📌코드 리뷰
- 현재 위치 좌표 구하고 좌표값에 따른 날씨 api 데이터 가져오기(fetch)
```javascript
const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude; //위도
      let lon = position.coords.longitude; //경도
			getWeatherByCurrentLocation(lat, lon);
    });
  };
const getWeatherByCurrentLocation = async (lat, lon) => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid={API key}&units=metric`;
     try{
      let response = await fetch(url); 
      let data = await response.json();
      setWeather(data); 
      setLoading(false); 
    } catch(err){
      console.log(err);
    }
  };
```
- 도시 별 날씨 api 데이터 가져오기(fetch)
```javascript
  const getWeatherByCity = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={API key}&units=metric`;
    try{
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch(err){
      console.log(err);
    }
  };
```


## 😊프로젝트를 마치며
외부 데이터를 활용해 간단한 토이 프로젝트를 만들어 보았는데 기능 구현은 완료하고 보니 간단한 것 같아도 처음 사용하는 api를 활용하는데 어려움이 있었다. 공식 사이트에서 제공하는 문법을 그대로 사용하면 되긴 하지만 처음 사용할 때는 이 부분을 찾는 것에 시간이 조금 걸렸고, 데이터를 받아온 이후에는 기본적인 useState, useEffect 훅을 사용해 오히려 이 부분이 더 쉽게 코드가 작성되었다. 몇가지 외부 api를 사용해보니 프론트엔드 개발자는 공식 문서를 잘 이해하고 올바르게 그리고 빠르게 제공되어 있는 오픈 코드를 활용하는 것도 중요한 능력이라고 느껴진다. 
