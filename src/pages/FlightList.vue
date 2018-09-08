/**
 * [goBack description]
 * @Author    lsp
 * @DateTime  2018-05-03
 * @describe 航班列表页面
 */
<template>
    <div>
        <mu-appbar :title="flightTitle" class="navBar">
            <mu-icon-button @click="goBack" icon="arrow_back" slot="left">
            </mu-icon-button>
            <mu-flat-button class="ml24" color="white" icon="add" slot="right">
            </mu-flat-button>
        </mu-appbar>
        <mu-content-block class="dataPiker">
            <mu-flexbox class="center">
                <mu-flexbox-item>
                    <mu-flat-button @click="searchLastDate" label="前一天">
                    </mu-flat-button>
                </mu-flexbox-item>
                <mu-flexbox-item class="ht45">
                    <mu-date-picker autoOk fullWidth :underlineShow="false" :minDate="this.minDate" @change="handleChangeDate" @focus="handleFocusDate" disableYearSelection v-model="searchDate">
                    </mu-date-picker>
                </mu-flexbox-item>
                <mu-flexbox-item>
                    <mu-flat-button @click="searchNextDate" label="后一天">
                    </mu-flat-button>
                </mu-flexbox-item>
            </mu-flexbox>
          </mu-content-block>
          <mu-divider/>
        <div class="mb56">
            <mu-content-block class="loading-wrapper" v-show="loading">
                <loading>
                </loading>
            </mu-content-block>
            <mu-list style="padding: 0">
                <mu-paper :key="flight.id" :zDepth="1" class="list" v-for="flight in flightList" v-if="flightList.length">
                    <mu-list-item @click="toFlightDetail(flight)">
                        <mu-row class="center" gutter="">
                            <mu-col class="time" desktop="20" tablet="25" width="25">
                                {{flight.depTime.substring(0, 2) + ':'+ flight.depTime.substring(2)}}
                                <p class="describeText">
                                    {{flight.depAirdrome + flight.depTerminal}}
                                </p>
                            </mu-col>
                            <mu-col class="describeText mt10 arrow" desktop="22" tablet="22" width="22">
                                {{flight.airTime}}
                            </mu-col>
                            <mu-col class="time" desktop="20" tablet="25" width="25">
                                {{flight.arrTime.substring(0, 2) + ':'+ flight.arrTime.substring(2)}}
                                <p class="describeText">
                                    {{flight.arrAirdrome + flight.arrTerminal}}
                                </p>
                            </mu-col>
                            <mu-col class="price" desktop="25" tablet="25" width="25">
                                {{'￥' + flight.bingoLeastClassInfo.adtInfPrice}}
                                <p class="describeText">
                                    {{flight.bingoLeastClassInfo.classNoCn + flight.bingoLeastClassInfo.classNo + ' ' + flight.bingoLeastClassInfo.discount + '折'}}
                                </p>
                            </mu-col>
                            <mu-col desktop="100" style="text-align: left;" tablet="100" width="100">
                                <mu-avatar :size="20" :src="'http://jipiao.jd.com/htm/img/'+ flight.airways +'.gif'" style="vertical-align: middle;">
                                </mu-avatar>
                                <span class="describeText">
                                    {{flight.airwaysCn + flight.flightNo + '|' + flight.planeStyle}}
                                </span>
                            </mu-col>
                        </mu-row>
                    </mu-list-item>
                </mu-paper>
                <mu-list-item class="center" title="暂无合适的航班" v-if="!loading && !flights.length">
                </mu-list-item>
            </mu-list>
        </div>
        <mu-bottom-nav :value="bottomNav" @click="handleClickNav" @change="handleChangeNav" class="bottom_nav">
            <mu-bottom-nav-item :title="bottomNav1" icon="schedule" value="time">
            </mu-bottom-nav-item>
            <mu-bottom-nav-item :title="bottomNav2" icon="favorite" value="price">
            </mu-bottom-nav-item>
            <mu-bottom-nav-item icon="view_carousel" title="舱位" value="seat">
            </mu-bottom-nav-item>
            <mu-bottom-nav-item icon="flight_takeoff" title="航空公司" value="flight">
            </mu-bottom-nav-item>
        </mu-bottom-nav>
        <mu-bottom-sheet :open="bottomNav3" @close="closeBottomNav3">
            <mu-list @itemClick="closeBottomNav3">
                <mu-sub-header>
                    舱位
                </mu-sub-header>
                <mu-list-item title="不限舱位" value="*">
                	<mu-icon v-show="currentClass == '*'" slot="right" :size="20" value="done">
                    </mu-icon>
                </mu-list-item>
                <mu-list-item :key="flight.id" v-for="flight in flightClass" :title="flight.classNoCn" :value="flight" >
                	<mu-icon v-show="flight.classNoCn == currentClass.classNoCn" slot="right" :size="20" value="done">
                    </mu-icon>
                </mu-list-item>
            </mu-list>
        </mu-bottom-sheet>
        <mu-bottom-sheet :open="bottomNav4" @close="closeBottomNav4">
            <mu-list @itemClick="closeBottomNav4" >
                <mu-sub-header>
                    航空公司
                </mu-sub-header>
                <mu-list-item title="不限航空公司" value="*">
                    <mu-icon slot="left" :size="20" value="select_all"></mu-icon>
                    <mu-icon v-show="currentCompany == '*'" slot="right" :size="20" value="done">
                    </mu-icon>
                </mu-list-item>
                <mu-list-item :value="company" :key="company.id" v-for="company in flightCompanys" :title="company.airwaysCn">
                	<mu-avatar slot="left" :size="20" :src="'http://jipiao.jd.com/htm/img/'+ company.airways +'.gif'">
                    </mu-avatar>
                    <mu-icon v-show="company.airways == currentCompany.airways" slot="right" :size="20" value="done">
                    </mu-icon>
                </mu-list-item>
            </mu-list>
        </mu-bottom-sheet>
    </div>
</template>
<script>
    import loading from '@/components/loading';

	export default {
		components: {
			loading
		},
		data() {
			return {
				loading: true,
				flights: [],
				searchDate: '',
				dataInfo: {},
				minDate: this.$moment().format('YYYY-MM-DD'),
				flightCompanys: [],         //航空公司
				flightClass: [],            //舱位等级
				currentClass:'*',             //选中的舱位等级，默认为不限
				currentCompany: '*',          //选中的航空公司
				flightTitle: sessionStorage.getItem('depCity') + '---' + sessionStorage.getItem('arrCity'),
				bottomNav1: '时间',
				bottomNav2: '价格',
				bottomNav3: false,
				bottomNav4: false,
				bottomNav: ''
			}
		},
		methods: {
			goBack() {
				this.$router.push("/home");
			},
			/**
			 * [getFlightList 获取航班列表]
			 * @Author    lsp
			 * @DateTime  2018-05-06
			 * @copyright [copyright]
			 * @license   [license]
			 * @version   [version]
			 * @param     {[type]}    data [description]
			 * @return    {[type]}         [description]
			 */
			getFlightList: function(data) {
				var self = this;
				self.loading = true;

				var postData = {
					depCity: data.depCity,
					arrCity: data.arrCity,
					depDate: data.depDate,
					arrDate: data.arrDate,
					queryModule: data.queryModule,
					lineType: 'OW',
					queryType: 'jipiaoindexquery',
					queryuuid: '',
					uniqueKey: '',
					sourceId: '',
					arrTime: ''
				}

				self.$api.getFlightList(postData, function(result){
					if (result.data.data) {
						postData.queryuuid = result.data.data.queryuuid;
						self.$api.getFlightList(postData, function(result){
							if (result.data.code == 200) {
								if (result.data.data.captchaInfo) {
									console.log(result.data.data.desc);
								} else {
									self.flights = result.data.data.flights || [];
									self.loading = false;
								}
							} else {
								self.loading = false;
							}
							self.loading = false;
						})
					}
				})
			},
			handleChangeDate: function (val) {
				this.searchDate = this.$moment(val).format('MMMDo dddd');
				console.log(this.searchDate);
			},
			handleFocusDate: function () {
				this.searchDate = this.$moment(this.dataInfo.arrDate).format('YYYY-MM-DD');
				console.log(this);
			},
			searchLastDate: function () {  //todo 返程日期
				this.dataInfo.depDate = this.$moment(this.dataInfo.depDate).subtract(1, 'days').format('YYYY-MM-DD');
				this.dataInfo.arrDate = this.dataInfo.depDate;
				this.searchDate = this.$moment(this.dataInfo.depDate).format('MMMDo dddd');
				this.getFlightList(this.dataInfo);
			},
			searchNextDate: function () {
				this.dataInfo.depDate = this.$moment(this.dataInfo.depDate).add(1, 'days').format('YYYY-MM-DD');
				this.dataInfo.arrDate = this.dataInfo.depDate;
				this.searchDate = this.$moment(this.dataInfo.depDate).format('MMMDo dddd');
				this.getFlightList(this.dataInfo);
			},
			toFlightDetail: function (flight) {
				this.$router.push('flightDetail');
				sessionStorage.setItem('currentFlight', JSON.stringify(flight));
			},
			handleChangeNav (val) {
				switch(val) {
					case 'time':
						if (this.bottomNav1 == '从早到晚') {
							this.bottomNav1 = '从晚到早';
						} else {
							this.bottomNav1 = '从早到晚';
						}
						break;
					case 'price':
						if (this.bottomNav2 == '从低到高') {
							this.bottomNav2 = '从高到低';
						} else {
							this.bottomNav2 = '从低到高';
						}
						break;
					case 'seat':
						this.openBottomNav3();
						break;
					case 'flight':
						this.openBottomNav4();
						break;
					default:
						break;
				}
		      	this.bottomNav = val;
		    },
		    closeBottomNav3 (listItem) {
		    	this.currentClass = listItem.value || '*';
		      	this.bottomNav3 = false;
		    },
		    openBottomNav3 () {
		    	var self = this;
		    	this.flightClass = [];
		    	var classes = {};
		    	this.flights.forEach(function(flight){
		    		if (!classes[flight.bingoLeastClassInfo.classNoCn]) {
			    		self.flightClass.push({classNo: flight.bingoLeastClassInfo.classNo, classNoCn: flight.bingoLeastClassInfo.classNoCn});
			    		classes[flight.bingoLeastClassInfo.classNoCn] = true;
			    	}
		    	})
		      	this.bottomNav3 = true;
		    },
		    closeBottomNav4 (listItem) {
		    	this.currentCompany = listItem.value || '*';
		      	this.bottomNav4 = false;
		    },
		    openBottomNav4 () {
		    	var self = this;
		    	self.flightCompanys = [];
		    	var companys = {};
		    	this.flights.forEach(function(flight){
		    		if (!companys[flight.airways]) {
			    		self.flightCompanys.push({airways: flight.airways, airwaysCn: flight.airwaysCn});
			    		companys[flight.airways] = true;
			    	}
		    	})
		      	this.bottomNav4 = true;
		    },
		    handleClickNav: function(val) {
		    	console.log(val);
		    	switch(val) {
					case 'time':
						if (this.bottomNav1 == '从早到晚') {
							this.bottomNav1 = '从晚到早';
						} else {
							this.bottomNav1 = '从早到晚';
						}
						break;
					case 'price':
						if (this.bottomNav2 == '从低到高') {
							this.bottomNav2 = '从高到低';
						} else {
							this.bottomNav2 = '从低到高';
						}
						break;
					case 'seat':
						this.openBottomNav3();
						break;
					case 'flight':
						this.openBottomNav4();
						break;
					default:
						break;
				}
		    },
			sortByDepTime: function(flights) {
				var self = this;
				flights.sort(function(flight1, flight2){
					if (self.bottomNav1 == '从早到晚') {
						return Number(flight1.depTime) - Number(flight2.depTime);
					} else {
						return Number(flight2.depTime) - Number(flight1.depTime);
					}
				})
				return flights;
			},
			sortByFlightPrice: function(flights){
				var self = this;
				flights.sort(function(flight1, flight2){
					if (self.bottomNav2 == '从低到高') {
						return flight1.bingoLeastClassInfo.adtInfPrice - flight2.bingoLeastClassInfo.adtInfPrice;
					} else {
						return flight2.bingoLeastClassInfo.adtInfPrice - flight1.bingoLeastClassInfo.adtInfPrice;
					}
				})
				return flights;
			},
			/**
			 * [sortByCompany 按照航空公司过滤]
			 * @Author    lsp
			 * @DateTime  2018-05-05
			 * @copyright [copyright]
			 * @license   [license]
			 * @version   [version]
			 * @param     {[type]}    flights []
			 * @return    {[type]}            [description]
			 */
			sortByCompany: function(flights) {
				var list = [];
				var self = this;
				if (!self.currentCompany.airways || self.currentCompany == '*')
					return flights;
				flights.forEach(function(flight){
					if (flight.airways == self.currentCompany.airways) {
						list.push(flight);
					}
				})
				return list;
			},
			/**
			 * [sortByClass 按照舱位过滤]
			 * @Author    lsp
			 * @DateTime  2018-05-05
			 * @copyright [copyright]
			 * @license   [license]
			 * @version   [version]
			 * @return    {[type]}    [description]
			 */
			sortByClass: function(flights) {
				var list = [];
				var self = this;
				if (!self.currentClass.classNoCn || self.currentClass == '*')
					return flights;
				flights.forEach(function(flight){
					if (flight.bingoLeastClassInfo.classNoCn == self.currentClass.classNoCn) {
						list.push(flight);
					}
				})
				return list;
			}
		},
		computed: {
			flightList: function() {
				var flightList = this.flights;
				flightList = this.sortByDepTime(flightList);
				flightList = this.sortByFlightPrice(flightList);
				flightList = this.sortByCompany(flightList);
				flightList = this.sortByClass(flightList);
				return flightList;
			}
		},
		created: function(){
			var data = this.dataInfo = JSON.parse(sessionStorage.getItem('searchData'));
			this.searchDate = this.$moment(data.depDate).format('MMMDo dddd');
			this.getFlightList(data);
		},
		mounted: function() {
			
		}
	}
</script>
<style scoped="">
    .navBar {
		position: fixed;
		top: 0;
		text-align: center;
	}
	.dataPiker {
		margin-top: 56px;
		padding-bottom: 0;
	}
	.loading-wrapper {
		z-index: 5;
		position: fixed;
		height: 75vh;
	}

	.center {
		text-align: center;
	}

	.list{
		margin-bottom: 5px;
	}

	.price {
		font-size: 20px;
		color: #e4393c;
	}
	
	.discount {
		float: right;
	}
	
	.time {
		font-size: 18px;
		color: #515151;
	}

	.mb56 {
		margin-bottom: 56px;
	}

	.ht45 {
		height: 42px !important;
	}

	.ml24 {
		margin-left: 24px;
	}
	
	.mt10 {
		margin-top: 10px;
	}
	
	.describeText {
		font-size: 12px;
		color: rgba(0, 0, 0, 0.54);
	}
	
	.arrow {
		border-bottom: 1px solid;
	}
</style>