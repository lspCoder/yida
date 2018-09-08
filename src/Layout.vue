/* * @Author: lsp 
* @Date: 2017-05-19 13:22:02 
* @Last Modified by: lsp 
* @Last Modified time: 2017-05-22 13:22:02 
*/
<template>
	<div>
		<app-header v-show="showHeader"></app-header>
		<transition :name="transitionName">
			<router-view></router-view>
		</transition>
		<bottom-navigation class="bottom_nav"></bottom-navigation>
	</div>
</template>

<script>
	import appHeader from './components/Header'
	import bottomNavigation from './components/BottomNavigation'

	export default {
		name: 'Layout',
		components: {
			appHeader,
			bottomNavigation
		},
		data() {
			return {
				transitionName: '',
				showHeader: true
			}
		},

		beforeRouteEnter (to, from, next) {
			next((vm)=>{
				if (to.name == 'Person') {
					vm.showHeader = false;
				} else {
					vm.showHeader = true;
				}
			})
			
		},

		watch: {//使用watch 监听$router的变化
			$route(to, from) {
				if (to.name == 'Person') {
					this.showHeader = false;
				} else {
					this.showHeader = true;
				}
				//如果to索引大于from索引,判断为前进状态,反之则为后退状态
				if(to.meta.index > from.meta.index){
					//设置动画名称
					this.transitionName = 'slide-left';
				}else{
					this.transitionName = 'slide-right';
				}
			}
		}
	}
</script>