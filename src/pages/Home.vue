/* * @Author: zy 
* @Date: 2018-03-16 13:21:06 
* @Last Modified by: zy 
* @Last Modified time: 2018-03-16 22:49 
*/
<template>
	<div class="content">
		<mu-content-block>
			<mu-paper :zDepth="2">
				<mu-tabs :value="activeTab" @change="handleTabChange" class="custom-tab">
					<mu-tab value="1" title="单程" class="custom-title" />
					<mu-tab value="2" title="往返" class="custom-title" />
					<mu-tab value="3" title="多程" class="custom-title" />
				</mu-tabs>
				<div v-if="activeTab === '1'">
						<mu-content-block>
							<mu-row gutter>
								<mu-col width="40" table="40" desktop="40">
									<mu-text-field label="出发城市" :errorText="errorDepCity" @focus="toCityChoosePage('出发城市')" v-model="depCity" fullWidth labelFloat required/>
								</mu-col>
								<mu-col class="icon-box" width="20" table="20" desktop="20">
									<mu-icon-button icon="swap_horiz" @click="swapCity" touch/>
								</mu-col>
								<mu-col width="40" table="40" desktop="40">
									<mu-text-field label="到达城市" :errorText="errorArrCity" @focus="toCityChoosePage('到达城市')" v-model="arrCity" fullWidth labelFloat required/>
								</mu-col>
							</mu-row>
							<mu-row gutter>
								<mu-col width="40" table="40" desktop="40">
									<mu-date-picker fullWidth hintText="请选择出发日期" :minDate="minDate" :autoOk="true" v-model="depDate" required/>
								</mu-col>
							</mu-row>
						</mu-content-block>
					</div>
				<div v-if="activeTab === '2'">
					<mu-content-block>
						<mu-row gutter>
							<mu-col width="40" table="40" desktop="40">
								<mu-text-field label="出发城市" :errorText="errorDepCity" @focus="toCityChoosePage('出发城市')" v-model="depCity" fullWidth labelFloat required/>
							</mu-col>
							<mu-col class="icon-box" width="20" table="20" desktop="20">
								<mu-icon-button icon="swap_horiz" @click="swapCity" touch/>
							</mu-col>
							<mu-col width="40" table="40" desktop="40">
								<mu-text-field label="到达城市" :errorText="errorArrCity" @focus="toCityChoosePage('到达城市')" v-model="arrCity" fullWidth labelFloat required/>
							</mu-col>
						</mu-row>
						<mu-row gutter>
							<mu-col width="40" table="40" desktop="40">
								<mu-date-picker fullWidth hintText="请选择出发日期" :minDate="minDate" :autoOk="true" v-model="depDate" required/>
							</mu-col>
							<mu-col width="40" table="40" desktop="40">
								<mu-date-picker fullWidth hintText="请选择返程日期" :autoOk="true" v-model="arrDate" required/>
							</mu-col>
						</mu-row>
					</mu-content-block>
				</div>
				<div v-if="activeTab === '3'">
					<mu-content-block>
						<h2>Tab Three</h2>
						<p>
							这是第三个 tab
						</p>
					</mu-content-block>
				</div>
				<mu-content-block>
				<mu-row gutter>
					<mu-raised-button label="查询" @click="searchFlight" primary fullWidth/>
					</mu-row>
				</mu-content-block>
			</mu-paper>
		</mu-content-block>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				activeTab: '1',
				lastTab: 0,
				minDate: this.$moment().format("YYYY-MM-DD"),
				depCity: "",
				depDate: this.$moment().format("YYYY-MM-DD"),
				arrCity: "",
				arrDate: "",
				errorDepCity: '',
				errorArrCity: ''
			};
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				var depCityInfo = sessionStorage.getItem("depCity") ?
					sessionStorage.getItem("depCity") : "";
				var arrCityInfo = sessionStorage.getItem("arrCity") ?
					sessionStorage.getItem("arrCity") : "";
				vm.depCity = depCityInfo;
				vm.arrCity = arrCityInfo;
			});
		},
		beforeRouteUpdate(to, from, next) {
			next();
		},
		methods: {
			handleTabChange(val) {
				this.loading = false;
				this.lastTab = this.activeTab;
				this.activeTab = val;
			},
			toCityChoosePage(text) {
				this.$el.blur();
				this.$router.push({
					path: "/cityChoose",
					query: {
						title: text
					}
				});
			},
			swapCity: function() {
				var swapCity = this.depCity;
				this.depCity = this.arrCity;
				this.arrCity = swapCity;
			},
			searchFlight: function() {
				if (!this.depCity) {
					this.errorDepCity = '出发城市不能为空';
					return;
				}
				if (!this.arrCity) {
					this.errorArrCity = '到达城市不能为空';
					return;
				}
				var searchData = {};
				searchData.depCity = this.depCity;
				searchData.depDate = this.depDate;
				searchData.arrCity = this.arrCity;
				searchData.arrDate = this.arrDate || this.depDate;
				searchData.queryModule = this.arrDate ? 1 : 2;
				var data = JSON.stringify(searchData);
				sessionStorage.setItem("searchData", data);
				this.$router.push("/flightList");
			}
		},
		mounted: function() {
			this.$store.dispatch("changeTabValue", "机票");
			this.scroller = this.$el;
		}
	};
</script>
<style scoped="">
	.icon-box {
		text-align: center;
		height: 80px;
		line-height: 80px;
		cursor: pointer;
	}
	
	.custom-tab {
		background-color: #ffffff;
	}
	
	.custom-title {
		color: black;
	}
</style>