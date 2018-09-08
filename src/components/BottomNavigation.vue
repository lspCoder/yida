/*
 * @Author: lsp 
 * @Date: 2017-05-19 13:22:15 
 * @Last Modified by:   lsp 
 * @Last Modified time: 2017-05-22 13:22:15 
 */
<template>
    <mu-paper>
        <mu-bottom-nav :value="bottomNav" @change="handleChange">
            <mu-bottom-nav-item icon="flight" title="机票" to="/home" value="机票">
            </mu-bottom-nav-item>
            <mu-bottom-nav-item icon="notifications" title="关注" to="/favoriteFlight" value="关注">
            </mu-bottom-nav-item>
            <mu-bottom-nav-item icon="flight_land" title="订单" to="/order" value="订单">
            </mu-bottom-nav-item>
            <mu-bottom-nav-item icon="account_circle" title="我的" to="/person" value="我的">
            </mu-bottom-nav-item>
        </mu-bottom-nav>
    </mu-paper>
</template>
<script>
    export default {
        data () {
            return {}
        },
        computed: {
            bottomNav(){
                return this.$store.state.tabValue;
            }
        },
        // beforeRouteEnter (to, from, next) {
        //     next((vm)=>{
        //         var path = to.path;
        //         var titleArr = vm.$store.state.titleMap;
        //         titleArr.forEach(function(title, index) {
        //             if (title[index][0] == path) {
        //                 vm.$store.state.tabValue = title[index][1];
        //             }
        //         })
        //     })
        // },
        methods: {
            handleChange (val) {
                this.$store.dispatch('changeTabValue', val);
            } 
        }
    }
</script>
