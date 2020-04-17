<template>
    <div class="InGame">
        <el-page-header class="header" @back="goBack" content="InGame">
        </el-page-header>
        <!-- <Menu></Menu> -->
        
        <el-row style="padding: 10px;">
            <el-col :span="24"><div class="grid-content bg-purple-dark"><b>房间号:{{roomid}}</b></div></el-col>
        </el-row>
        <div class="main">
            <el-card class="box-card">
                <div v-for="(item,index) in list"  class="text item">
                    <el-row>
                        <el-col :span="4" style="text-align: right;">
                            <div class="grid-content bg-purple">
                                <el-avatar icon="el-icon-user-solid"></el-avatar>
                            </div>
                        </el-col>
                        <el-col :span="10" style="text-align: left;font-size: 22px;padding: 6px;">
                            <div class="grid-content bg-purple-light">
                               {{index+1}} {{item.username}}
                               
                               <!-- {{cards['np'+((index+2)+(index*3))][0].name}} -->
                            </div>
                        </el-col>
                        <el-col :span="10" style="text-align: left;font-size: 22px;padding: 6px;" v-show="item.username != username || cardMsg[(index+1)] == '失败了'">
                            <div class="grid-content bg-purple-light">
                               
                               <span v-show="cards[(index+1)][0].king == 0">{{cards[(index+1)][0].name}}</span>
                               <span v-show="cards[(index+1)][1].king == 0 && cards[(index+1)][0].king == 1">{{cards[(index+1)][1].name}}</span>
                               <span v-show="cards[(index+1)][2].king == 0 && cards[(index+1)][1].king == 1">{{cards[(index+1)][2].name}}</span>
                               <span v-show="cardMsg[(index+1)] == '失败了'" style="color:red">失败了</span>
                               <!-- {{cards['np'+((index+2)+(index*3))][0].name}} -->
                            </div>
                        </el-col>
                    </el-row> 
                    <!-- <el-avatar icon="el-icon-user-solid"></el-avatar>{{item.username}} -->
                </div>
            </el-card>
            <!-- <el-row v-for="(item,index) in list">
                <el-col :span="4" style="text-align: right;">
                    <div class="grid-content bg-purple">
                        
                        <el-avatar icon="el-icon-user-solid"></el-avatar>
                    </div>
                </el-col>
                <el-col :span="12" style="text-align: left;font-size: 22px;padding: 6px;">
                    <div class="grid-content bg-purple-light">
                        {{item.username}}
                    </div>
                </el-col>
            </el-row> -->
        </div>
        <div class="liaotian" v-show="liaotian.length>0">
            <el-card class="box-card">
                <div v-for="obj in liaotian"  class="text item">
                    <el-row>
                        <el-col v-show="obj.username == username" :span="24" style="text-align: right;width: auto;float: right;">
                            <div class="grid-content bg-purple right">
                                {{obj.createtime | capitalize}}<br>
                               {{obj.centent}}&nbsp;&nbsp;:我
                            </div>
                        </el-col>
                        <el-col v-show="obj.username != username" :span="24" style="text-align: left;width: auto;">
                            <div class="grid-content bg-purple left">
                                {{obj.createtime}}<br>
                                {{obj.username}}:&nbsp;&nbsp;{{obj.centent}}
                            </div>
                        </el-col>
                    </el-row> 
                </div>
            </el-card>
        </div>
        <div class="bottom-tab">
             <el-input
                        placeholder="请输入内容"
                        v-model="centent"
                        clearable>
                </el-input>
                <el-button  type="success" @click="fasong()">发送</el-button>
            <!-- <el-row>
               
                <el-col :span="20"><div >
                   
                </div></el-col>
                <el-col :span="4"><div>
                    
                </div></el-col>
            </el-row> -->
        </div>
    </div>
</template>
<script>
import Menu from './Menu.vue'
export default {
    name: 'InGame',
    data () {
        return {
            roomid: this.$route.params.id,
            list: [],
            timer: null,
            centent: '',
            liaotian: [],
            username: '',
            userid: '',
            //cards: {},
            cards: {
                
            },
            cardMsg:{}
        }
    },
    components: {
      Menu
    },
    methods: {
        goBack() {
            console.log('go back');
            window.clearInterval(this.timer)
            this.timer = null
            this.$router.push({path:'/main'})
        },
        selectRoom() {
            this.$axios({
                method:'get',									
                url:this.$apiurl+'selectRoom/'+this.roomid,
            }).then((response) =>{          //返回promise(ES6语法)
                //console.log(response.data)       //请求成功返回的数
                if(response.data.length > 0) {
                    this.list = response.data
                    //setTimeout(this.selectRoom(),3000)    
                } 
            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
            })

            this.select()
        },
        fasong(){
            if(this.centent == '') {
                return 
            }
            for (let i = 0; i < this.list.length; i++) {
                if(this.list[i].username == this.username) {
                    var usercard = this.cards[""+(i+1)]
                    if(usercard[0].king == 0) {
                        if(this.centent.indexOf(usercard[0].name.split('：')[1])>-1){
                            usercard[0].king = 1
                        }
                    }
                    else if(usercard[1].king == 0 && usercard[0].king == 1) {
                        if(this.centent.indexOf(usercard[1].name.split('：')[1])>-1){
                            usercard[1].king = 1
                        }
                    }
                    else if(usercard[2].king == 0 && usercard[1].king == 1) {
                        if(this.centent.indexOf(usercard[2].name.split('：')[1])>-1){
                            usercard[2].king = 1
                            this.cardMsg[""+(i+1)] = "失败了"
                        }
                    }
                    else {
                       
                    }
                    this.cards[""+(i+1)] = usercard
                }
                
            }
            this.$axios({
                method:'post',									
                url:this.$apiurl+'insertLiaotian',
                 params: {
                    username: this.username,
                    id: this.userid,
                    centent: this.centent,
                    roomid: this.roomid
                }
            }).then((response) =>{          //返回promise(ES6语法)
                //console.log(response.data)       //请求成功返回的数
                if(response.data.length > 0) {
                    this.liaotian = response.data
                    this.centent = ''
                    //setTimeout(this.selectRoom(),3000)    
                } 
            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
            })
            
            // this.liaotian.push(this.centent)
            // this.liaotian.reverse();
            // console.log(this.centent)
            // this.centent = ''
        },
        select () {
            this.$axios({
                method:'get',									
                url:this.$apiurl+'selectLiaotian',
                 params: {
                    roomid: this.roomid
                }
            }).then((response) =>{          //返回promise(ES6语法)
                //console.log(response.data)       //请求成功返回的数
                if(response.data.length > 0) {
                    this.liaotian = response.data
                    //this.centent = ''
                    //setTimeout(this.selectRoom(),3000)    
                } 
            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
            })
        },
        selectCard () {
            this.$axios({
                method:'get',									
                url:this.$apiurl+'selectCard',
                params: {
                    roomid: this.roomid
                }
            }).then((response) =>{          //返回promise(ES6语法)
                //console.log(response.data)       //请求成功返回的数
                //this.cards = response.data
                this.cards =  response.data
            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
            })
        }
    },
    mounted: function () {
        var user = JSON.parse(localStorage.getItem('user'))
        this.userid = user.id
        this.username = user.username
        this.selectRoom()
        this.selectCard()
        this.timer = setInterval(this.selectRoom,5000)    
    },
    filters: {
        capitalize: function (value) {
            return value.split('.')[0]
        }
    }
}
</script>
<style scoped>
.header {
    background-color: aliceblue;
    padding: 8px;
    margin-top: -10px;
    margin-left: -10px;
    margin-right: -8px;
    border-bottom: 1px solid #d8d5d5;
}
.bottom-tab {
    width: 100%;
    height: 40px;
    background-color: #fff;
    position: fixed;
    left: 0px;
    bottom: 0px;
    display: flex;
    z-index: 999;
}
.liaotian {
    margin-top: 10px;
    max-height: 250px;
    height: 250px;
    overflow:scroll;
    padding: 10px;
}
.right {
    border: 1px solid #777;
    border-radius: 5px;
    background-color: rgb(95, 240, 126);
    padding-right: 5px;
    padding: 3px;
    margin-top: 10px;
    
}
.left {
    border: 1px solid #777;
    border-radius: 5px;
    background-color: rgb(248, 248, 248);
    padding-left: 5px;
    padding: 3px;
    margin-top: 10px;
    
}
/* .main {
    border: 1px solid #777;
    background-color: floralwhite;
} */
</style>