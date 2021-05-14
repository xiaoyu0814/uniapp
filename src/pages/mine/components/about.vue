<template>
	<view id="about">
		<view class="about_induct">
			<text class="about_content">航天宏图是一家专业从事卫星（遥感卫星、导航卫星）技术研究与应用和大气海洋信息化服务的国家高新技术企业。公司成立于2008年，依托中国航天的雄厚优势，以国产卫星专业服务与行业应用为使命，聚焦遥感、导航等核心技术，自主研发PIE（Pixel Information Expert）系列产品，为行业用户提供空间信息应用整体解决方案。公司总部坐落于北京，现有员工1000余人，其中技术人员占比80%以上。拥有国家级专家头衔、高级职称、博士硕士学位组成的研发团队，技术力量雄厚。自主研发的PIE软件是中国政府采购名录中遥感类软件产品，在大气海洋、水利环保、减灾应急、国土测绘等10余个行业得到广泛应用。</text>
		</view>
		<view class="footer">
			<view class="footer_item">
				<text>当前版本</text>
				<text style="color: #b9b9b9;">{{version}}</text>
			</view>
			<view class="footer_item">
				<text>联系我们</text>
				<text style="color: #b9b9b9;">400-890-0662</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version: "6.1.1"
			};
		},
		methods: {},
		onShow() {
		
			this.version = plus.runtime.version;
		}
	};
</script>

<style scoped>
	#about {
		position: relative;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: #f5f5f5;
		height: 100vh;
		overflow: auto;
	}

	.about_induct {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem 1.5rem 0;
		border-bottom: 0.3rem solid #eee;
		background-color: #fff;
		margin-top: 0.3rem;
	}

	.about_induct .about_content {
		font-size: 1rem;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 2rem;
	}

	.footer_item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		font-size: 12px;
		background-color: #fff;
		border-bottom: 1px solid #f5f5f5;
	}
</style>
