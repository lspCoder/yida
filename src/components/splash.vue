/*
 * @Author: lsp 
 * @describe: app启动页
 * @Date: 2018-04-11 21:40 
 * @Last Modified by: lsp
 * @Last Modified time: 2018-03-16 22:49
 */
<template>
    <div class="splash">

    </div>
</template>

<script>
export default {
    name: 'splash',
    components: {
        
    },
    data(){
        return {
        }
    },
    mounted() {
        var self = this;
        setTimeout(() => {
            self.$router.push('/home');
        }, 3000);
    }
}
</script>

<style>
    .splash {
        position: absolute;
        width: 100%;
        height:100%;
        margin: 0;
        padding: 0;
        background: url('../assets/splash.jpg') no-repeat fixed;
        background-size: cover;
        -moz-background-size: cover;
        -webkit-background-size: cover;
        /* IE6-9 */
        filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='../assets/splash.jpg', sizingMethod=scale);
        -ms-filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='../assets/splash.jpg', sizingMethod=scale);
        /*
        AlphaImageLoader：在元素的背景和内容之间插入一张图片，并提供对此图片的剪切和改变尺寸的操作。如果载入的是PNG(Portable Network Graphics)格式，则0%-100%的透明度也被提供。
        语法格式：filter : progid:DXImageTransform.Microsoft.AlphaImageLoader ( enabled=bEnabled , sizingMethod=sSize , src=sURL )
        enabled：可选项，布尔值(Boolean)。设置或检索滤镜是否激活。 true：默认值。滤镜激活。 false：滤镜被禁止。
        sizingMethod：可选项。字符串(String)。设置或检索滤镜作用的对象的图片在对象容器边界内的显示方式。
        1）crop：剪切图片以适应对象尺寸。
        2）image：默认值。增大或减小对象的尺寸边界以适应图片的尺寸。
        3）scale：缩放图片以适应对象的尺寸边界。
        src：必选项。字符串(String)。使用绝对或相对 url 地址指定背景图像。假如忽略此参数，滤镜将不会作用。
        */
    }
</style>
