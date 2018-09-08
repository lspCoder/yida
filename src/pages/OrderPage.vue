<template>
    <div>
        <mu-content-block v-show="loading">
            <loading>
            </loading>
        </mu-content-block>
        <mu-tabs class="tab-custom" lineClass="tab-underLine" :value="activeTab" @change="handleTabChange">
		    <mu-tab titleClass="title-color" value="all" title="全部"/>
		    <mu-tab titleClass="title-color" value="prepareGo" title="待出行"/>
		    <mu-tab titleClass="title-color" value="prepareSale" title="待支付"/>
		    <mu-tab titleClass="title-color" value="changeTicket" title="退改签"/>
		 </mu-tabs>
        <mu-list>
            <mu-paper :key="flight.id" :zdepth="1" class="list" v-for="flight in orderList" v-if="favoriteFlights.length">
                <mu-list-item>

                </mu-list-item>
            </mu-paper>
            <mu-list-item class="center" v-if="!loading && !orderList.length" title="你暂时还没有全部订单">
            </mu-list-item>
        </mu-list>
        <mu-content-block class="center">
            <mu-raised-button style="border-radius: 20px;" label="去看票" to="home" icon="search" primary/>
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
    	orderList: [],
        activeTab: 'all'
    }
  },
  methods: {
	    handleTabChange: function(val) {
	      	this.activeTab = val;
	    }
  }
};
</script>
<style>
    .center {
        text-align: center;
    }
    .tab-custom {
        background-color: transparent;
        color: rgba(0,0,0,.87);
        margin-bottom: 16px;
    }
    .title-color {
        color: rgba(0,0,0,.87);
    }
    .tab-underLine {
        background-color:#2196f3;
        color: #2196f3;
    }
</style>
