<template>
<div class='login'>
<div class="con">
    <h2>登录</h2>
    <div class="input"><input type="text" placeholder="请输入用户名" v-model="user.username"></div>
    <div class="input"><input type="text" placeholder="请输入密码" v-model="user.password"></div>
    <button class="btn" @click="login">登录</button>
</div>
</div>
</template>

<script>
import {requserlogin} from "../../util/request"
import {mapActions,mapGetters} from 'vuex'
export default {
components: {

},
data() {
return {
user:{
    user:{
        username:"",
        password:"",
    }
}
};
},
methods: {
    ...mapActions({
requestuserlist:'user/requestuserlist'
    }),
login(){
requserlogin(this.user).then(res=>{
    if(res.data.code==200){
        this.requestuserlist(res.data.list)
    this.$router.push('/index/home')
    }else{
        alert(res.data.msg)
    }
})
},
},
mounted() {

},
computed: {

},
watch: {},
}
</script>
<style>
.login {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right,#563443,#303D60);
}
.con {
    width: 400px;
    height: 300px;
    background: #fff;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius: 10px;
}
.con h2 {
    text-align: center;
    line-height: 70px;
}
.con .input{
width: 60%;
height: 30px;
    margin: 30px auto;
    
}
.con .input input {
    width: 100%;
height: 30px;
border: none;
border: 1px solid;
font-size: 20px;
}
.con button {
    display: block;

    width: 60%;
    height: 30px;
border: none;
  background: #409EFF;
    color: #fff;
    margin: 0 auto;
}

</style>