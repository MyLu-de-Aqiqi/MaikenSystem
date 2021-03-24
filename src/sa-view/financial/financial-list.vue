<style scoped>
	.vue-box{margin: 0; padding: 0; height: 100%;}
	.el-card{border-radius: 0px; border: 1px #ddd solid ; margin-bottom: 14px;}
	.s-row{/* background-color: antiquewhite; */ padding: 0 14px; padding-bottom: 0px;}
	.s-row-1{padding-top: 14px;}
	.s-row-2{/* margin-top: -10px; */}
	.s-row-2 .el-card .el-card__body{height: 250px;}
	.s-row-3 .el-card{/* height: 100%; */}
	/* 绗竴琛� */
	.sa-wnk{background-color: #FFF; border: 1px #ddd solid; margin-bottom: 14px; min-height: 100px;width: 300px;
		cursor: pointer; transition: all 0.3s; overflow: hidden;}
	.sa-wnk:hover{box-shadow: 0 0 20px #999;}
	.sa-wnk img{float: left; line-height: 80px; margin: 25px 0px 0 20px; width: 50px; height: 50px; vertical-align: middle;}
	.sa-wnk .sa-wnk-tv{float: left; margin-left: 10px; max-width: calc(100% - 100px);}
	.sa-wnk-title{margin-top: 25px; font-size: 16px;}
	.sa-wnk-value{margin-top: 4px; font-size: 24px; padding-bottom: 20px;}
	/* 绗簩琛� */
	.echarts-div{height: 80%;}
	/* 绗笁琛� */
	.s-row-3 .btn-box{margin-bottom: 4px; }
	.s-row-3 .btn-box .el-button{margin-bottom: 10px; }
	.s-row-3 .el-alert{margin-bottom: 14px;}

	.el-timeline-item__timestamp { color: #207EFF;}
	.vue-box .el-timeline-item__content{color: #666;}
</style>

<template>
	<div class="vue-box">
		<div class="c-panel">
<!--			<link rel="stylesheet" href="https://unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css">-->

			<!-- 第一栏 -->
			<div class="s-row s-row-1">
				<el-row :gutter="14">
					<el-col :lg="4" :sm="8" :xs="24">
						<div class="sa-wnk">
							<img src="../../sa-resources/img/icon-order.png" >
							<div class="sa-wnk-tv">
								<p class="sa-wnk-title">今日进货流水</p>
								<p class="sa-wnk-value">{{todayMoney.inDayFinancial}} 元</p>
							</div>
						</div>
					</el-col>
					<el-col :lg="4" :sm="8" :xs="24">
						<div class="sa-wnk">
							<img src="../../sa-resources/img/icon-goods.png" >
							<div class="sa-wnk-tv">
								<p class="sa-wnk-title">本月进货流水</p>
								<p class="sa-wnk-value">{{todayMoney.inMonthFinancial}} 元</p>
							</div>
						</div>
					</el-col>
					<el-col :lg="4" :sm="8" :xs="24">
						<div class="sa-wnk">
							<img src="../../sa-resources/img/icon-money.png" >
							<div class="sa-wnk-tv">
								<p class="sa-wnk-title">今年进货流水</p>
								<p class="sa-wnk-value">{{todayMoney.inYearFinancial}} 元</p>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>

			<div class="s-row s-row-1">
				<el-row :gutter="14">
					<el-col :lg="4" :sm="8" :xs="24">
						<div class="sa-wnk">
							<img src="../../sa-resources/img/icon-order.png" >
							<div class="sa-wnk-tv">
								<p class="sa-wnk-title">今日出货流水</p>
								<p class="sa-wnk-value">{{todayMoney.outDayFinancial}} 元</p>
							</div>
						</div>
					</el-col>
					<el-col :lg="4" :sm="8" :xs="24">
						<div class="sa-wnk">
							<img src="../../sa-resources/img/icon-goods.png" >
							<div class="sa-wnk-tv">
								<p class="sa-wnk-title">本月出货流水</p>
								<p class="sa-wnk-value">{{todayMoney.outMonthFinancial}} 元</p>
							</div>
						</div>
					</el-col>
					<el-col :lg="4" :sm="8" :xs="24">
						<div class="sa-wnk">
							<img src="../../sa-resources/img/icon-money.png" >
							<div class="sa-wnk-tv">
								<p class="sa-wnk-title">今年出货流水</p>
								<p class="sa-wnk-value">{{todayMoney.outYearFinancial}} 元</p>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>

			<div class="s-row s-row-1">
				<el-row :gutter="14">
					<el-col :lg="4" :sm="8" :xs="24">
						<div class="sa-wnk">
							<img src="../../sa-resources/img/icon-order.png" >
							<div class="sa-wnk-tv">
								<p class="sa-wnk-title">今日毛利润</p>
								<p class="sa-wnk-value">{{todayMoney.dayGrossProfit}} 元</p>
							</div>
						</div>
					</el-col>
					<el-col :lg="4" :sm="8" :xs="24">
						<div class="sa-wnk">
							<img src="../../sa-resources/img/icon-goods.png" >
							<div class="sa-wnk-tv">
								<p class="sa-wnk-title">本月毛利润</p>
								<p class="sa-wnk-value">{{todayMoney.monthGrossProfit}} 元</p>
							</div>
						</div>
					</el-col>
					<el-col :lg="4" :sm="8" :xs="24">
						<div class="sa-wnk">
							<img src="../../sa-resources/img/icon-money.png" >
							<div class="sa-wnk-tv">
								<p class="sa-wnk-title">今年毛利润</p>
								<p class="sa-wnk-value">{{todayMoney.yearGrossProfit}} 元</p>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>



<!--			&lt;!&ndash; 参数栏 &ndash;&gt;-->
<!--			<div>-->
<!--				<div style="float: left">-->
<!--					<div>-->
<!--						<el-tag type="success" style="width: 200px;height: 80px;font-size: large;text-align: center;line-height: 80px">今日流水</el-tag>-->
<!--					</div>-->
<!--					<div>-->
<!--						<el-tag type="success" style="width: 200px;height: 80px;font-size: large;text-align: center;line-height: 80px">{{todayMoney.dayFinancial}} 元</el-tag>-->
<!--					</div>-->
<!--				</div>-->

<!--				<div style="float: left">-->
<!--					<div>-->
<!--						<el-tag type="success" style="width: 200px;height: 80px;font-size: large;text-align: center;line-height: 80px">本月流水</el-tag>-->
<!--					</div>-->
<!--					<div>-->
<!--						<el-tag type="success" style="width: 200px;height: 80px;font-size: large;text-align: center;line-height: 80px">{{todayMoney.monthFinancial}} 元</el-tag>-->
<!--					</div>-->
<!--				</div>-->

<!--				<div style="float: left">-->
<!--					<div>-->
<!--						<el-tag type="success" style="width: 200px;height: 80px;font-size: large;text-align: center;line-height: 80px">今年流水</el-tag>-->
<!--					</div>-->
<!--					<div>-->
<!--						<el-tag type="success" style="width: 200px;height: 80px;font-size: large;text-align: center;line-height: 80px">{{todayMoney.yearFinancial}} 元</el-tag>-->
<!--					</div>-->
<!--				</div>-->
<!--			</div>-->

<!--			<div style="margin-top: 180px"></div>-->


<!--			账目记录-->
			<div class="c-title" style="margin-top: 20px;float: none">检索参数</div>
			<el-form size="mini" :inline="true" @submit.native.prevent >
				<el-form-item label="名称查询：">
					<el-input v-model="p.keyword" placeholder="模糊查询"></el-input>
				</el-form-item>
				<el-form-item style="min-width: 0px;">
					<el-button type="primary" icon="el-icon-search" @click="p.current = 1; f5()">查询</el-button>
<!--					<el-button type="primary" icon="el-icon-plus" @click="add()">添加</el-button>-->
				</el-form-item>
			</el-form>
			<!-- 数据列表 -->
			<div class="c-title" style="margin-top: 20px">数据列表</div>
			<el-table :data="dataList" size="mini">
<!--				<el-table-column label="id" prop="id" width="70px"></el-table-column>-->
				<el-table-column label="创建时间" prop="createTime"></el-table-column>
				<el-table-column label="财务情况">
					<template slot-scope="s">
						<b style="color: green;" v-if="s.row.stockFlag==0">进货</b>
						<b style="color: red;" v-if="s.row.stockFlag==1">出货</b>
					</template>
				</el-table-column>
				<el-table-column label="品名" prop="name"></el-table-column>
				<el-table-column label="数量" prop="count"></el-table-column>
				<el-table-column label="单价" prop="price"></el-table-column>
				<el-table-column label="总价" prop="total"></el-table-column>
<!--				<el-table-column label="总价12" >{{s.row.price}} * {{s.row.count}}</el-table-column>-->
<!--				<el-table-column label="备注" prop="remark"></el-table-column>-->
<!--				<el-table-column label="显示头像">-->
<!--					<template slot-scope="s">-->
<!--						<img :src="s.row.avatar" style="width: 3em; height: 3em; border-radius: 4px; cursor: pointer;" -->
<!--							@click="sa.showImage(s.row.avatar, '400px', '400px')" />-->
<!--					</template>-->
<!--				</el-table-column>-->
<!--				<el-table-column label="显示图标">-->
<!--					<template slot-scope="s">-->
<!--						<i :class="s.row.icon" style="font-size: 1.3em;"></i>-->
<!--					</template>-->
<!--				</el-table-column>-->
<!--				<el-table-column label="显示价格" >-->
<!--					<template slot-scope="s">-->
<!--						<b style="color: red; ">￥{{s.row.money / 100}}</b>-->
<!--					</template>-->
<!--				</el-table-column>-->
<!--				<el-table-column label="显示状态">-->
<!--					<template slot-scope="s">-->
<!--						<b style="color: green;" v-if="s.row.status==1">正常</b>-->
<!--						<b style="color: red;" v-if="s.row.status==2">禁用</b>-->
<!--					</template>-->
<!--				</el-table-column>-->
				<!-- <el-table-column label="显示状态">
					<template slot-scope="s">
						<el-tag class="c-tag" effect="dark" size="mini" color="#282" v-if="s.row.status==1">正常</el-tag>
						<el-tag class="c-tag" effect="dark" size="mini" color="#f22" v-if="s.row.status==2">禁用</el-tag>
					</template>
				</el-table-column> -->
<!--				<el-table-column label="显示开关">-->
<!--					<template slot-scope="s">-->
<!--						<el-switch v-model="s.row.status" :active-value="1" :inactive-value="2" inactive-color="#ff4949"></el-switch>-->
<!--						<span style="color: #999;" v-if="s.row.status==1">正常</span>-->
<!--						<span style="color: #999;" v-else>禁用</span>-->
<!--					</template>-->
<!--				</el-table-column>-->
<!--				<el-table-column label="显示日期" width="170px">-->
<!--					<template slot-scope="s"><span>{{sa.forDate(s.row.create_time, 2)}}</span></template>-->
<!--				</el-table-column>-->
<!--				<el-table-column label="文字按钮" width="150px">-->
<!--					<template slot-scope="s">-->
<!--						<el-button type="text" size="mini" @click="get(s.row)">查看</el-button>-->
<!--						<el-button type="text" size="mini" @click="update(s.row)">修改</el-button>-->
<!--						<el-button type="text" size="mini" @click="del(s.row)">删除</el-button>-->
<!--					</template>-->
<!--				</el-table-column>-->
				<el-table-column label="正常按钮" width="240px">
					<template slot-scope="s">
						<el-button class="c-btn" type="success"  icon="el-icon-view" @click="get(s.row)">查看</el-button>
						<el-button class="c-btn" type="primary" icon="el-icon-edit" @click="update(s.row)">修改</el-button>
<!--						<el-button class="c-btn" type="danger" icon="el-icon-delete" @click="del(s.row)">删除</el-button>-->
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<div class="page-box">
				<el-pagination background
					layout="total, prev, pager, next, sizes, jumper" 
					:current-page.sync="p.current"
					:page-size.sync="p.size"
					:total="total"
					:page-sizes="[1, 10, 20, 30, 40, 50, 100]" 
					@current-change="f5()" 
					@size-change="f5()">
				</el-pagination>
			</div>
		</div>
		
		<!-- 增改组件 -->
		<add-or-update ref="add-or-update"></add-or-update>
		
	</div>
</template>

<script>
	import addOrUpdate from './financial-list-add';
	export default {
		components: {
			addOrUpdate
		},
		data() {
			return {
				p: {		// 查询参数  
					keyword: '',
					current: 1,
					size: 10,
				},
				total: 0,
				dataList: [],		// 数据集合
				todayMoney:'',
			}
		},
		methods: {
			// 刷新
			f5: function(){
				this.sa.ajaxGet('/financial/page', this.p, function(res){
					this.dataList = res.data.records;	// 数据
					this.total = res.data.total;	// 分页
				}.bind(this));

				this.sa.ajaxGet('/financial/getFinancialStatus', function(res){
					this.todayMoney = res.data;	// 数据
				}.bind(this));
			},
			// 查看
			get: function(data) {
				var str = '<div>';
				// str += '<p>编号：' + data.pid + '</p>';
				str += '<p>创建时间：' + data.createTime + '</p>';
				str += '<p>品名：' + data.name + '</p>';
				str += '<p>数量：' + data.count + '</p>';
				str += '<p>单价：' + data.price + '</p>';
				str += '<p>总价：' + data.total + '</p>';
				str += '</div>';
				this.sa.alert(str);
			},
			// 添加
			add: function () {
				this.$refs['add-or-update'].open(0);
			},
			// 修改
			update: function (data) {
				this.$refs['add-or-update'].open(data.id);
			},
			// 删除
			del: function (data) {
				this.sa.confirm('是否删除，此操作不可撤销', function() {
					this.sa.ajaxGet('/financial/delete?pid=' + data.id, function() {
						this.sa.ok('删除成功');
						this.f5();
					}.bind(this))
				}.bind(this));
			},
		},
		created: function(){
			this.f5();
			// this.$notify.info({
			// 	title: '消息',
			// 	message: '本页面展示表格的常见显示方式'
			// });
		}
	}
</script>
