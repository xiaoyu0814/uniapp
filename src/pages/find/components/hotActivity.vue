<template>
	<view id="hotActivity">
		<view class="introduce">
			<text class="introduce_title">2021年宏图杯开发大赛，重磅启幕！火热报名中</text>
			<image class="news_image" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg" style="width: 100%;"></image>
			<view class="news">
				<text class="iconfont">&#xe643;</text>
				图1.宏图大厦鸟瞰图
			</view>
			<text class="content">近日，航天宏图研发的全面国产化安全可靠的PIE遥感图像处理软件继入驻华为技术有限公司的华为严选商城后，又与华为云完成了鲲鹏兼容性测试，并获HUAWEI COMPATIBLE 证书及认证徽标，成为首个完成该项测试的遥感软件厂商。此次PIE快速兼容鲲鹏生态，为华为鲲鹏生态用户注入了新鲜血液。</text>
			<image class="news_image" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg" style="width: 100%;"></image>
			<view  class="news">
				<text class="iconfont">&#xe643;</text>
				图1.宏图大厦鸟瞰图
			</view>
			<text class="content"> 随着Cloud 2.0时代的到来，“5G+云+AI”发展模式快步向前，企业成为了云化主角，但云计算、智能终端等新市场的打开，对信息安全产生了一定的威胁，因此，安全可靠的国产多元化云服务架构及信息系统技术支持平台是解决国家安全及云化市场需求的根本途径。2019年7月，华为基于高性能、高吞吐、高集成、高能效的64核数据中心处理器—鲲鹏920推出鲲鹏云服务和解决方案，开启云上的多元新架构。着眼于行业趋势与应用需求，企业上云已是大势所趋。</text>
		</view>
		<view class="signUp">
			<view class="signUp_title">立即报名</view>
			<view class="table_box">
				<view class="table_name">选手姓名</view>
				<input class="uni-input" confirm-type="search" />
			</view>
			<view class="table_box">
				<view class="table_name">手机号码</view>
				<input class="uni-input" confirm-type="search" />
			</view>
			<view class="table_box">
				<view class="table_name">参赛形式</view>
				<radio-group @change="radioChange">
					<label v-for="(item, index) in items" :key="item.value" style="margin-right: 40rpx;">
						<radio :value="item.value"/>
						<text>{{item.name}}</text>
					</label>
				</radio-group>
			</view>
			<view>
				<view class="table_name">作品简介</view>
				<view class="textarea_box">
					<textarea @blur="bindTextAreaBlur" style="height: 200rpx;" />
				</view>
			</view>
			<view class="enroll">
				<button type="primary">报名</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				formOfCompetition:true,
				items: [{
						value: 'one',
						name: '个人'
					},
					{
						value: 'tame',
						name: '团队',
					}
				],
			}
		},
		methods:{
			radioChange: function(value){
		
				this.formOfCompetition = !this.formOfCompetition
			},
			bindTextAreaBlur: function (e) {
			}

		}
	}
</script>

<style lang="scss" scoped>
	#hotActivity{
		background-color: #F9F9F9;
	}
	.introduce{
		padding: 40rpx;
		background-color: #fff;
	}
	.introduce_title{
		font-size: 40rpx;
		font-weight: bold;
		padding-bottom: 20px;
	}
	.signUp{
		padding: 40rpx;
		background-color: #fff;
		margin-top: 40rpx;
	}
	.signUp_title{
		text-align: center;
		font-size: 40rpx;
		font-weight: bold;
	}
	.table_name{
		padding: 20px 0 15px 0;
		color: #9fb3cc
	}
	.table_box{
		padding: 10rpx 0;
		border-bottom: 1px solid rgb(232,236,243);
	}
	.textarea_box{
		border: 1px solid rgb(232,236,243);
		border-radius: 10rpx;
		padding: 10rpx;
	}
	.table_box:last-child{
		border-bottom:none
	}
	.news {
		padding: 5px 5px 10px 5px;
		color: rgb(153,153,153);
	}
	.iconfont{
		padding:0 7px 7px 0;
		color: rgb(153,153,153);
		
	}
	.news_image{
		padding-top: 30px;
	}
	.content{
		// display: block;
		line-height: 30px;
	}
	.enroll {
		width: 150px;
		margin: 20px auto; 
		text-align: center
		
	}
</style>
