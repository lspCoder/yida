<template>
    <div class="refresh-container">
        <mu-appbar :title="flightTitle" class="topBar center">
            <mu-icon-button icon="arrow_back" @click="goBack" slot="left" touch />
			<mu-icon-button :icon="checked ? 'favorite' : 'favorite_border'" @click="addOrDelateFavoriteFlight" slot="right" touch />
            <!-- <mu-checkbox label="自定义icon" class="demo-checkbox" uncheckIcon="favorite_border" checkedIcon="favorite"/> -->
		</mu-appbar>
        <div class="detail">
            <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
            <mu-content-block>
                <mu-paper :zDepth="1">
                    <mu-row class="p10">
                        <mu-col width="50" tablet="50" desktop="50">
                            <span class="dateText">{{currentDate}}</span>
                        </mu-col>
                        <mu-col class="text-right" width="50" tablet="50" desktop="50">
                            <span class="dateText">{{flightCompany}}</span>
                        </mu-col>
                    </mu-row>
                    <mu-row class="p10">
                        <mu-col width="30" tablet="30" desktop="30">
                            <span class="time">{{depTime}}</span>
                        </mu-col>
                        <mu-col width="40" tablet="40" desktop="40">
                            <p class="needTime">{{airTime}}</p>
                        </mu-col>
                        <mu-col class="text-right" width="30" tablet="30" desktop="30">
                            <span class="time">{{arrTime}}</span>
                        </mu-col>
                    </mu-row>
                    <mu-row class="p10">
                        <mu-col width="50" tablet="50" desktop="50">
                            <span class="dateText">{{depCity}}</span>
                        </mu-col>
                        <mu-col class="text-right" width="50" tablet="50" desktop="50">
                            <span class="dateText">{{arrCity}}</span>
                        </mu-col>
                    </mu-row>
                    <mu-row class="p10">
                        <mu-col width="40" tablet="40" desktop="40">
                            <span class="dateText">{{planeStyle}}</span>
                        </mu-col>
                    </mu-row>
                </mu-paper>
            </mu-content-block>
            <mu-content-block>
                <mu-paper :zDepth="1">
                    <mu-list>
                        <mu-list-item disableRipple :key="bingoClassInfo.id" v-for="bingoClassInfo in currentFlight.bingoClassInfoList">
                            <mu-row gutter>
                                <mu-col width="50" tablet="50" desktop="50">
                                    <p class="mt0 ft16">{{bingoClassInfo.classNoCn + bingoClassInfo.classNo}}</p>
                                    <p class="mt0 discountColor">{{bingoClassInfo.discount + '折'}}</p>
                                    <p class="mt0 discountColor">{{getBackPrice(bingoClassInfo)}}</p>
                                </mu-col>
                                <mu-col class="text-right" width="40" tablet="40" desktop="40">
                                    <p class="mt0 ft16 center">￥ {{bingoClassInfo.adtInfPrice}}</p>
                                    <mu-raised-button @click="toOrderPage" label="预 定" primary/>
                                </mu-col>
                            </mu-row>
                        </mu-list-item>
                        <mu-divider/>
                    </mu-list>
                </mu-paper>
            </mu-content-block>
        </div>
        <mu-toast v-if="toast" :message="checked?'关注成功': '取消关注'" @close="hideToast"/>
        <mu-dialog :open="errDialog" title="警告">
            {{errorMessage}}
        <mu-flat-button label="确定" slot="actions" primary @click="closeErrDialog"/>
      </mu-dialog>
    </div>
</template>
<script>

    export default {
        components: {

        },
        data() {
            return {
                refreshing: false,
                trigger: null,
                currentFlight: {},
                toast: false,
                checked: false,
                objectId: '',
                errDialog: false,
                errorMessage: ''
            }
        },
        computed: {
            flightTitle:function() {
                return String(this.currentFlight.airwaysCn + this.currentFlight.flightNo);
            },
            currentDate: function() {
                return this.currentFlight.depDate;
            },
            calendarTime: function() {
                return this.$moment(this.currentFlight.depDate).calendar(null, {
                    sameDay: '[今天]',
                    nextDay: '[明天]',
                    nextWeek: '[下]dddd',
                    lastDay: '[昨天]',
                    lastWeek: '[上]dddd',
                    sameElse: 'DD/MM/YYYY'
                })
            },
            flightCompany: function() {
                return this.currentFlight.airwaysCn + this.currentFlight.flightNo;
            },
            depTime: function() {
                if (!this.currentFlight.depTime) return;
                return this.currentFlight.depTime.substring(0, 2) + ':'+ this.currentFlight.depTime.substring(2);
            },
            arrTime: function() {
                if (!this.currentFlight.arrTime) return;
                return this.currentFlight.arrTime.substring(0, 2) + ':'+ this.currentFlight.arrTime.substring(2);
            },
            airTime: function() {
                return this.currentFlight.airTime;
            },
            depCity: function() {
                if (!this.currentFlight.depAirdrome) return;
                return '(' + this.currentFlight.depCity + ')' + sessionStorage.depCity + this.currentFlight.depAirdrome.replace(/(机场)/g, '') + this.currentFlight.depTerminal;
            },
            arrCity: function() {
                if (!this.currentFlight.arrAirdrome) return;
                return '(' + this.currentFlight.arrCity + ')' + sessionStorage.arrCity + this.currentFlight.arrAirdrome.replace(/(机场)/g, '') + this.currentFlight.arrTerminal;
            },
            planeStyle: function() {
                return this.currentFlight.planeStyleCN + this.currentFlight.planeStyle;
            }
        },
        methods: {
            goBack() {
				this.$router.go(-1);
			},
            refresh: function() {
                this.refreshing = true;
                setTimeout(() => {
                    this.refreshing = false
                }, 2000)
            },
            getBackPrice: function(bingoClassInfo) {
                if (!bingoClassInfo.refundRemark) return ;
                return bingoClassInfo.refundRemark.value=='' ? '免费改期' : ('退改费￥'+bingoClassInfo.refundRemark.value) + '元起';
            },
            addOrDelateFavoriteFlight: function() {
                this.checked = !this.checked;
                var flightData = {
                    flightNo: this.currentFlight.flightNo,
                    airTime: this.currentFlight.airTime,
                    arrDate: this.currentFlight.arrDate,
                    arrTime: this.arrTime,
                    arrAirdrome: this.currentFlight.arrAirdrome,
                    arrCity: this.currentFlight.arrCity,
                    depDate: this.currentFlight.depDate,
                    depTime: this.depTime,
                    depAirdrome: this.currentFlight.depAirdrome,
                    depCity: this.currentFlight.depCity,
                    flightDetail: JSON.stringify(this.currentFlight)
                }
                var self = this;
                if (this.checked) {
                    this.$api.saveFavoriteFlight(flightData, function(err, obj) {
                        console.log(err, obj);
                        var result = JSON.parse(obj);
                        if (result) {
                            self.showToast();
                        } else {
                            self.errDialog = true;
                            self.errorMessage = err;
                        }
                    })
                } else {
                    this.$api.deleteFavoriteFlight(this.objectId, function(err, obj) {
                        var result = JSON.parse(obj);
                        if (result.msg == 'ok') {
                            self.showToast();
                            self.objectId = '';
                        } else {
                            self.errDialog = true;
                            self.errorMessage = err;
                        }
                    })
                }
                
            },
            toOrderPage: function() {
                if (this.isLogin()) {
                    this.$router.push('/orderDetail');       //跳转到订单购买页面
                } else {
                    this.$router.push('/login');          //未登录的用户跳转到登陆页面
                }
            },
            isLogin: function() {
                return localStorage.getItem('isLogin') == 'true';
            },
            showToast () {
                this.toast = !this.toast;
                if (this.toastTimer) clearTimeout(this.toastTimer);
                this.toastTimer = setTimeout(() => { this.toast = false }, 2000);
            },
            hideToast () {
                this.toast = false;
                if (this.toastTimer) clearTimeout(this.toastTimer);
            },
            closeErrDialog: function() {
                this.errDialog = false;
            }
        },
        mounted: function() {
            window.scrollTo(0,0);
            this.trigger = this.$el;
            this.currentFlight = JSON.parse(sessionStorage.getItem('currentFlight'));
            var flightData = {
                flightNo: this.currentFlight.flightNo,
                airTime: this.currentFlight.airTime,
                arrDate: this.currentFlight.arrDate,
                arrTime: this.arrTime,
                arrAirdrome: this.currentFlight.arrAirdrome,
                arrCity: this.currentFlight.arrCity,
                depDate: this.currentFlight.depDate,
                depTime: this.depTime,
                depAirdrome: this.currentFlight.depAirdrome,
                depCity: this.currentFlight.depCity,
                flightDetail: JSON.stringify(this.currentFlight)
            } 
            var self = this;
            this.$api.findFavoriteFlights(flightData, this.currentFlight.flightNo,this.currentFlight.depDate, this.currentFlight.depTime, function(err, obj) {
                var result = JSON.parse(obj);
                if (result.results.length > 0) {
                    self.checked = true;
                    self.objectId = result.results[0].objectId;
                }
            })
        }
    }
</script>

<style scoped>
    .refresh-container {
        background-color: #F5F6F8;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        position: relative;
        user-select: none;
    }
    .topBar {
        position: fixed;
    }
    .detail {
        margin-top: 56px;
    }
    .center {
        text-align: center;
    }
    .text-right {
        text-align: right;
    }
    .p10 {
        padding: 10px;
    }
    .mt0 {
        margin: 0;
    }
    .ft16 {
        font-size: 16px;
    }
    .dateText {
        color: rgba(0, 0, 0, 0.54);
    }
    .time {
        font-size: 24px;
        color: #515151;
    }
    .needTime {
        border-bottom: 1px solid;
        text-align: center;
        color: #10B6FF;
    }
    .discountColor {
        color: #10B6FF;
    }
    .addFlight {
        position: fixed;
        right: 10px;
        bottom: 20px;
    }
</style>