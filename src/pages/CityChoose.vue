<template>
	<div>
		<mu-appbar :title="this.$route.query.title" class="header">
			<mu-icon-button icon="arrow_back" @click="goBack" slot="left" /> 
		</mu-appbar>
		<mu-content-block class="mt50">
            <mu-auto-complete hintText="请输入城市名" :maxSearchResults="5" fullWidth filter="caseSensitiveFilter" :dataSource="citys" @change="getCity"/>
        </mu-content-block>
		<mu-paper :zDepth="3">
			<mu-sub-header class="head-text">热门城市</mu-sub-header>
			<mu-content-block>
				<mu-row gutter>
					<mu-col width="30" tablet="30" desktop="30" v-for="city in hotCity" :key="city.id">
						<mu-list-item :underlineShow="false" @click="getCity(city[1])" fullWidth>{{city[1]}}</mu-list-item>
					</mu-col>
				</mu-row>
			</mu-content-block>
		</mu-paper>
		<mu-paper :zDepth="3">
			<mu-list v-for="word in words" :key="word.id">
				<mu-sub-header v-show="allCity[word].length" :id="word" inset>{{word}}</mu-sub-header>
				<mu-list-item :title="city[1]" v-for="city in allCity[word]" :key="city.id" @click="getCity(city[1])">
				</mu-list-item>
			</mu-list>
		</mu-paper>
		<div class="word-list" >
			<a class="word-item" :href="'#'+ word" v-for="word in words" :key="word.id">{{word}}</a>
		</div>
	</div>
</template>

<script>
	import data from '@/data/data'

	export default {
		components: {

		},
		data() {
			return {
				words: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
				hotCity: data.jipiaoHotCityCN[3][1]
			}
		},
		methods: {
			goBack() {
				this.$router.push('/home');
			},
			getCity: function(city) {
				console.log(city);
				if(this.$router.currentRoute.query.title == "出发城市") {
					sessionStorage.setItem('depCity', city);
				} else {
					sessionStorage.setItem('arrCity', city);
				}

				this.$router.push({
					path: '/home',
					query: {
						title: this.$route.query.title
					}
				});
			}
		},
		computed: {
			allCity: function() {
				var self = this;
				var allCity = {};
				var allCity = data.jipiaoAllCityCN;
				this.words.forEach(function(word) {
					allCity[word] = [];
					allCity.forEach(function(city) {
						if(city[4] == word) {
							allCity[word].push(city);
						}
					})
				})
				return allCity;
			},
			citys: function() {
				var citys = [];
				data.jipiaoAllCityCN.forEach(function(data){
					citys.push(data[1]);
				})
				return citys;
			}
		},
		mounted: function() {

		}
	}
</script>

<style scoped>
	.head-text {
		background-color: #e0e0e0;
	}
	
	.word-list{
		width: 30px;
		text-align: center;
		position: fixed;
		top:100px;
		right: 0;
	}
	.word-item{
		display: block;
		height: 18px;
		color: #bdbdbd;
	}
</style>