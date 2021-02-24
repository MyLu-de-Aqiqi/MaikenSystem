<style scoped>
	.c-panel{margin: 0px; padding: 0px 20px;}
</style>

<template>
	<el-dialog
		v-if="m"
		:title="m.id == 0 ? '数据增加' : '数据修改'"
		:visible.sync="isShow"
		width="600px"
		top="5vh"
		:append-to-body="true"
		:destroy-on-close="true"
		:close-on-click-modal="false"
		custom-class="full-dialog"
		>
		<div class="vue-box">
			<div class="c-panel">
				<!-- 参数栏 -->
				<br>
				<el-form size="mini">
<!--					<el-form-item label="编号：">-->
<!--						<el-input v-model="m.id" disabled></el-input>-->
<!--					</el-form-item>-->
					<el-form-item label="销售订单号：">
<!--						<b style="color: red;margin-right: 3px">*</b>-->

						<el-input v-model="m.sid"></el-input>
						<b style="color: red;margin-left: 5px">必填</b>
					</el-form-item>
					<el-form-item label="客户名称：">
						<el-input v-model="m.clientname" ></el-input>
						<b style="color: red;margin-left: 5px">必填</b>
					</el-form-item>
					<el-form-item label="客户地址：">
						<el-input v-model="m.clientaddress"></el-input>
					</el-form-item>
					<el-form-item label="客户所属行业：">
						<el-input v-model="m.industryofthecustomer"></el-input>
					</el-form-item>
					<el-form-item label="客户地区：">
						<el-input v-model="m.theclientarea"></el-input>
					</el-form-item>
					<el-form-item label="客户类型：">
						<el-input v-model="m.theclienttype"></el-input>
					</el-form-item>
					<el-form-item label="流程单编号：">
						<el-input v-model="m.sheetnumber"></el-input>
					</el-form-item>
					<el-form-item label="接单日期：">
<!--						<el-input v-model="m.ordertime" type="date"></el-input>-->
						<el-date-picker
										v-model="m.ordertime"
										type="datetime"
										placeholder="选择日期"
										format="yyyy-MM-dd HH:mm:ss"
										value-format="yyyy-MM-dd HH:mm:ss"
						>
						</el-date-picker>



						<b style="color: red;margin-left: 5px">必填</b>
					</el-form-item>
					<el-form-item label="要求发货日期：">
<!--						<el-input v-model="m.requireddeliverydate" type="date" ></el-input>-->
						<el-date-picker
										v-model="m.requireddeliverydate"
										type="datetime"
										placeholder="选择日期"
										format="yyyy-MM-dd HH:mm:ss"
										value-format="yyyy-MM-dd HH:mm:ss"
						>
						</el-date-picker>

						<b style="color: red;margin-left: 5px">必填</b>
					</el-form-item>
					<el-form-item label="合同号：">
						<el-input v-model="m.contrctnumber"></el-input>
					</el-form-item>
					<el-form-item label="联系人：">
						<el-input v-model="m.contact"></el-input>
						<b style="color: red;margin-left: 5px">必填</b>
					</el-form-item>
					<el-form-item label="联系电话：">
						<el-input v-model="m.phone"></el-input>
						<b style="color: red;margin-left: 5px">必填</b>
					</el-form-item>
					<el-form-item label="销售员：">
						<el-input v-model="m.saleman"></el-input>
						<b style="color: red;margin-left: 5px">必填</b>
					</el-form-item>
					<el-form-item label="送货要求：">
						<el-input v-model="m.deliveryrequirements"></el-input>
					</el-form-item>
					<el-form-item label="特殊要求：">
						<el-input v-model="m.specialrequirements"></el-input>
					</el-form-item>
					<el-form-item label="付款方式：">
						<el-input v-model="m.paytype"></el-input>
					</el-form-item>
					<el-form-item label="审核人：">
						<el-input v-model="m.reviewer"></el-input>
					</el-form-item>
					<el-form-item label="批准人：">
						<el-input v-model="m.approver"></el-input>
					</el-form-item>
					<el-form-item label="电话批准人：">
						<el-input v-model="m.phoneapprover"></el-input>
					</el-form-item>
					<el-form-item label="应收款审核：">
						<el-input v-model="m.receivablesaudit"></el-input>
					</el-form-item>
					<el-form-item label="客户付款类型：">
						<el-input v-model="m.clientpaytype"></el-input>
					</el-form-item>
					<el-form-item label="已批准信用额度：">
						<el-input v-model="m.thecreditlinehasbeenapproved"></el-input>
					</el-form-item>
					<el-form-item label="信用限额：">
						<el-input v-model="m.creditterm"></el-input>
					</el-form-item>
					<el-form-item label="已经累计赊账贷款：">
						<el-input v-model="m.thecumulativecredit"></el-input>
					</el-form-item>
					<el-form-item label="备注：">
						<el-input v-model="m.remark"></el-input>
					</el-form-item>

					<el-button size="small" @click="add()">新 增 出 货</el-button>

					<el-table style="margin-top: 10px" :data="orderDetailList" size="mini">
						<el-table-column label="产品名称" prop="productname"></el-table-column>
						<el-table-column label="标签名称" prop="labelname"></el-table-column>
						<el-table-column label="单体" prop="simple"></el-table-column>
						<el-table-column label="复配" prop="compound"></el-table-column>
						<el-table-column label="包装规格" prop="packingspecification"></el-table-column>
						<el-table-column label="数量KG" prop="weight"></el-table-column>
						<el-table-column label="含税价格" prop="taxinclusiveprice"></el-table-column>
						<el-table-column label="总金额" prop="totalmoney"></el-table-column>
					</el-table>




<!--					<el-form-item label="图标：">-->
<!--						<el-input v-model="m.icon"></el-input>-->
<!--					</el-form-item>-->
<!--					<el-form-item label="状态：">-->
<!--						<el-radio-group v-model="m.status">-->
<!--							<el-radio :label="1">正常</el-radio>-->
<!--							<el-radio :label="2">禁用</el-radio>-->
<!--						</el-radio-group>-->
<!--					</el-form-item>-->
				</el-form>
			</div>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button size="small" @click="close()">取 消</el-button>
			<el-button size="small" type="primary" @click="ok()">确 定</el-button>
		</span>

		<stock-add ref="stock-add" @addd="upload"></stock-add>

	</el-dialog>
</template>

<script>
	// import mockDataList from '../case/mock-data-list.js';
	import stockAdd from './sale-order-list-stock-add';
	export default {
		components:{
			stockAdd
		},
		data() {
			return {
				isShow: false,
				id: 0,
				m: null,
				orderDetailList: [],		// 数据集合
			}
		},
		methods: {
			// 打开 
			open: function(id) {
				console.log("id:"+id)
				this.id = id;
				this.isShow = true;
				if(id == 0){	// 如果是添加
					this.m = this.create_m();
				} else {
					// id 非 0 代表 是要修改 先查询一下，把旧值显示在input中  
					this.sa.ajaxGet('/saleOrder/getById', {pid: id}, function(res) {
						this.m = res.data;
					}.bind(this));
				}
			},
			add:function(){
				this.$refs['stock-add'].open();
			},
			// 表单验证  
			submit_check: function() {
				var m = this.m;
				var sa = this.sa;
				if(sa.isNull(m.sid)) {
					return sa.error('请输入销售订单号');
				}
				if(sa.isNull(m.clientname)) {
					return sa.error('请输入客户名称');
				}
				if(sa.isNull(m.ordertime)) {
					return sa.error('请输入接单日期');
				}
				if(sa.isNull(m.requireddeliverydate)) {
					return sa.error('请输入要求发货日期');
				}
				if(sa.isNull(m.contact)) {
					return sa.error('请输入联系人');
				}
				if(sa.isNull(m.phone)) {
					return sa.error('请输入联系电话');
				}
				if(sa.isNull(m.saleman)) {
					return sa.error('请输入销售员');
				}
				return 'ok';
			},
			//关闭视图
			close:function(){
				this.isShow = false;
				// this.m = null;
				this.orderDetailList = [];
			},
			// 提交 
			ok: function() {
				// 表单验证
				if(this.submit_check() != 'ok') {
					return;
				}
				// 开始增加或修改
				let self = this;
				if(this.id == 0) {
					// id == 0 为增加
					let po = this.m;
					// po.ordertime = JSON.parse(po.ordertime)
					// po.requireddeliverydate = JSON.parse(po.requireddeliverydate)

					// 构造子集
					// for (let orderDetailListKey in this.orderDetailList) {
					// 	orderDetailListKey.sid = this.m.sid;
					// }
					po.orderDetailList = [];
					po.orderDetailList = this.orderDetailList;

					console.log(JSON.stringify(po))


					this.sa.ajaxPostJson('/saleOrder/add', JSON.stringify(po), function() {
						self.sa.alert('增加成功', function() {
							self.$parent.f5();	// 父视图刷新   
							self.isShow = false;
						}); 
					});
				} else {
					// id != 0 为修改
					let po = this.m;
					this.sa.ajaxPost('/saleOrder/update', po, function(){
						self.sa.alert('修改成功', function(){
							self.$parent.f5();	// 父视图刷新
							self.isShow = false;
						});
					});
				}
			},
			// 创建一个空的model 
			create_m: function() {
				return {
					stockname: '',
					stocknumber: 0,
					stockprice: 0,
					remark: ''

				}
			},
			upload(A){
				this.orderDetailList.push(A);
			}
			// 遍历判断， 获取模拟数据  
			// getMockData: function(id) {
			// 	var data = null;
			// 	// 遍历判断
			// 	mockDataList.data.forEach(function(item) {
			// 		if(item.id == id) {
			// 			data = item;
			// 		}
			// 	})
			// 	// 创建模拟数据
			// 	var mockData = {
			// 		code: 200,
			// 		msg: 'ok',
			// 		data: data
			// 	}
			// 	return mockData;
			// }
		},
		created: function(){
			
		}
	}
</script>
