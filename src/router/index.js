import Vue from 'vue'
import Router from 'vue-router'
// import Layout from '@/Layout'           //路由懒加载，在路由中异步引用组件
// import Home from '@/pages/Home'
// import CityChoose from '@/pages/CityChoose'
// import FlightList from '@/pages/FlightList'
// import FavoriteFlight from '@/pages/FavoriteFlight'
// import Distance from '@/pages/Distance'
// import Person from '@/pages/Person'

Vue.use(Router)

var router = new Router({
	routes: [{
		path: '/',
		name: 'Layout',
		component: resolve => require(['@/Layout'], resolve),
		meta: { index: 4 },//meta对象的index用来定义当前路由的层级,由小到大,由低到高
		redirect: '/guide1',
		children: [{
			path: 'home',
			name: 'Home',
			meta: { index: 5 },
			component: resolve => require(['@/pages/Home'], resolve),
		}, {
			path: 'favoriteFlight',
			name: 'FavoriteFlight',
			meta: { index: 6 },
			component: resolve => require(['@/pages/FavoriteFlight'], resolve),
		}, {
			path: 'order',
			name: 'OrderPage',
			meta: { index: 7 },
			component: resolve => require(['@/pages/OrderPage'], resolve),
		}, {
			path: 'person',
			name: 'Person',
			meta: { index: 8 },
			component: resolve => require(['@/pages/Person'], resolve),
		}]
	}, {
		path: '/cityChoose',
		name: 'CityChoose',
		meta: { index: 9 },
		component: resolve => require(['@/pages/CityChoose'], resolve),
	}, {
		path: '/flightList',
		name: 'FlightList',
		meta: { index: 10 },
		component: resolve => require(['@/pages/FlightList'], resolve),
	}, {
		path: '/flightDetail',
		name: 'FlightDetail',
		meta: { index: 11 },
		component: resolve => require(['@/pages/FlightDetail'], resolve),
	}, {
		path: '/login',
		name: 'Login',
		meta: { index: 12 },
		component: resolve => require(['@/pages/Login'], resolve),
	}, {
		path: '/register',
		name: 'Register',
		meta: { index: 13 },
		component: resolve => require(['@/pages/Register'], resolve),
	}, {
		path: '/personMessage',
		name: 'PersonMessage',
		meta: { index: 14 },
		component: resolve => require(['@/pages/PersonMessage'], resolve),
	}, {
		path: '/setting',
		name: 'Setting',
		meta: { index: 15 },
		component: resolve => require(['@/pages/Setting'], resolve),
	}, /*{
		path: '/splash',
		name: 'splash', //app启动页
		// meta: { index: 4 },
		component: resolve => require(['@/components/splash'], resolve),
	}*/, {
		path: '/guide',
		name: 'guide', //app引导页
		meta: { index: 0 },
		component: resolve => require(['@/components/guide'], resolve),
		children: [{
			path: '/guide1',
			name: 'guide1',
			meta: { index: 1 },
			component: resolve => require(['@/components/guide1'], resolve),
		}, {
			path: '/guide2',
			name: 'guide2',
			meta: { index: 2 },
			component: resolve => require(['@/components/guide2'], resolve),
		}, {
			path: '/guide3',
			name: 'guide3',
			meta: { index: 3 },
			component: resolve => require(['@/components/guide3'], resolve),
		}]
	}, {
		path: '*',
		redirect: '/home'
	}],
	//mode: 'history'
})
export default router