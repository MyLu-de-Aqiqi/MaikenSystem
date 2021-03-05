<style scoped>
	.content-box{
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #EEE;
		cursor: pointer;
		height: 500px;
	}
	.tips-box{text-align: center; margin-top: 0px;}
	.xian{width: 500px; height: 2px; margin: 40px auto  30px auto; background-color: #515151;}
	.error-icon{width: 200px; height: 200px;}
	.error-tips{font-size: 20px; font-weight: 700; color: #515151;}
</style>

<template>
	<el-dialog
					:visible.sync="isShow"
					:show-close="false"
					width="600px"
					top="calc(50vh - 250px)"
					custom-class="full-dialog full-h-dialog"
	>
		<div class="content-box" >
			<el-form size="mini" >
				<el-form-item label="请输入老密码：">
					<el-input v-model="updatePasswordEntity.oldPw" ></el-input>
				</el-form-item>
				<el-form-item label="请输入新密码：">
					<el-input v-model="updatePasswordEntity.newPw" ></el-input>
				</el-form-item>
				<el-form-item label="请确定输入新密码：">
					<el-input v-model="updatePasswordEntity.newPwConfirm" ></el-input>
				</el-form-item>



			</el-form>
		</div>

		<span slot="footer" class="dialog-footer">
			<el-button size="small" @click="close()">关  闭</el-button>

			<el-button size="small" type="primary" @click="ok()">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,

				updatePasswordEntity:{
					oldPw:'',
					newPw:'',
					newPwConfirm:'',
				}
			}
		},
		methods: {
			close:function(){
				this.isShow = false;
				this.updatePasswordEntity.oldPw = '';
				this.updatePasswordEntity.newPw = '';
				this.updatePasswordEntity.newPwConfirm = '';
			},
			ok(){

				this.sa.ajaxPostJson('/user/updatePassword',JSON.stringify(this.updatePasswordEntity), function(res) {

					console.log(res)
					this.sa.alert('修改密码成功');

					this.updatePasswordEntity.oldPw = '';
					this.updatePasswordEntity.newPw = '';
					this.updatePasswordEntity.newPwConfirm = '';
					this.isShow = false;


				}.bind(this))
			}
		}
	}
</script>

