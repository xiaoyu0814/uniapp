<template>
	<view class="editPage">
		<view class="editPage_list">
			<view class="editPage_list_first border_bottom" @click="uploadImg">
				<text class="editPage_list_text">头像</text>
				<view class="editPage_list_head">
					<image class="editPage_list_image" :src="userIofo.img"></image>
					<text class="iconfont">&#xe624;</text>
				</view>
			</view>
			<view class="editPage_list_second border_bottom">
				<text>手机号码</text>
				<view>
					<text>{{userIofo.tel}}</text>
				</view>
			</view>
			<view class="editPage_list_third border_bottom" @click="open">
				<text>姓名</text>
				<view>
					<text>{{userIofo.name}}</text>
					<text class="iconfont" style="height: 30px;">&#xe624;</text>
				</view>
				<uni-popup ref="popup" type="dialog">
					<uni-popup-dialog type="input" message="成功消息" :duration="2000" title="修改姓名" placeholder="请输入姓名" mode="input"
					 :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
				</uni-popup>
			</view>
			<view class="editPage_list_third border_bottom" @click="select">
				<text>性别</text>
				<view>
					<text>{{userIofo.sex==0?'男':'女'}}</text>
					<text class="iconfont">&#xe624;</text>
				</view>
			</view>
		</view>
		<view class="signOut_box">
			<text class="signOut" @click="logout">退出登录</text>
		</view>
	</view>
</template>

<script>
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		data() {
			return {
				userIofo: {
					img: "",
					tel: "",
					name: "",
					sex: ""
				}
			}
		},
		components: {
			uniPopupDialog
		},
		methods: {
			open() {
				this.$refs.popup.open()
			},
			select() {
				uni.showActionSheet({
					popover: {
						top: 200,
						height: 100
					},
					title: '性别',
					itemList: ['男', '女'],
					confirmText: '确定',
					success: (res) => {
						let params = {
							id: this.$storage.getStorage("userId"),
							sex: res.tapIndex
						}
						this.$http.updateUser(params).then(res => {
							if (res.data.success) {
								this.getuserIofo()
								done()
							}
						})
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			/**
			 * 点击取消按钮触发
			 * @param {Object} done
			 */
			close(done) {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
				// ...
				done()
			},
			/**
			 * 点击确认按钮触发
			 * @param {Object} done
			 * @param {Object} value
			 */
			confirm(done, value) {
				// 输入框的值
				console.log(value)
				// TODO 做一些其他的事情，手动执行 done 才会关闭对话框
				let params = {
					id: this.$storage.getStorage("userId"),
					nickname: value
				}
				this.$http.updateUser(params).then(res => {
					if (res.data.success) {
						setTimeout(()=>{
							this.getuserIofo();
						},1000)
						done()
					}
				})
			},
			getuserIofo() {
				this.$http.queryUserByToken().then(res => {
					if (res.data.success) {
						this.userIofo.name = res.data.data.nickname;
						this.userIofo.tel = res.data.data.contactInfo;
						this.userIofo.img = res.data.data.img;
						this.userIofo.sex = res.data.data.sex;
					}
				})
			},
			uploadImg() {
				uni.chooseImage({
					count: 1, //上传图片的数量，默认是9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: 'https://engine.piesat.cn/dev/account/api/sys/user/updateUser', //post请求的地址
							filePath: tempFilePaths[0],
							name: 'file',
							header:{
								'Authorization': this.$storage.getStorage('token')
							},
							formData: {
								'id': this.$storage.getStorage("userId"),
							},
							success: (uploadFileRes) => {
								//这里要注意，uploadFileRes.data是个String类型，要转对象的话需要JSON.parse一下
								var obj = JSON.parse(uploadFileRes.data);
								setTimeout(()=>{
									this.getuserIofo();
								},1000)
								
							}
						})
					}
				});
			},
			logout(){
				this.$http.logout().then(res=>{
					if(res.data.success){
						this.$storage.clearCloneStorage("userName");
						this.$storage.clearCloneStorage("userId");
						this.$storage.clearCloneStorage("token");
						uni.showToast({
							icon: "none",
							title: "退出成功"
						});
						uni.switchTab({
							url: "../../index/index"
						});
					}
				})
			}
		},
		onLoad() {
			this.getuserIofo();
		}
	}
</script>

<style>
	.editPage {
		background-color: rgb(246, 246, 246);
		min-height: 100vh;
		padding-top: 10px;
	}

	.editPage_list {
		background-color: rgb(255, 255, 255);
		/* display: flex;
		flex-direction: column; */
	}

	.border_bottom {
		border: 1px solid rgb(243, 243, 243);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 30rpx;
	}

	.border_bottom:last-child {
		border-bottom: none
	}

	.editPage_list_head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		justify-content: center;
	}

	.editPage_list_image {
		width: 35px;
		height: 35px;
		border-radius: 100px;
		margin: 5px;
	}

	.editPage_list_text {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.iconfont {
		padding: 0 10rpx 0 30rpx;
	}

	.signOut_box {
		display: flex;
		margin-top: 20rpx;
		background-color: rgb(255, 255, 255);
	}

	.signOut {
		margin: auto;
		padding: 30rpx;
	}

	.uni-button-color {
		color: rgb(237, 31, 75);
	}
</style>
