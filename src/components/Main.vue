<template>
    <div class="Main">
        <Menu></Menu>
        <el-button type="info"  plain @click="create()">创建房间</el-button>
        <el-row v-show="msg">
          <el-col :span="24">
            <span style="color: red;">创建失败，失败原因未知</span>
          </el-col>
        </el-row>
    </div>
    
</template>
<script>
import Menu from './Menu.vue'
export default {
    name: 'Main',
    components: {
      Menu
    },
    data () {
        return {
            msg: false,
            tabBarImgArr:[   //图片切换
                
            ]
        }
    },
    methods:{
        create: function () {
            var user = JSON.parse(localStorage.getItem('user'))
            this.$axios({
                method:'post',									
                url:'http://127.0.0.1:8888/createroom',
                params: {
                    username: user.username,
                    id: user.id
                }
            }).then((response) =>{          //返回promise(ES6语法)
                console.log(response.data)       //请求成功返回的数
                if(response.data.length > 0) {
                    localStorage.setItem('gameroom',JSON.stringify(response.data[0]))
                    this.$router.push({path:'/ingame/'+response.data[0].roomid})
                } else {
                    this.msg = true
                }
            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
            })
        }
    }
}
</script>
<style scoped>
    
</style>