<template>
<div class='login'>
<div class="con">
    <h2>登录</h2>
    <div class="input"><input type="text" placeholder="请输入用户名"></div>
    <div class="input"><input type="text" placeholder="请输入密码"></div>
    <button class="btn">登录</button>
</div>
</div>
</template>

<script>

export default {
components: {

},
data() {
return {

};
},
methods: {

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