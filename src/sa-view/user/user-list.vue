<template>
	<div class="vue-box">
		<div class="c-panel">
			<!-- 参数栏 -->
			<div class="c-title">用户列表</div>
			<el-form :inline="true" size="mini">
				<el-form-item label="用户昵称：">
					<el-input v-model="p.keyword" placeholder="模糊查询"></el-input>
				</el-form-item>
<!--				<el-form-item label="注册日期：">-->
<!--					<el-date-picker v-model="p.start_time" type="date" value-format="yyyy-MM-dd" placeholder="开始日期"></el-date-picker> - -->
<!--					<el-date-picker v-model="p.end_time" type="date" value-format="yyyy-MM-dd" placeholder="结束日期"></el-date-picker>-->
<!--				</el-form-item>-->
				<el-form-item style="min-width: 0px;">
					<el-button type="primary" icon="el-icon-search" @click="p.current = 1; f5()">查询</el-button>
				</el-form-item>

				<el-form-item style="min-width: 0px;">
					<el-button type="primary" icon="el-icon-search" @click="add()">新增</el-button>
				</el-form-item>


				<br />
<!--				<el-form-item label="综合排序：" class="s-radio-text">-->
<!--					<el-radio-group v-model="p.sort_type">-->
<!--						<el-radio :label="1">注册时间</el-radio>-->
<!--						<el-radio :label="2">最近登录</el-radio>-->
<!--						<el-radio :label="3">登陆次数</el-radio>-->
<!--						<el-radio :label="4">最近签到</el-radio>-->
<!--						<el-radio :label="5">签到次数</el-radio>-->
<!--					</el-radio-group>-->
<!--				</el-form-item>-->
			</el-form>
			<!-- <div class="c-title">数据列表</div> -->
			<el-table :data="dataList" size="mini">
				<el-table-column label="编号" prop="id" width="70px" > </el-table-column>
				<el-table-column label="账号" prop="name" width="70px">
					<template slot-scope="s">
<!--						<img :src="s.row.avatar" @click="sa.showImage(s.row.avatar, '400px', '400px')"-->
<!--							style="width: 3em; height: 3em; float: left; margin-right: 1em; border-radius: 50%; cursor: pointer;" >-->
						<div style="float: left; width: 130px; line-height: 20px;">
							<b>{{s.row.name}}</b>
<!--							<p>{{s.row.phone}}</p>-->
						</div>
					</template>
				</el-table-column>
<!--				<el-table-column label="个人相册">-->
<!--					<template slot-scope="s">-->
<!--						<img :src="s.row.photo_list[0]" style="width: 40px; height: 40px; cursor: pointer;" @click="sa.showImageList(s.row.photo_list)" >-->
<!--						共{{s.row.photo_list.length}}张, 点击预览-->
<!--					</template>-->
<!--				</el-table-column>-->
<!--				<el-table-column label="性别" prop="sex"> </el-table-column>-->
<!--				<el-table-column label="注册方式" prop="create_type"></el-table-column>-->
<!--				<el-table-column label="注册于" prop="createTime"></el-table-column>-->
				<el-table-column label="上次登陆IP" prop="loginIp" width="240px"></el-table-column>
				<el-table-column label="上次登陆时间" prop="loginTime" width="200px"></el-table-column>
				<el-table-column label=联系电话 prop="phone" width="140px"></el-table-column>
				<el-table-column label="状态" width="140px">
					<template slot-scope="s">
						<el-switch @change="changeSwitch($event,s.row,s.$index)" v-model="s.row.status" :active-value="1" :inactive-value="2" inactive-color="#ff4949"></el-switch>
						<b style="color: green; margin-left: 10px;" v-if="s.row.status == 1">正常</b>
						<b style="color: red; margin-left: 10px;" v-if="s.row.status == 2">禁用</b>
					</template>
				</el-table-column>
				<el-table-column prop="address" label="密码操作" width="160px">
					<template slot-scope="s">
<!--						<el-button class="c-btn" type="success"  icon="el-icon-view" @click="get(s.row)">详情</el-button>-->
<!--						<el-button class="c-btn" type="primary" icon="el-icon-edit" @click="update(s.row)">修改</el-button>-->
						<!--						<el-button class="c-btn" type="primary" icon="el-icon-edit" @click="userUnlock(s.row)">解除锁定</el-button>-->
						<el-button class="c-btn" type="primary" icon="el-icon-edit" @click="passwordReset(s.row)">密码重置</el-button>
<!--						<el-button class="c-btn" type="danger" icon="el-icon-delete" @click="del(s.row)">删除</el-button>-->
					</template>
				</el-table-column>

				<el-table-column prop="address" label="操作">
					<template slot-scope="s">
						<el-button class="c-btn" type="success"  icon="el-icon-view" @click="get(s.row)">详情</el-button>
						<el-button class="c-btn" type="primary" icon="el-icon-edit" @click="update(s.row)">修改</el-button>
<!--						<el-button class="c-btn" type="primary" icon="el-icon-edit" @click="bindWx(s.row)">绑定微信</el-button>-->
<!--						<el-button class="c-btn" type="primary" icon="el-icon-edit" @click="userUnlock(s.row)">解除锁定</el-button>-->
<!--						<el-button class="c-btn" type="primary" icon="el-icon-edit" @click="passwordReset(s.row)">密码重置</el-button>-->
						<el-button class="c-btn" type="danger" icon="el-icon-delete" @click="del(s.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<div class="page-box">
				<el-pagination background
					layout="total, prev, pager, next, sizes, jumper" 
					:current-page.sync="p.current"
					:page-size.sync="p.size"
					:total="dataCount" 
					:page-sizes="[1, 10, 20, 30, 40, 50, 100]" 
					@current-change="f5(true)" 
					@size-change="f5(true)">
				</el-pagination>
			</div>
		</div>
		<!-- 给layer打一波广告 -->
<!--		<div class="c-panel" style="background-color: rgba(0,0,0,0);">-->
<!--			layer：<el-link type="primary" href="http://layer.layui.com/" target="_blank">-->
<!--				一个可以让你想到即可做到的JavaScript弹窗（层）解决方案-->
<!--			</el-link>-->
<!--		</div>-->

		<!-- 增改组件 -->
		<add-or-update ref="add-or-update"></add-or-update>

		<user-show ref="user-show"></user-show>

		<user-edit ref="user-edit"></user-edit>

		<user-add ref="user-add"></user-add>

	</div>
</template>

<script>

	import addOrUpdate from '../user/art-add-new';
	import UserShow from './user-show';
	import UserEdit from './user-edit';
	import UserAdd from './user-add';
	export default {
		components: {
			UserShow,
			addOrUpdate,
			UserEdit,
			UserAdd
		},
		data() {
			return {
				p: {	// 查询参数 
					// username: '',
					// create_type: 0,
					// sort_type: 1,
					// start_time: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-1',	// 本月一号
					// end_time: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),	// 本月当日
					current: 1,
					size: 10,
					keyword:'',
				},
				dataCount: 0,
				dataList: [],
				openId:''
			}
		},
		methods: {
			// 数据刷新
			f5: function() {
				this.sa.ajaxGet('/user/page', this.p, function(res){
					this.dataList = res.data.records;	// 数据
					this.dataCount = res.data.total;		// 分页
				}.bind(this));
			},
			add(){
				this.$refs['user-add'].open();
			},
			// bindWx(row){
			// 	console.log(JSON.stringify(row))
			// 	this.sa.ajaxGet('/user/setOpenId?id=' + row.id + '&openId=' + this.openId, function() {
			// 		// this.f5();
			// 	}.bind(this))
			// },
			changeSwitch(data,row,index){
				console.log(index)
				this.sa.ajaxGet('/user/updateState?id=' + row.id, function() {
					// this.f5();
				}.bind(this))
			},
			// 删除
			del: function(data) {
				this.sa.confirm('是否删除，此操作不可撤销', function() {
					this.sa.ajax2('/user/delete?id=' + data.id, function() {
						this.sa.arrayDelete(this.dataList, data);
						this.sa.ok('删除成功');
					}.bind(this))
				}.bind(this));
			},
			// 查看
			get: function(data) {
				// 打开user-show
				this.$refs['user-show'].open(data);

				// var str = '<div>';
				// str += '<p>编号：' + data.id + '</p>';
				// str += '<p>昵称：' + data.name + '</p>';
				// str += '<p>上次登陆id：' + data.loginIp + '</p>';
				// str += '<p>上次登陆时间：' + data.loginTime + '</p>';
				// str += '<p>联系电话：' + data.phone + '</p>';
				// // str += '<p>性别：' + data.sex + '</p>';
				// str += '<p>当前状态：<b>' + (data.status == 1 ? '正常' : '禁用') + '</b></p>';
				// // str += '<p>注册方式：' + data.create_type + '</p>';
				// str += '<p>注册时间：' + data.createTime + '</p>';
				// str += '</div>';
				// this.sa.alert(str);
			},
			update: function(data) {
				this.$refs['user-edit'].open(data);
			},
			userUnlock(row){
				this.sa.confirm('是否解除锁定?', function() {

					this.sa.ajaxGet('/admin/userUnlock?id=' + row.id, function() {
						this.sa.ok('解除锁定成功');
					}.bind(this))

				}.bind(this));
			},
			passwordReset(row){
				this.sa.confirm('是否密码重置?', function() {

					this.sa.ajaxGet('/admin/passwordReset?id=' + row.id, function() {
						this.f5();
						this.sa.ok('密码重置成功');
					}.bind(this))

				}.bind(this));
			}
		},

		created: function(){
			this.f5();
		}
	}
</script>

<style>
</style>
