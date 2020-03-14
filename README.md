# SongpaCorona19	

> 현재 송파학사에서 기숙사생활을 하고있다. 대학졸업까지 거주하게 될 것 같다.
>
> 코로나19 사태가 발생하고, 각 지방에서 상경하는 학생들이 모이는 기숙사에서 굉장히 예민한 문제가 아닐 수 없다.
>
> 3월 14일(토)기준으로 확진환자 8000명이 넘어갔고, 대구 및 경북 지방에 확진자가 전체의 85%를 차지하고 있다.
>
> 기숙사입장에서도, 입사전 대구 경북 지방의 학생들의 2주전 타지역에서의 격리를 권고하고 있고, 이를 증명하고자 
>
> 하는방법을 모색하고 있다. 학사측에서 나에게 전화가 와서 이 증명문제를 해결할 수 있는 방법을 모색하여 개발해 
>
> 줄 것을 부탁받게 되었고,  Javascript의 Geolocation API를 이용하기로 하였다.



## 1. 프로젝트 구상목표와 방향

- 개발기간 : 하루
  - 하루안에 완성해야하기 때문에, 안드로이드와 ios같은 네이티브는 배제하고, 모바일웹으로 정하게 되었다.
- 어떻게 본인이 경북, 대구지역에 있지않다는 사실을 증명할까?
  - Geolocation API를 이용하면 현재 위치의 경도와 위도를 찾을 수 있다.
  - 이 경도와 위도를 기반으로 지도에 표시를 하는 것으로, 위치를 확인해보자.
  - 사실 위 문제에 대해서는 사람몸에 gps를 심지않는 이상, 법적인 문제와 개인의 양심에따라 증명이 힘들 것 같았다.
- 관리자페이지
  - 이 프로젝트는 컴퓨터 관계자가 아닌 관리자가 해당 학생의 위치를 쉽게 확인 할 수 있도록 제작되어야한다.
  - 고객(대상 학생)에게 보여지는 웹에서는 자신의 위치를 데이터베이스에 저장할 수 있도록 한다.
  - 관리자에게 보여지는 웹에서는 데이터베이스에 저장된 데이터를 확인 할 수 있도록 한다.

### 기술 스택

> 만들어야하는 내용을 보았을 때, 백엔드와 프론트엔드까지 해야 할 범위가 상당히 컸다.
>
> 또한, Geolocation API를 사용하려면 HTTPS 프로토콜을 사용해야하는데 이 부분에 고민이 많았다.
>
> 서비스 이용자를 확인해보니 대략 20명정도이고, 가볍게 만들어도 괜찮을 것 같았다.

![1_lNX4JPcG9ZBzWcG9qLVPBQ](https://user-images.githubusercontent.com/55838461/76683362-e42b2c80-6646-11ea-9c3c-af10a6407b5a.png){: .center}

### Vue.js + Firebase

> Firebase를 이용하면 손쉽게 Auth, Database, Storage등을 사용할 수 있다. 
>
> 호스팅도 HTTPS으로 할 수 있으니, API를 자연스럽게 이용할 수 있게 되었다.
>
> 즉, 백엔드부분에서 내가 할 일이 줄었다는 것 + 확장성 => 빠르게 프로젝트를 빌드가 가능하다.

- Firebase 공식문서를 보면 한글도 지원하니, 보고 따라해도 무난하게 사용이 가능하다.

- Axios, BootstrapVue




## 2. Geolocation API(GPS)

> HTML5에 도입된 API, 웹에서도 GPS기술을 사용할 수 있게 되었다.

~~~javascript
navigator.geolocation.getCurrentPosition((pos) => {
	// pos에서 경도 위도 확인가능
})
~~~

> 추가적으로, 에너지를 더 사용하여 위치정확도를 높이는 그러한 옵션도 존재하기도한다. 현재 내가 파악하는 것은 경북지역
>
> 이냐 아니냐 이것이 문제이기 때문에, 대략적인 위치만 필요하다. 다른 옵션은 생략한다.



## 3. [KAKAO Map](http://apis.map.kakao.com/web/guide/)

> 위 API로 위도와 경도를 얻었다면 이를 지도에 위치를 표시하는 방법
>
> KaKao Maps API 문서를 참고하였다.

- Google, Naver, KaKao, Daum 등 여러 Map API를 사용할 수 있는 플랫폼들이 상당히 많다.

  이 중에 나는 카카오를 정하였는데, 그 이유는 간단히 URL에 위도경도를 붙여 넣기만 해도 그 위치를 파악할 수 있는

  맵을 바로 열어주기 때문에, 따로 API를 사용하기 위해 권한을 부여받는 일을 생략해도 되었기 때문이다.

- URL Pattern

  - /link/map/위도,경도

~~~javascript
findLocateUser(row) {
      let path = "https://map.kakao.com/link/map/"+ row.name + "," +row.latitude+ "," +row.longitude;
      window.open(path,'_blank', 'top=10, right=10,location=no, width=1400, height=1200, directories=no, status=no, menubar=no, toolbar=no, resizable=yes')
    }
~~~

![스크린샷 2020-03-14 오후 11 42 05](https://user-images.githubusercontent.com/55838461/76684232-71717f80-664d-11ea-9d27-7ae1d69437b9.png){: .center}



## 4. Firebase의 RealDatabase

- Firebase에서 NOSQL의 실제 디비처럼 작동하는 RealDatabase를 이용하여 각 위치를 저장할 수 있도록한다.

### 보안설정 database.rules.json

~~~json
{
  "rules": {
    ".read": "auth != null",
    ".write": true
  }
}
~~~

> 쓰기 권한은 제3자에게 준다.  하지만,  이 데이터를 읽을 수 있는 사람은 관리자에게만 부여하도록했다.



## 5. Auth

> 관리자 페이지를 제작할 것 이고, 이 페이지에 들어가기 위한 로그인기능을 추가하여야 한다.
>
> 현재 firebase Auth에서 간단하게 이메일 형식의 로그인정보를 생성해두고, 권한 부여를 할 수 있다.

<img src="https://user-images.githubusercontent.com/55838461/76684491-c57d6380-664f-11ea-95d5-5fe2c8d609ab.png" alt="스크린샷 2020-03-14 오후 11 57 45" style="zoom:80%;" />

- 이메일/비밀번호 형식의 로그인 설정을 해두고 아래처럼 로그인 기능을 구현할 수 있다.

~~~javascript
 firebase.auth().signInWithEmailAndPassword(this.email, this.pw).then(function(user) {
          alert("로그인성공!");
        }, function(err) {
          alert("비밀번호와 아이디를 다시 확인해주세요");
        })
~~~



## 6. 배포

> Firebase hosting을 이용하여 간단한 CLI조작만으로 배포가 가능했다. 

- 호스팅주소는 비공개한다.





## 7. 구현영상

### 모바일 웹 (학생용)

![2020-03-15 00 08 50](https://user-images.githubusercontent.com/55838461/76684693-6a4c7080-6651-11ea-99c0-46c3ad43f6fc.gif){: .center}

![2020-03-15 00 09 17](https://user-images.githubusercontent.com/55838461/76684694-6b7d9d80-6651-11ea-8c05-e02444d0663d.gif){: .center}

### 관리자 페이지 (로그인과정생략)

![2020-03-15 00 10 12](https://user-images.githubusercontent.com/55838461/76684696-6d476100-6651-11ea-8f66-35fe038392db.gif){: .center}

> 학생들의 이름을 클릭하면 위치조회가 가능하다.





















