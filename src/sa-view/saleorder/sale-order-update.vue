<style scoped>
	.c-panel{margin: 0px; padding: 0px 20px;}
</style>

<template>
	<el-dialog
					v-if="m"
					:visible.sync="isShow"
					width="1000px"
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

					<el-button size="small" @click="addStock()">新 增 出 货</el-button>

					<el-table style="margin-top: 10px" :data="orderDetailList" size="mini">
						<el-table-column label="产品名称" prop="productname"></el-table-column>
						<el-table-column label="标签名称" prop="labelname"></el-table-column>
						<el-table-column label="单体" prop="simple"></el-table-column>
						<el-table-column label="复配" prop="compound"></el-table-column>
						<el-table-column label="包装规格" prop="packingspecification"></el-table-column>
						<el-table-column label="数量KG" prop="weight"></el-table-column>
						<el-table-column label="含税价格" prop="taxinclusiveprice"></el-table-column>
						<el-table-column label="总金额" prop="totalmoney"></el-table-column>
						<el-table-column label="操作" width="240px">
							<template slot-scope="s">
								<el-button class="c-btn" type="danger" icon="el-icon-delete" @click="del(s.row,s.$index)">删除</el-button>
							</template>
						</el-table-column>
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
	import stockAdd from './sale-order-list-stock-add';
	export default {
		components:{
			stockAdd
		},
		data() {
			return {
				isShow: false,
				id: 0,
				m:null,
				OrderDetail: null,
				orderDetailList:[],
				dataList: [],		// 数据集合
			}
		},
		methods: {
			// 打开 
			open: function(data) {
				this.isShow = true;
				this.m = data;
				this.orderDetailList = data.orderDetailList;


			},
			del(data,index){
				this.orderDetailList.splice(index,1);
			},
			addStock:function(){
				this.$emit('addd',this.OrderDetail);
			},
			// 表单验证  
			submit_check: function() {
				var m = this.m;
				var sa = this.sa;
				if(sa.isNull(m.name)) {
					return sa.error('请输入名称');
				}
				if(sa.isNull(m.icon)) {
					return sa.error('请输入图标1');
				}
				return 'ok';
			},
			//关闭视图
			close:function(){
				this.isShow = false;
				// this.m = null;
				this.$parent.f5();
			},
			add:function(){
				this.$refs['stock-add'].open();
			},
			// 提交 
			ok: function() {
				let self = this;
				//先进行校验
				let stock = {};
				stock.stockname = this.OrderDetail.productname;
				stock.stocknumber = this.OrderDetail.weight;




				this.sa.ajaxPostJson('/saleOrder/judge', JSON.stringify(stock), function(res) {
					if (res.msg === 'MORE'){
						self.sa.alert('添加物品超过库存额度', function() {
							self.OrderDetail = null;
						});
					}else if (res.msg === 'NONE'){
						self.sa.alert('添加物品库存没有', function() {
							self.OrderDetail = null;
						});
					}else {
						//提交到上层组件的list里 //
						this.add();
						this.isShow = false;
					}
				}.bind(this));

			},
			// 创建一个空的model 
			create_m: function() {
				return {
					productname: '',
					labelname: '',
					simple: '',
					compound: '',
					packingspecification:'',
					weight:0,
					taxinclusiveprice:0,
					totalmoney:0
				}
			},

		},
		created: function(){

		}
	}
</script>
