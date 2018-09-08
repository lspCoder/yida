<template>
    <div>
        <mu-appbar title="个人信息">
			<mu-icon-button icon="arrow_back" @click="goBack" slot="left" /> 
		</mu-appbar>
        <mu-list>
            <mu-list-item title="头像">
            <mu-avatar icon="face" slot="rightAvatar"/>
            </mu-list-item>
            <mu-divider />
            <mu-list-item @click="editUserName" @blur="" title="用户名">
                <span class="rightLabel">{{userName}}</span>
            </mu-list-item>
            <mu-divider />
            <mu-list-item @click="editPhoneNumber" title="手机号">
                <span class="rightLabel">{{phoneNumber}}</span>
            </mu-list-item>
            <mu-divider />
            <mu-list-item title="修改密码">
            <mu-icon-button icon="chevron_right" slot="right" />
            </mu-list-item>
        </mu-list>
        <mu-content-block>
			<mu-raised-button label="退出账号" @click="exit" fullWidth secondary/>
        </mu-content-block>
        <mu-dialog :open="dialog" :title="dialogTitle" @close="closeDialog">
        	<mu-content-block>
		    	<mu-text-field v-show="isEditName" fullWidth v-model="userName"/>
		    	<mu-text-field v-show="!isEditName" fullWidth v-model="phoneNumber"/>
		    </mu-content-block>
		    <mu-flat-button slot="actions" @click="closeDialog" primary label="取消"/>
		    <mu-flat-button slot="actions" primary @click="updateUserInfo" label="确定"/>
		 </mu-dialog>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            userName: '',
            phoneNumber: '',
            dialog: false,
            isEditName: false,
            dialogTitle: ''
        }
    },
    methods: {
        goBack: function() {
            this.$router.go(-1);
        },
        editUserName: function (e) {
        	this.dialog = true;
        	this.dialogTitle = '修改用户名';
        	this.isEditName = true;
        },
        editPhoneNumber: function (e) {
            this.dialog = true;
            this.dialogTitle = '修改手机号';
            this.isEditName = false;
        },
        closeDialog: function () {
        	this.dialog = false;
        	this.dialogTitle = '';
        	this.isEditName = false;
        },
        updateUserInfo: function() {
        	
        },
        exit: function () {
            localStorage.removeItem('userInfo');
            this.$router.push('/person');
        }
    },
    mounted: function() {
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.userName = userInfo.userName;
        this.phoneNumber = userInfo.phoneNumber;
	},
    
}
</script>

<style scoped>
.rightLabel {
    float: right;
    margin-top: -17px;
}
</style>