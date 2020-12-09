<template>
<div class=''>
<div class="tubiao" id="main">
   
</div>
</div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import echarts from 'echarts';
export default {
components: {

},
data() {
return {

};
},
methods: {
...mapActions({
    requestcatelist:"cate/requestcatelist"
})
},
mounted() {
this.requestcatelist();
 
},
computed: {
...mapGetters({
    list:"cate/list"
}),

},
watch: {
    list:{
        handler(){
// 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '商品分类'
            },
            tooltip: {},
            legend: {
                data:['商品名称']
            },
            xAxis: {
                data: this.list.map(item=>{return   item.catename}              
                )
            },
            yAxis: {},
            series: [{
                name: '商品名称',
                type: 'line',
                data:this.list.map(item=>{return  item.children?item.children.length:0}                   )
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        }
    },
    deep:true
},
}
</script>
<style>
.tubiao {
    width: 90%;
    height: 500px;
    border: 2px dashed #ccc;
}
</style>