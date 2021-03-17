<style scoped>
	.c-panel{margin: 0px; padding: 0px 20px;}
</style>

<template>
	<el-dialog
					v-if="OrderDetail"
					:title="OrderDetail.id == 0 ? '数据增加' : '数据修改'"
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
					<el-form-item label="产品名称：">
						<el-input v-model="OrderDetail.productname"></el-input>
					</el-form-item>
					<el-form-item label="标签名称：">
						<el-input v-model="OrderDetail.labelname" ></el-input>
					</el-form-item>
					<el-form-item label="单体：">
						<el-input v-model="OrderDetail.simple" ></el-input>
					</el-form-item>
					<el-form-item label="复配：">
						<el-input v-model="OrderDetail.compound" ></el-input>
					</el-form-item>
					<el-form-item label="包装规格：">
						<el-input v-model="OrderDetail.packingspecification" ></el-input>
					</el-form-item>
					<el-form-item label="数量KG：">
						<el-input v-model="OrderDetail.weight" ></el-input>
					</el-form-item>
					<el-form-item label="含税价格：">
						<el-input v-model="OrderDetail.taxinclusiveprice" ></el-input>
					</el-form-item>
					<el-form-item label="总金额：">
						<el-input v-model="OrderDetail.totalmoney" ></el-input>
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
	export default {
		data() {
			return {
				isShow: false,
				id: 0,
				m:null,
				OrderDetail: null,
				dataList: [],		// 数据集合
			}
		},
		methods: {
			// 打开
			open: function() {
				// console.log("id:"+id)
				// this.id = id;
				this.isShow = true;
				this.OrderDetail = this.create_m();
				// if(id == 0){	// 如果是添加
				// 	this.m = this.create_m();
				// } else {
				// 	// id 非 0 代表 是要修改 先查询一下，把旧值显示在input中
				// 	this.sa.ajaxGet('/saleOrder/getById', {pid: id}, function(res) {
				// 		this.m = res.data;
				// 	}.bind(this));
				// }
			},
			add:function(){
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
