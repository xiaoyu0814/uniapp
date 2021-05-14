<template>
	<view id="resetPassword">
		<view class="title">重置密码</view>
		<view class="input_box">
			<input v-model="tel" class="uni-input" focus placeholder="请输入手机号" />
		</view>
		<view class="input_box">
			<input v-model="verification" class="uni-input" placeholder="获取验证码" />
			<text class="getCode_botton" v-if="getCode_show" @click="getVerification()">获取验证码</text>
			<text class="getCode_botton" v-if="!getCode_show">{{second}}s重新发送</text>
		</view>
		<view class="input_box">
			<input v-model="password" class="uni-input" :password="password_show" placeholder="请输入密码(6-20位字母数字组合)" />
			<text class="iconfont" :class="password_show?'':'iconColor'" @click="password_show_fun">&#xe84b;</text>
		</view>
		<view class="input_box">
			<input v-model="confirmPassword" class="uni-input" :password="confirmPassword_show" placeholder="请再次输入密码(6-20位字母数字组合)" />
			<text class="iconfont" :class="confirmPassword_show?'':'iconColor'" @click="confirmPassword_show_fun">&#xe84b;</text>
		</view>
		<view class="botton_box">
			<button type="primary" @click="resetPwd()">重置密码</button>
		</view>
		<view class="other_box">
			<text @click="goTo_userLogin">账号密码登录</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				second: 60,
				getCode_show: true,
				password_show: true,
				confirmPassword_show: true,
				tel: "",
				verification: "",
				password: "",
				confirmPassword: "",
			}
		},
		methods: {
			goTo_userLogin() {
				uni.navigateTo({
					url: "/pages/login/userLogin",
					animationType: 'fade-in'
				});
			},
			password_show_fun() {
				this.password_show = !this.password_show;
			},
			confirmPassword_show_fun() {
				this.confirmPassword_show = !this.confirmPassword_show;
			},
			getVerification() {
				let regex = /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
				if (!this.tel) {
					uni.showToast({
						icon: "none",
						title: "请输入手机号"
					});
				} else if (!regex.test(this.tel)) {
					uni.showToast({
						icon: "none",
						title: "手机号格式有误"
					});
				} else {
					this.getCode_show = false;
					let interval = setInterval(() => {
						this.second--;
						if (this.second == 0) {
							clearInterval(interval);
							this.second = 60;
							this.getCode_show = true;
						};
					}, 1000);
					let params = {
						tel: this.tel
					};
					this.$http.getCodeByTel(params).then(res => {
						uni.showToast({
							icon: "none",
							title: res.data.message
						});
					}).catch(err => {
						uni.showToast({
							icon: "none",
							title: err
						});
					});
				}
			},
			resetPwd() {
				//登录
				let regex = /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
				if (!this.tel) {
					uni.showToast({
						icon: "none",
						title: "请输入手机号"
					});
				} else if (!regex.test(this.tel)) {
					uni.showToast({
						icon: "none",
						title: "手机号格式有误"
					});
				} else {
					let params = {
						tel: this.tel,
						captcha: this.verification,
						pwd: this.password,
						conPwd: this.confirmPassword,
						isMd5: false
					};
					this.$http.updatePwdByTel(params).then(res => {
						if (res.data.success) {
							setTimeout(()=>{
								uni.navigateTo({
									url: "/pages/login/userLogin",
									animationType: 'fade-in'
								});
							},3000)
						}
						uni.showToast({
							icon: "none",
							title: res.data.message
						});
					}).catch(err => {
						uni.showToast({
							icon: "none",
							title: err
						});
					});
				}
			},
		},
		onLoad() {}
	}
</script>

<style lang="scss">
	#resetPassword {
		padding: 40rpx;
		background-color: #f4f8f4;
		min-height: 100vh;
		padding-top: 160rpx;
		box-sizing: border-box;
	}

	.title {
		font-size: 20px;
		margin-bottom: 100rpx;
	}

	.input_box {
		margin-bottom: 60rpx;
		border-bottom: 1px solid #ccc;
		padding: 10rpx;
		position: relative;
	}

	.getCode_botton {
		position: absolute;
		right: 20rpx;
		bottom: 6rpx;
		border-radius: 4px;
		padding: 10rpx 20rpx;
		font-size: 14px;
		background-color: #007aff;
		color: #fff;
		border: 1px solid #007aff;
	}

	.botton_box {
		padding-top: 100rpx;
	}

	.other_box {
		text-align: right;
		padding: 40rpx 0;
		font-size: 12px;
		color: #00aaff;
	}

	.iconfont {
		position: absolute;
		right: 10rpx;
		z-index: 1;
		bottom: 20rpx;
		font-size: 40rpx;
	}

	.iconColor {
		color: #00aaff;
	}
</style>
