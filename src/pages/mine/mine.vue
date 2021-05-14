<template>
	<view class="my">
		<view class="boxs">
			<view class="box_one">
				<view class="heaPortrait">
					<image class="heaPorImage" :src="img"></image>
				</view>
				<text class="name">{{username}}</text>
				<view class="edit">
					<text class="iconfont_edit iconfont">&#xe63b;</text>
					<text class="edit_text" @click="editProfile()">编辑资料</text>
				</view>
				<view class="userMassage">
					<text class="userMassage_phone">{{mobile}}</text>
					<text class="userMassage_border"></text>
					<view class="userMassage_text">
						<text>已使用</text>
						<text style="color:rgb(83,125,242);">{{usage}}</text>
						<text>GB/{{totalStorage}}GB</text>
						<view class="progress-box">
							<progress :percent="percent" active stroke-width="3" style="width: 80%" />
						</view>
					</view>
				</view>
			</view>
			<view class="tool_list">
				<view class="toolList_box" v-for="(item,index) in boxTowList" :key="index" @click="getTool(item)">
					<view class="toolLlist_item">
						<image class="item_image" :src="item.img"></image>
						{{item.label}}
					</view>
				</view>
			</view>
		</view>
		<view class="apply" v-if="false">
			<view v-for="(item,index) in applysList" :key="index" class="workGro border_right" @click="goToApplys(item)">
				<image class="apply_image" :src="item.img">
					<view>{{item.label}}</view>
			</view>
		</view>
		<view class="applyBox">
			<view class="applyBox_item ">
				<view class="applyBox_list border_bottom" v-for="(item,index) in applyList" :key="index" @click="goToapply(item)">
					<view class="applyBox_list_item">
						<image class="applyBox_list_image" :src="item.img"></image>
						<text style="padding: 0 20px;">{{item.label}}</text>
					</view>
					<view>
						<text class="iconfont" style="height: 30px;">&#xe624;</text>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-padding-wrap">
			<swiper-banner :fromTo="'my-banner'"></swiper-banner>
		</view>
		<view class="applyBox" style="padding-bottom: 20px;">
			<view class="applyBox_item ">
				<view class="applyBox_list border_bottom" v-for="(item,index) in applyList1" :key="index" @click="goToWe(item)">
					<view class="applyBox_list_item">
						<image class="applyBox_list_image" :src="item.img"></image>
						<text style="padding: 0 20px;">{{item.label}}</text>
					</view>
					<view>
						<text class="iconfont" style="height: 30px;">&#xe624;</text>
					</view>
				</view>
			</view>
		</view>
		<view class="updata">
			<!-- <vastwu-saveimg :imgListprop="photo_list" :num='9' :isBase64='true' :isSave='true' :size='180' @chooseImage='imglist_msg'  @delImg='del_imglist_msg'></vastwu-saveimg> -->
			<ss-upload-image :url="url" :file-list="fileList" :name="name" :header="header" @on-success="onSuccess" @on-error="onError_a" @on-remove="onRemove" @on-process="onProcess" />
		</view>
	</view>
</template>

<script>
	import swiperBanner from "@/components/swiper/swiper.vue"
	import vastwuSaveimg from '@/components/vastwu-saveimg/vastwu-saveimg.vue'
	import ssUploadImage from '@/components/ss-upload-image/ss-upload-image.vue'
	
	export default {
		components: {
			swiperBanner,
			vastwuSaveimg,
			ssUploadImage
		},
		data() {
			return {
				mode: 'widthFix',
				username: " ",
				mobile: 15888888888,
				usage: 30,
				totalStorage: 250,
				percent: 0,
				img: ' ',
				boxTowList: [{
						label: '消息',
						img: "../../static/message.png",
						router: "/pages/index/news-page"
					},
					{
						label: '收藏',
						img: "../../static/collection.png",
						router: "/pages/mine/components/collection",
					},
					{
						label: '积分',
						img: "../../static/integral.png",
						router: ""
					},
					{
						label: '签到',
						img: "../../static/follow.png",
						router: "/pages/mine/components/ImportCalendar"
					}
				],
				// applysList: [{
				// 	label: '工作小组',
				// 	img: "../../static/工作小组.png",
				// 	router: ""
				// }, {
				// 	label: '我的任务',
				// 	img: "../../static/我的任务.png",
				// 	router: ""
				// }],
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 1000,
				swiper_list: [{
						imageUrlApp: "../../static/专属福利.png"
					},
					{
						imageUrlApp: "../../static/专属福利.png"
					},
					{
						imageUrlApp: "../../static/专属福利.png"
					}
				],
				applyList: [{
						label: '数据资源',
						img: "../../static/dataResources.png",
						router: "/pages/mine/components/contact"
					}, {
						label: '在线帮助',
						img: "../../static/onlineHelp.png",
						router: "/pages/mine/components/contact"
					}, {
						label: '遥感课堂',
						router: "",
						img: "../../static/remoteSense.png",
					},
					{
						label: '人才招聘',
						router: "/pages/mine/components/contact",
						img: "../../static/talentRecruitment.png",
					},
					{
						label: '积分商城',
						router: "/pages/mine/components/contact",
						img: "../../static/pointsMall.png",
					},
					{
						label: '运营数据',
						router: "/pages/mine/components/contact",
						img: "../../static/operationData.png",
					},
				],
				applyList1: [{
					label: '联系我们',
					router: "/pages/mine/components/contact",
					img: "../../static/contact.png",
				}, {
					label: '关于我们',
					router: "",
					img: "../../static/aboutUs.png",
				}],
				router: '/pages/mine/components/editProfile',
				fileList: [],
				name:"file",
				url:"https://engine.piesat.cn/dev/account/api/sys/user/updateUser",
				header:{
					'Authorization': this.$storage.getStorage('token')
				}
			}
		},
		methods: {
			getDetails() {
				this.$http.details().then(res => {
					if (res.data.code == 0) {
						this.usage = parseInt(res.data.data.useStorage / 1024 / 1024 / 1024)
						this.percent = (this.usage / this.totalStorage) * 100
					}
				})
			},
			getTool(item) {
				if (item.label == "消息" || item.label == "收藏") {
					uni.navigateTo({
						url: item.router,
						animationType: 'fade-in'
					});
				} else if (item.label == "积分") {
					this.$http.credits().then(res=>{
						if(res.data.code == 0){
							uni.showToast({
								title: '当前积分：' + res.data.data.currentIntegral,
							});
						}
					})
				} else if (item.label == "签到" || item.label == "已签到") {
					uni.navigateTo({
						url: item.router,
						animationType: 'fade-in'
					});
				}
			},
			goToApplys(item) {
				if (item.label == "工作小组") {

				} else if (item.label == "我的任务") {

				} else {
					uni.navigateTo({
						url: item.router + "?name=" + item.label,
						animationType: 'fade-in'
					});
				}
			},
			goToapply(item) {
				if (item.label == "遥感课堂") {
				if(this.$storage.getStorage('liveShowCtrl')){
				let url = "https://engine.piesat.cn/live-show-list?mobile=true&token="+ this.$storage.getStorage("token");
				plus.runtime.openURL(url);
					
				} else {
					uni.showToast({
						title:"该功能正在建设中",
						icon:"none"
					})
				}
				} else {
					uni.navigateTo({
						url: item.router + "?name=" + item.label,
						animationType: 'fade-in'
					});
				}
			},
			goToWe(item) {
				if (item.label == "联系我们") {
					uni.navigateTo({
						url: item.router + "?name=" + item.label,
						animationType: 'fade-in'
					});
				} else if (item.label == "关于我们") {
					uni.navigateTo({
						url: "/pages/mine/components/about",
						animationType: 'fade-in'
					});
				}
			},
			getUserName() {
				this.$http.queryUserByToken().then(res => {
					if (res.data.success) {
						this.username = res.data.data.username;
						this.mobile = res.data.data.mobile;
						this.img = res.data.data.img;
					}
				})
			},
			editProfile() {
				uni.navigateTo({
					url: this.router,
					animationType: 'fade-in'
				});
			},
			checkdSign() {
				this.$http.checkSign().then(res => {
					if (res.data.data) {
						for (let i = 0; i < this.boxTowList.length; i++) {
							if (this.boxTowList[i].label == "签到") this.boxTowList[i].label = "已签到";
						}
					}
				})
			},
			imglist_msg(){
				
			},
			del_imglist_msg(){
				
			},
			onSuccess(success){
				console.log(success)
				
			},
			onError_a(error){
				console.log(error)
			},
			onRemove(remove){
				console.log(this.fileList)
				console.log(remove)
			},
			onProcess(processa){
				console.log(processa)
			},
		},
		onShow() {
			this.getUserName();
			this.checkdSign();
			this.getDetails();
		}
	}
</script>

<style>
	.my {
		background-color: rgb(246, 246, 246);
		min-height: 100vh;
		padding-top: 126px;
		background-image: url(../../static/myBG.png);
		background-repeat: no-repeat;
		background-size: 100% 20%;
	}

	.boxs {
		width: 90%;
		height: 200px;
		display: flex;
		flex-direction: column;
		border-radius: 15px;
		margin-left: 5%;
		margin-bottom: 40rpx;
		background-color: rgb(255, 255, 255);
	}

	.box_one {
		height: 60%;
		background-color: #55557f00;
		border-radius: 15px;
		width: 100%;
		position: relative;
		display: flex;
	}

	.edit {
		width: 90px;
		height: 25px;
		border-radius: 15px;
		text-align: center;
		position: absolute;
		right: 10px;
		top: 10px;
		background-color: rgb(255, 234, 221);
	}

	.iconfont_edit {
		padding: 5px;
		color: rgb(217, 115, 77);
	}

	.edit_text {
		font-size: 12px;
		color: rgb(221, 124, 88);
	}

	.heaPortrait {
		display: block;
		padding: 5px;
		width: 80px;
		height: 80px;
		border-radius: 100000px;
		position: absolute;
		left: 50%;
		margin-left: -40px;
		margin-top: -40px;
		overflow: hidden;
		background-color: #fff;
		box-sizing: border-box;
	}

	.heaPorImage {
		width: 100%;
		height: 100%;
		border-radius: 100000px;
	}

	.name {
		/* position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -30px;
		align-items: center; */
		margin: auto;
	}

	.userMassage {
		border-bottom: 1px solid rgb(243, 243, 243);
		display: flex;
		flex-direction: row;
		position: absolute;
		top: 70%;
		align-items: center;
		width: 100%;
		padding: 5px;
	}

	.userMassage_phone {
		text-align: right;
		width: calc(50% - 0.5px);
	}

	.userMassage_border {
		border-right: 1px solid rgb(243, 243, 243);
		height: 14px;
		margin: 0 15px;
	}

	.userMassage_text {
		width: calc(50% - 0.5px);
		font-size: 12px;
	}

	.toolList_box {
		width: 100%;
		display: flex;
		background-color: #4CD96400;
	}

	.toolLlist_item {
		width: 100%;
		height: 100%;
		background-color: #2C405A00;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 12px;
	}

	.item_image {
		width: 40px;
		height: 40px;
		border-radius: 100px;
		margin: 5px;
	}

	.apply {
		width: 90%;
		height: 100px;
		background-color: rgb(255, 255, 255);
		border-radius: 15px;
		margin: 20px;
		display: flex;
		margin-left: 5%;
	}

	.apply_image {
		width: 35px;
		height: 35px;
		border-radius: 100px;
		margin: 5px;
	}

	.border_right {
		border-right: 1px solid rgb(243, 243, 243);
		margin: 5px;
		/* margin: 10px 0 10px 5px; */
		padding: 10px 0;
		text-align: center;
		font-size: 12px;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.onlinehelp {
		border-right: none;
		margin-right: 10px;
	}

	.uni-padding-wrap {
		width: 100%;
		background-color: rgb(255, 255, 255);
		width: 90%;
		height: 150px;
		border-radius: 15px;
		margin: 20px;
		display: flex;
		margin-left: 5%;
		overflow: hidden;
	}

	.applyBox_item {
		width: 90%;
		/* height: 300px; */
		background-color: rgb(255, 255, 255);
		display: flex;
		flex-direction: column;
		border-radius: 15px;
		margin-left: 5%;
		justify-content: space-between;
	}

	.applyBox_list {
		align-items: center;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 10px 10px;
	}

	.border_bottom {
		border-bottom: 1px solid rgb(243, 243, 243);
		display: flex;
	}

	.border_bottom:last-child {
		border-bottom: none;
	}

	.applyBox_list_item {
		display: flex;
		align-items: center;
	}

	.applyBox_list_image {
		width: 40px;
		height: 40px;
		border-radius: 100px;
		margin: 5px;
	}

	.border_right:last-child {
		border-right: none;
	}

	.tool_list {
		display: flex;
	}

	.applys_list {
		display: flex;
	}
</style>
