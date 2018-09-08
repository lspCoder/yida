<template>
    <div>
        <mu-icon-button touch @click="goBack" style="position: fixed;color: #FFFFFF" color="#FFFFFF" icon="arrow_back"/>
        <mu-content-block style="background-color: #00B4FF;">
            <mu-content-block class="logo-bg">
            </mu-content-block>
        </mu-content-block>

        <mu-content-block v-show="!showAuthCode">
            <mu-content-block>
                <img class="step-img" src="../assets/icons/register1.png" alt="">
            </mu-content-block>
            <mu-content-block class="ptb0">
                <mu-text-field @input="checkPhoneNumber" v-model="phoneNumber" :errorText="errorPhone" hintText="请输入手机号" fullWidth type="number" icon="phone" required/>
                <mu-text-field @input="checkPassword" v-model="password" :errorText="errorPassword" hintText="请输入密码" fullWidth type="text" icon="lock_outline" required/>
            </mu-content-block>
            <mu-content-block class="ptb0">
                <mu-raised-button class="logoBtn" @click="getAuthCode" label="获取验证码" fullWidth backgroundColor="#00B4FF"/>
            </mu-content-block>
            <mu-content-block class="describe">
                已有账号,<mu-flat-button to="login" tag="button" labelClass="textSize" color="#959595" label="立即登录"/>
            </mu-content-block>
        </mu-content-block>

        <mu-content-block v-show="showAuthCode">
            <mu-content-block>
                <img class="step-img" src="../assets/icons/register2.png" alt="">
            </mu-content-block>
            <mu-content-block class="textCenter">
                <mu-flat-button label="请输入验证码" color="#959595" labelClass="codeDesc"/>
            </mu-content-block>
            <mu-content-block class="textCenter">
                <mu-text-field v-model="authCode1" :underlineShow="false" class="textBoder" required inputClass="ht35" />
                <mu-text-field v-model="authCode2" :underlineShow="false" class="textBoder" required inputClass="ht35" />
                <mu-text-field v-model="authCode3" :underlineShow="false" class="textBoder" required inputClass="ht35" />
                <mu-text-field v-model="authCode4" :underlineShow="false" class="textBoder" required inputClass="ht35" />
                <mu-text-field v-model="authCode5" :underlineShow="false" class="textBoder" required inputClass="ht35" />
                <mu-text-field v-model="authCode6" :underlineShow="false" class="textBoder" required inputClass="ht35" />
            </mu-content-block>
            <mu-content-block class="pt25">
                <mu-raised-button class="logoBtn" @click="login" label="确定" fullWidth backgroundColor="#00B4FF"/>
            </mu-content-block>
        </mu-content-block>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showAuthCode: false,
            phoneNumber: '',
            errorPhone: '',
            password: '',
            errorPassword: '',
            authCode: '',           //验证码
            authCode1: '',    
            authCode2: '',    
            authCode3: '',    
            authCode4: '',    
            authCode5: '',    
            authCode6: ''    
        }
    },
    methods: {
        getAuthCode: function () {
            this.showAuthCode = true;
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

        getAuthCode: function () {
            this.checkPhoneNumber(this.phoneNumber);
            this.checkPassword(this.password);
            if (this.errorPhone || this.errorPassword) return;
            var self = this;
            this.$api.checkPhoneNumber(this.phoneNumber, function(err, obj) {
                var result = JSON.parse(obj);
                if (result.results.length > 0) {
                    self.$toast.center("该手机号已经注册");
                    return;
                } else {
                    self.authCode = Math.floor(Math.random() * 1000000);
                    self.$api.sendMessage(self.phoneNumber, self.authCode, function(result) {
                        self.$toast.center(result.reason);
                        if (result.result.error_code == 0) {
                            self.showAuthCode = true;
                        }
                    })
                }
            });
        },

        login: function() {
            var authCode = this.authCode1+this.authCode2+this.authCode3+this.authCode4+this.authCode5+this.authCode6;
            if (this.authCode === Number(authCode)) {
                this.$toast.center('登陆成功');
                this.$router.push('/home');
            } else {
                this.$toast.center("验证码输入错误");
            }
        },

        goBack: function () {
            if (this.showAuthCode) {
                this.showAuthCode = false;
                return;
            }
            this.$router.go(-1);
        }
    }
}
</script>

<style>
.ptb0 {
    padding: 0 16px;
}

.textCenter {
    text-align: center;
}

.textBoder {
    width: 35px;
    border: 1px solid #959595;
    margin: 0 2px;
    padding: 0;
}

.center {
    margin: 0 auto;
    font-size: inherit;
}

.codeDesc {
    font-size: 22px;
}

.describe {
    text-align: center;
    color: #959595;
    position: fixed;
    bottom: 15px;
}

.logoBtn {
    height: 56px;
    border-radius: 30px;
    font-size: 20px;
}
    
</style>
