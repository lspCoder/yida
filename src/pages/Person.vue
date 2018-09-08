<template>
	<div>
		<mu-list class="header-person">
		    <mu-list-item @click="toPersonDetailOrLogin" titleClass='text-title' :title="userName">
			    <mu-avatar icon="face" slot="leftAvatar"/>
			    <mu-icon color="#FFFFFF" value="chevron_right" slot="right"/>
		    </mu-list-item>
		</mu-list>
		<mu-list class="text-color">
			<mu-list-item titleClass='text-color' title="我的证件">
				<mu-icon slot="left" value="folder_shared" />
			</mu-list-item>
			<mu-divider />
			<mu-list-item titleClass='text-color' title="账号安全">
				<mu-icon slot="left" value="security" />
			</mu-list-item>
			<mu-list-item titleClass='text-color' title="邮寄地址">
				<mu-icon slot="left" value="place" />
			</mu-list-item>
			<mu-list-item titleClass='text-color' title="发票抬头">
				<mu-icon slot="left" value="attach_money" />
			</mu-list-item>
			<mu-list-item titleClass='text-color' title="常用乘机人">
				<mu-icon slot="left" value="person" />
			</mu-list-item>
			<mu-list-item titleClass='text-color' title="客服中心">
				<mu-icon slot="left" value="supervisor_account" />
			</mu-list-item>
			<mu-list-item titleClass='text-color' title="意见反馈">
				<mu-icon slot="left" value="create" />
			</mu-list-item>
			<mu-list-item titleClass='text-color' title="设置">
				<mu-icon slot="left" value="settings" />
			</mu-list-item>
		</mu-list>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				defaultImage: require('@/assets/person.png'),
				userName: '',
				isLogin: false
			}
		},
		mounted: function() {
			var userInfoString = localStorage.getItem('userInfo');
			if (userInfoString) {
				var userInfo = JSON.parse(userInfoString);
				this.userName = userInfo.userName || userInfo.phoneNumber;
				this.isLogin = true;
			} else {
				this.userName = '登陆/注册';
				this.isLogin = false;
			}
		},
		methods: {
			toPersonDetailOrLogin: function () {
				if (this.isLogin) {
					this.$router.push('/personMessage');
				} else {
					this.$router.push('/login');
				}
			}
		}
	}
</script>

<style>
.header-person {
	background-color: #2196f3;
}
.text-title {
	color: #FFFFFF;
}
.text-color {
	color: #8F8F8F;
}
</style>