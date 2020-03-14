<template>
<div>
  <div v-if="this.viewFlag">
  <p>
    <h2>송파학사 코로나19 예방적격리 대상자 상황보고판</h2>
  </p>
  <p>해당 학생을 클릭할시 위치를 조회하실 수 있습니다.</p>
  <p>Latitude : 위도 | Longitude : 경도 | Timpestamp : 인증시각</p>
  <div>
    <b-table striped hover :items="users" @row-clicked="findLocateUser">

    </b-table>
  </div>
  </div>

  <div v-if="!this.viewFlag">

    <p class="adminPage">
      <h1>송파학사 코로나19 관리자시스템</h1>
      <h2>관리자 로그인</h2>
    </p>
    <p class="loginForm">
    <b-form-input v-model="email" placeholder="ID"></b-form-input>
    <b-form-input v-model="pw" placeholder="PASSWORD" type="password"></b-form-input>
    <br>
    <b-button block variant="primary" @click="singUp()">로그인</b-button>
    </p>

  </div>


  {{this.user}}

</div>
</template>
<script>

import firebase from 'firebase'
import {db} from '../db';
import axios from 'axios';
export default {
  data() {
    return {
      users: [],
      email: '',
      pw: '',
      viewFlag: false
    }
  },
  created() {
    let self = this;
    db.ref('users').once('value').then((data) => {
      data.forEach(function(child) {
          self.users.push(
            child.val()
          );
      })
    })
  },
  methods: {
    findLocateUser(row) {
      let path = "https://map.kakao.com/link/map/"+ row.name + "," +row.latitude+ "," +row.longitude;
      window.open(path,'_blank', 'top=10, right=10,location=no, width=1400, height=1200, directories=no, status=no, menubar=no, toolbar=no, resizable=yes')
    },
    singUp() {
          let self = this;
        firebase.auth().signInWithEmailAndPassword(this.email, this.pw).then(function(user) {
          console.log(user);
          alert("로그인성공!");
          self.viewFlag= true;
        }, function(err) {
          alert("비밀번호와 아이디를 다시 확인해주세요");
          self.viewFlag = false;
        })
    }
  }
}
</script>

<style>
.loginForm {
  width: 600px;
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 500px;
}
.adminPage {
  padding: 200px;
}
</style>
