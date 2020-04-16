<template>
  <div class="hello">
    <el-row>
      <el-col :span="24">
        <h1>害你在心口难开</h1>
        <el-row class="username">
          <el-col :span="24">
            <el-input v-model="username" placeholder="请输入用户名"></el-input>
          </el-col>
        </el-row>
        <el-row  class="pwd">
          <el-col :span="24">
            <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
          </el-col>
        </el-row>
        <el-row v-show="msg">
          <el-col :span="24">
            <span style="color: red;">用户名或密码不正确</span>
          </el-col>
        </el-row>
        <el-button type="info" class="go" plain @click="go()">进入游戏</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: false,
      username: '',
      pwd: ''
    }
  },
  methods: {
    go:function () {
      console.log('a')
      this.$axios({
          method:'post',									
          url:this.$apiurl+'login',
          params: {
            username: this.username,
            pwd: this.pwd
          }
      }).then((response) =>{          //返回promise(ES6语法)
          console.log(response.data)       //请求成功返回的数
          if(response.data.length > 0) {
            localStorage.setItem('user',JSON.stringify(response.data[0]))
            this.$router.push({path:'/main'})
          } else {
            this.msg = true
          }
      }).catch((error) =>{
          console.log(error)       //请求失败返回的数据
      })
      //this.$router.push({path:'/main'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  background-color:beige;
  height: 100%;
}
h1 {  
  font-family: "Raleway", sans-serif;
  font-size: 28px;
  color: red;
  text-shadow: 4px 4px 0 white, 4px -4px 0 white, -4px -4px 0 white, -4px 4px 0 white, 4px 3px 0 white, 4px -3px 0 white, -4px -3px 0 white, -4px 3px 0 white, 4px 2px 0 white, 4px -2px 0 white, -4px -2px 0 white, -4px 2px 0 white, 4px 1px 0 white, 4px -1px 0 white, -4px -1px 0 white, -4px 1px 0 white, 4px 0px 0 white, 4px 0px 0 white, -4px 0px 0 white, -4px 0px 0 white, 3px 4px 0 white, 3px -4px 0 white, -3px -4px 0 white, -3px 4px 0 white, 3px 3px 0 white, 3px -3px 0 white, -3px -3px 0 white, -3px 3px 0 white, 3px 2px 0 white, 3px -2px 0 white, -3px -2px 0 white, -3px 2px 0 white, 3px 1px 0 white, 3px -1px 0 white, -3px -1px 0 white, -3px 1px 0 white, 3px 0px 0 white, 3px 0px 0 white, -3px 0px 0 white, -3px 0px 0 white, 2px 4px 0 white, 2px -4px 0 white, -2px -4px 0 white, -2px 4px 0 white, 2px 3px 0 white, 2px -3px 0 white, -2px -3px 0 white, -2px 3px 0 white, 2px 2px 0 white, 2px -2px 0 white, -2px -2px 0 white, -2px 2px 0 white, 2px 1px 0 white, 2px -1px 0 white, -2px -1px 0 white, -2px 1px 0 white, 2px 0px 0 white, 2px 0px 0 white, -2px 0px 0 white, -2px 0px 0 white, 1px 4px 0 white, 1px -4px 0 white, -1px -4px 0 white, -1px 4px 0 white, 1px 3px 0 white, 1px -3px 0 white, -1px -3px 0 white, -1px 3px 0 white, 1px 2px 0 white, 1px -2px 0 white, -1px -2px 0 white, -1px 2px 0 white, 1px 1px 0 white, 1px -1px 0 white, -1px -1px 0 white, -1px 1px 0 white, 1px 0px 0 white, 1px 0px 0 white, -1px 0px 0 white, -1px 0px 0 white, 0px 4px 0 white, 0px -4px 0 white, 0px -4px 0 white, 0px 4px 0 white, 0px 3px 0 white, 0px -3px 0 white, 0px -3px 0 white, 0px 3px 0 white, 0px 2px 0 white, 0px -2px 0 white, 0px -2px 0 white, 0px 2px 0 white, 0px 1px 0 white, 0px -1px 0 white, 0px -1px 0 white, 0px 1px 0 white, 0px 0px 0 white, 0px 0px 0 white, 0px 0px 0 white, 0px 0px 0 white, 0 0 0 white;
}
.go {
  margin-top: 10%;
}
.username {
  margin-top: 20%;
  width: 50%;
  margin-left: 25%;
  /* position: absolute;
  left: 50%;
  transform: translate(-50%); */
}
.pwd {
  margin-top: 5%;
  margin-left: 25%;
  width: 50%;
}
</style>
