<template>
    <div>
        <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
        <mu-content-block class="loading-wrapper" v-show="loading">
            <loading>
            </loading>
        </mu-content-block>
        <mu-content-block>
            <mu-sub-header>我关注的航班</mu-sub-header>
            <mu-list>
            <mu-paper :key="flight.id" :zdepth="1" class="list" v-for="flight in favoriteFlights" v-if="favoriteFlights.length">
                <mu-sub-header>{{flight.depDate}}</mu-sub-header>
                <mu-list-item class="bgColor" @click="toFlightDetail(flight)">
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
            <mu-list-item class="center" v-if="!loading && !favoriteFlights.length" describeText="你关注的航班行程将会出现在这里">
            </mu-list-item>
            </mu-list>
        </mu-content-block>
        <mu-content-block v-show="favoriteFlights.length == 0" class="center">
            <mu-raised-button style="border-radius: 20px;" label="搜索航班" to="home" icon="search" primary/>
        </mu-content-block>
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
        loading: false,
        favoriteFlights: [],
        refreshing: false,
        trigger: null,
    }
  },
  methods: {
      getAllFlights: function() {
        var self = this;
        this.favoriteFlights = [];
        this.loading = true;
        this.$api.findAllFavoriteFlights(function(err, obj) {
            self.loading = false;
            if (err) {
                self.loading = true;
                console.log(err);
            }
            var result = JSON.parse(obj);
            for (var i = 0; i < result.results.length; i++) {
                self.favoriteFlights.push(JSON.parse(result.results[i].flightDetail));
            }
        })
      },
      toFlightDetail: function(currentFlight) {
        this.$router.push('flightDetail');
        sessionStorage.setItem('currentFlight', JSON.stringify(currentFlight));
      },
      refresh: function() {
        this.refreshing = true;
        setTimeout(() => {
            this.refreshing = false
        }, 2000)
    },
  },
  mounted: function() {
    this.trigger = this.$el;
    this.getAllFlights();
  }
};
</script>
<style>
    .refresh-container {
        background-color: #F5F6F8;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        position: relative;
        user-select: none;
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
        color: #FFFFFF;
    }
    
    .discount {
        float: right;
        color: #FFFFFF;
    }
    
    .time {
        font-size: 18px;
        color: #FFFFFF;
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
        color: #FFFFFF;
    }
    
    .arrow {
        border-bottom: 1px solid #FFFFFF;
    }
    .bgColor {
        background-color: #00B4FF;
    }
</style>
