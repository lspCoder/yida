
<template>
    <div>
        <mu-icon-button @click="goBack" touch style="position: fixed;color: #FFFFFF" color="#FFFFFF" icon="arrow_back"/>
        <mu-content-block style="background-color: #00B4FF;">
            <mu-content-block class="logo-bg">
            </mu-content-block>
        </mu-content-block>
        <mu-content-block class="pt20">
                <mu-text-field hintText="请输入手机号" :errorText="errorPhone" v-model="phoneNumber" type="number" @input="checkPhoneNumber" icon="phone" required/>
                <mu-text-field hintText="密码" type="password" :errorText="errorPassword" v-model="password"  @input="checkPassword" icon="lock_outline" required/>
        </mu-content-block>
        <mu-row gutter class="pt25">
            <mu-col class="center" width="85" tablet="100" desktop="100">
                <mu-raised-button class="logoBtn" @click="login" label="登录" fullWidth backgroundColor="#00B4FF"/>
            </mu-col>
        </mu-row>
        <mu-content-block style="color:#959595;">
            <mu-list>
                <mu-list-item disableRipple>
                    <mu-flat-button labelClass="textSize" color="#959595" label="忘记密码？" slot="left"/>
                    <mu-flat-button tag="button" to="register" labelClass="textSize" color="#959595" label="注册" slot="right"/>
                </mu-list-item>
            </mu-list>
        </mu-content-block>
    </div>
</template>

<script>

import md5 from 'js-md5'

export default {
    data() {
        return {
            phoneNumber: '',
            errorPhone: '',
            password: '',
            errorPassword: ''
        }
    },
    methods: {
        goBack: function() {
            this.$router.go(-1);
        },
        checkPhoneNumber: function (val) {
            if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(val))) {
                this.errorPhone = '请输入正确的手机号';
                return;
            } else if (!this.phoneNumber) {
                this.errorPhone = '请输入手机号';
                return;
            } else {
                this.errorPhone = '';
                return;
            }
        },
        
        checkPassword: function (val) {
            if (!(/^([a-zA-Z0-9]|[._]){4,19}$/).test(val)) {
                this.errorPassword = '只能输入5-20位，可以包含字母、数字、下划线_';
                return;
            } else if (!this.password) {
                this.errorPassword = '请输入密码';
                return;
            } else {
                this.errorPassword = '';
            }
            
        },

        login: function() {
            this.checkPhoneNumber(this.phoneNumber);
            this.checkPassword(this.password);
            if (this.errorPhone || this.errorPassword) return;
            var self = this;
            this.$api.login(this.phoneNumber, function(err, obj) {
                var result = JSON.parse(obj);
                if (!result.results.length) {
                    self.$toast.center('此手机号没有注册');
                    return;
                }
                var userInfo = result.results[0];
                if (userInfo.password !== md5(self.password)) {
                    self.$toast.center('密码输入错误');
                    return;
                }

                delete userInfo.password;
                self.$toast.center('登陆成功');

                localStorage.setItem('userInfo', JSON.stringify(userInfo));

                self.$router.go(-1);     //返回到上一个界面
            }, this);
        }
    }
}
</script>

<style>

    .pt20 {
        padding-top: 20px;
    }

    .pt25 {
        padding-top: 25px;
    }

    .center {
        margin: 0 auto;
        font-size: inherit;
    }

    .logoBtn {
        height: 56px;
        border-radius: 30px;
        font-size: 20px;
    }

    .textSize {
        font-size: 16px;
    }
    
</style>
