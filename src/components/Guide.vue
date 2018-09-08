<template>
    <div>
        <mu-chip class="myChip" v-show="showChip" @click="toHome">
            跳过
        </mu-chip>
        <!-- vue-touch提供的滑动事件指令，可以参考vue-touch文档 -->
        <v-touch @swipeleft="onSwipeLeft" @swiperight="onSwipeRight">
            <transition :name="transitionName">
                <router-view ></router-view>
            </transition>
        </v-touch>
        <!-- 页面底部的圆点导航 -->
        <ul class="circle-nav" v-show="showNav">
            <li :class="{'nav-current':$route.name==='guide1'||$route.name==='default'}"></li>
            <li :class="{'nav-current':$route.name==='guide2'}"></li>
            <li :class="{'nav-current':$route.name==='guide3'}"></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'guide',
    components: {

    },
    data () {
        return {
            transitionName: '',
            showChip: true,
            showNav: true
        };
    },
    methods: {
        onSwipeLeft() {
        	// router转场后会自动触发vueg的转场特效
            switch (this.$route.name) {
                case 'default':
                case 'guide1':
                    this.$router.push('guide2');
                    break
                case 'guide2':
                    this.$router.push('guide3');
                    break
            }
        },
        onSwipeRight() {
            this.$router.back();
        },
        toHome () {
            this.$router.push('home');
        }
    },
    watch: {//使用watch 监听$router的变化
        $route (to, from) {
            //如果to索引大于from索引,判断为前进状态,反之则为后退状态
            if (to.meta.index > from.meta.index) {
                //设置动画名称
                this.transitionName = 'slide-left';
            } else {
                this.transitionName = 'slide-right';
            }
            if (to.name == 'guide3') {
                this.showChip = false;
                this.showNav = false;
            } else {
                this.showChip = true;
                this.showNav = true;
            }
        }
    }
}
</script>

<style scoped>
.myChip {
    position: fixed;
    background-color: #dcdfe1;
    color: rgba(0, 180, 225, .6);
    opacity: .8;
    right: 19px;
    top: 14px;
    z-index: 2;
}

.circle-nav {
    position: fixed;
    bottom: 77px;
    width: 100%;
    max-width: inherit;
    text-align: center;
    padding: 0;
    opacity: 0.75;
}

.circle-nav li {
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 1px solid #00b4ff;
    border-radius: 50%;
    margin: 5px;
}

.nav-current {
    background-color: #00b4ff;
}
</style>

