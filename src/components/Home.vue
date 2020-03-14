<template>
<div>
<vue-position-sticky :offsetTop="0">
  <b-alert show variant="warning" class="warning">  <b-spinner style="width: 1rem; height: 1rem;" variant="danger" label="Large Spinner" type="grow"></b-spinner>
  격리대상지역 : 대구 청도 영천 경산</b-alert>
</vue-position-sticky>
<div>
  <img src="../assets/songpa2.jpg" class="main_image">
</div>
<br>
<div class="body">
  <h3>밀리토피아 송파학사</h3>
<p class="subtitle">격리대상거주 입사생 타지역 거주 증빙안내</p>
<p class="info">
  학사생들의 위치를 정확하게 파악하기 위해, GPS기반 위치정보를 사용하여 정해진 시각에 인증받겠습니다.
  기숙사와 같은 다중 숙식 시설에 대한 코로나19의 대규모 집단감염의 우려가 매우 크고 예민한 문제이므로 협조부탁드립니다.
</p>
<br>
<h4>웹기반 GPS인증방법</h4>
<ol class="">
  <li>아래의 입력칸(사생이름, 전화번호)를 입력합니다.</li>
  <li>입력 후 <strong>현재위치파악하기</strong>버튼을 클릭합니다.</li>
  <li>현재위치파악에 다소 시간이 걸릴 수 있습니다.</li>
  <li>위치정보공유문구가 뜬다면 동의해주세요.</li>
  <li>위치파악이후, <strong>위치정보학사제출</strong>버튼을 클릭합니다.</li>
</ol>
  <div class="form">
    <b-form-input v-model="user.name" placeholder="사생이름"></b-form-input>
    <b-form-input v-model="user.phoneNumber" placeholder="전화번호 (ex01012342321) '-'제외"></b-form-input>
    <b-alert show variant="secondary" v-if="this.lati == 0">{{this.locationWarning}}</b-alert>
    <b-alert show variant="info" v-if="this.lati != 0">{{this.locationWarning}}</b-alert>
    <b-button variant="outline-primary" v-on:click="getCurrentPos" v-if="this.btnInfo">
      {{this.btnInfo}}
    </b-button>
      <b-spinner variant="primary" label="Spinning" v-if="!this.btnInfo"></b-spinner>

    <b-button variant="success" v-on:click="sendInfo" v-if="this.lati != 0">위치정보학사체출</b-button>
  </div>
</div>

</div>
<!-- footer -->
<!-- firebase -->
</template>

<script>
import firebase from 'firebase'
import {db} from '../db';

export default {
  name: 'Home',
  data() {
    return {
        user: {
          name: '',
          phoneNumber: ''
        },
        lati: 0,
        long: 0,
        timestamp: 0,
        locationWarning: '현재 위치파악이 이루어지지 않았습니다.',
        users: {},
        btnInfo: "현재위치파악하기"
    }
  },
  methods: {
      getCurrentPos() {
        if(this.user.name === '' || this.user.phoneNumber === '') {
        this.locationWarning = '이름과 전화번호를 입력해주세요!'
        } else {

        if(navigator.geolocation) {
        this.btnInfo = '';
        navigator.geolocation.getCurrentPosition((pos, err) => {
          if(err) {
            console.log(err);
            this.btnInfo = '현재위치파악하기';
          }
          else {
              this.lati = pos.coords.latitude.toFixed(5);
              this.long = pos.coords.longitude.toFixed(5);
              // this.timestamp = pos.timestamp;
              this.timestamp = new Date().toLocaleString();
              this.locationWarning = "위치파악완료!";
              this.btnInfo = '현재위치파악하기';

          }
        })
        } else {
          alert("GPS를 지원하지않습니다. 크롬 또는 최신브라우저를 사용해주세요");
        }

        }

      },
      sendInfo() {
        if(this.user.name === '' || this.user.phoneNumber === '') {
        this.locationWarning = '이름과 전화번호를 입력해주세요!'
        } else {
        db.ref('users').push({
          name: this.user.name,
          phoneNumber: this.user.phoneNumber,
          latitude: this.lati,
          longitude: this.long,
          timestamp: this.timestamp
        });
        alert("제출완료!");
        this.user.name = '';
        this.user.phoneNumber = '';
        this.lati = 0;
        this.long = 0;
        }

      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image {
  zoom: 1;
  display: block;
}
.subtitle {
  color: red;
}
.warning {
  margin: 0;
}
.main_image {
  width: 100%;
}
.info {
  padding: 10px;
}
.form {
  height: 200px;
}

</style>
