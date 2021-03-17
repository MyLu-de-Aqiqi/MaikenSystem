<style scoped>
</style>

<template>
	<div class="vue-box">
		<div class="c-panel">
			<!-- 参数栏 -->
<!--			账目记录-->
			<div class="c-title">检索参数</div>
			<el-form size="mini" :inline="true" @submit.native.prevent >
				<el-form-item label="名称查询：">
					<el-input v-model="p.keyword" placeholder="模糊查询"></el-input>
				</el-form-item>
				<el-form-item style="min-width: 0px;">
					<el-button type="primary" icon="el-icon-search" @click="p.current = 1; f5()">查询</el-button>
					<el-button type="primary" icon="el-icon-plus" @click="add()">添加</el-button>
				</el-form-item>
			</el-form>
			<!-- 数据列表 -->
			<div class="c-title">数据列表</div>
			<el-table :data="dataList" size="mini">
<!--				<el-table-column label="id" prop="id" width="70px"></el-table-column>-->
				<el-table-column label="订单号" prop="sid"></el-table-column>
				<el-table-column label="客户地区" prop="theclientarea"></el-table-column>
				<el-table-column label="接单日期" prop="ordertime"></el-table-column>
				<el-table-column label="要求发货日期" prop="requireddeliverydate"></el-table-column>
				<el-table-column label="客户名称" prop="clientname"></el-table-column>
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
		<add-order-show ref="add-order-show"></add-order-show>
		<add-order-update ref="add-order-update"></add-order-update>

	</div>
</template>

<script>
	import addOrUpdate from './sale-order-list-add';
	import addOrderShow from './sale-order-show';
	import addOrderUpdate from './sale-order-update';
	export default {
		components: {
			addOrUpdate,
			addOrderShow,
			addOrderUpdate
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
			}
		},
		methods: {
			// 刷新
			f5: function(){
				this.sa.ajaxGet('/saleOrder/page', this.p, function(res){
					this.dataList = res.data.records;	// 数据
					this.total = res.data.total;	// 分页
				}.bind(this));
			},
			// 查看
			get: function(data) {
				this.$refs['add-order-show'].open(data);

			},
			// 添加
			add: function () {
				this.$refs['add-or-update'].open(0);
			},
			// 修改
			update: function (data) {
				this.$refs['add-order-update'].open(data);
			},
			// 删除
			del: function (data) {
				this.sa.confirm('是否删除，此操作不可撤销', function() {
					this.sa.ajaxGet('/saleOrder/delete?pid=' + data.pid, function() {
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
