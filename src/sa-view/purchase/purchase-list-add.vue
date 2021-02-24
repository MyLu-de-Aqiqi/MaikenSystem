<style scoped>
	.c-panel{margin: 0px; padding: 0px 20px;}
</style>

<template>
	<el-dialog
		v-if="m"
		:title="m.id == 0 ? '数据增加' : '数据修改'"
		:visible.sync="isShow"
		width="400px"
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
					<el-form-item label="客户名称：">
						<el-input v-model="m.clientname"></el-input>
					</el-form-item>
					<el-form-item label="到货日期：">
						<el-input v-model="m.cometime" type="date"></el-input>
					</el-form-item>
					<el-form-item label="品名：">
						<el-input v-model="m.typename"></el-input>
					</el-form-item>
					<el-form-item label="进货数量：">
						<el-input v-model="m.count"></el-input>
					</el-form-item>
					<el-form-item label="进货单价：">
						<el-input v-model="m.unitprice"></el-input>
					</el-form-item>
					<el-form-item label="进货总金额：">
						<el-input v-model="m.totalmoney"></el-input>
					</el-form-item>
					<el-form-item label="付款日期：">
						<el-input v-model="m.paytime" type="date"></el-input>
					</el-form-item>
					<el-form-item label="付款金额：">
						<el-input v-model="m.paymoney"></el-input>
					</el-form-item>
					<el-form-item label="发票状态：">
						<el-input v-model="m.invoicestate"></el-input>
					</el-form-item>
					<el-form-item label="发票金额：">
						<el-input v-model="m.invoicemoney"></el-input>
					</el-form-item>
					<el-form-item label="发票号：">
						<el-input v-model="m.invocenumber"></el-input>
					</el-form-item>
					<el-form-item label="发票日期：">
						<el-input v-model="m.invocetime" type="date"></el-input>
					</el-form-item>
					<el-form-item label="备注：">
						<el-input v-model="m.remaks"></el-input>
					</el-form-item>

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
	</el-dialog>
</template>

<script>
	// import mockDataList from '../case/mock-data-list.js';
	export default {
		data() {
			return {
				isShow: false,
				id: 0,
				m: null
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
					this.sa.ajaxGet('/purchase/getById', {pid: id}, function(res) {
						this.m = res.data;
					}.bind(this));
				}
			},
			// 表单验证  
			submit_check: function() {
				var m = this.m;
				var sa = this.sa;
				if(sa.isNull(m.name)) {
					return sa.error('请输入名称');
				}
				if(sa.isNull(m.icon)) {
					return sa.error('请输入图标');
				}
				return 'ok';
			},
			//关闭视图
			close:function(){
				this.isShow = false;
				// this.m = null;
			},
			// 提交 
			ok: function() {
				// 表单验证 
				// if(this.submit_check() != 'ok') {
				// 	return;
				// }
				// 开始增加或修改
				let self = this;
				if(this.id == 0) {
					// id == 0 为增加        
					this.sa.ajaxPost('/purchase/add', this.m, function() {
						self.sa.alert('增加成功', function() {
							self.$parent.f5();	// 父视图刷新   
							self.isShow = false;
						}); 
					});
				} else {
					// id != 0 为修改
					let po = this.m;
					po.cometime = JSON.stringify(po.cometime)
					po.invocetime = JSON.stringify(po.invocetime)
					po.paytime = JSON.stringify(po.paytime)
					this.sa.ajaxPost('/purchase/update', po, function(){
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
					clientname: '',
					cometime: '',
					typename: '',
					count: 0,
					unitprice: 0,
					totalmoney:'',
					paytime:'',
					paymoney:'',
					invoicestate:'',
					invoicemoney:'',
					invocenumber:'',
					invocetime:'',
					remaks:''

				}
			},
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
