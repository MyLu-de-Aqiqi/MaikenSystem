<style scoped>
</style>

<template>
	<div class="vue-box">
		<!-- 参数栏 -->
		<div class="c-panel">
			<!-- 参数栏 -->
<!--			<div class="c-title">检索参数</div>-->
<!--			<el-form :inline="true" size="mini" @submit.native.prevent>-->
<!--				<el-form-item label="角色名称：">-->
<!--					<el-input v-model="p.roleName"></el-input>-->
<!--				</el-form-item>-->
<!--				<el-form-item style="min-width: 0px;">-->
<!--					<el-button type="primary" icon="el-icon-search" @click="f5()">查询</el-button>-->
<!--				</el-form-item>-->
<!--			</el-form>-->
			<!-- 数据列表 -->
			<el-table :data="dataList" size="mini" >
				<el-table-column label="编号" prop="id" width="70px" > </el-table-column>
				<el-table-column label="角色名称">
					<template slot-scope="s">
						<el-input size="mini" v-model="s.row.roleName" @input="s.row.is_update = true"></el-input>
					</template>
				</el-table-column>
				<el-table-column label="责任描述">
					<template slot-scope="s">
						<el-input size="mini" v-model="s.row.roleInfo" @input="s.row.is_update = true"></el-input>
					</template>
				</el-table-column>
				<el-table-column label="是否锁定" title="锁定的角色为系统维持正常运行的重要角色，不可删除">
					<template slot-scope="s">
						{{s.row.isLock == 1 ? '是' : '否'}}
					</template>
				</el-table-column>
				<el-table-column label="创建日期">
					<template slot-scope="s">
						{{sa.forDate(s.row.createTime)}}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="220px">
					<template slot-scope="s">
						<el-button type="text" size="mini" @click="update(s.row)">
							<span :style="s.row.is_update ? 'color: red;' : ''">修改</span>
						</el-button>
						<el-button type="text" size="mini" @click="del(s.row)">删除</el-button>
						<el-button type="text" size="mini" @click="menu_setup(s.row)">分配权限</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 添加 -->
		<div class="c-panel">
			<h4 class="c-title">添加一个</h4>
			<el-table :data="[{}]" size="mini" >
<!--				<el-table-column label="编号" width="90px" >-->
<!--					<template>-->
<!--						<el-input size="mini" v-model="m.id"></el-input>-->
<!--					</template>-->
<!--				</el-table-column>-->
				<el-table-column label="名称">
					<template>
						<el-input size="mini" v-model="m.roleName"></el-input>
					</template>
				</el-table-column>
				<el-table-column label="责任描述">
					<template>
						<el-input size="mini" v-model="m.roleInfo"></el-input>
					</template>
				</el-table-column>
				<el-table-column label="是否锁定" title="锁定的角色为系统维持正常运行的重要角色，不可删除">
					<template>
						{{m.isLock == 1 ? '是' : '否'}}
					</template>
				</el-table-column>
				<el-table-column prop="address" label="操作">
					<template>
						<el-button type="text" size="mini" @click="add">添加</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		
		<!-- 设置权限  -->
		<menu-setup ref="menu-setup"></menu-setup>
		
		
		
	</div>
</template>

<script>
	
	import mockData from './mock-data.js';	 	// 模拟数据
	import menuSetup from './menu-setup.vue';	 	// 设置权限 
	export default {
		components: {
			menuSetup
		},
		data() {
			return {
				isShow: true,
				p: {	// 查询参数 
					role_name: '',
				},
				dataList: [],	// 数据集合
				m: {		// 添加信息
					id: 0, 
					roleName: '角色名称',
					roleInfo: '责任描述',
					isLock: 2,
					createTime: new Date(),
					is_update: false,
				},
				rid: 0
			}
		},
		methods: {
			// 刷新
			f5: function(){
				// this.sa.ajax2('/role/getList', {}, function(res){
				// 	this.dataList = this.sa.listAU(res.data);	// 数据
				// }.bind(this), {res: mockData});

				this.sa.ajaxGet('/role/getList', {}, function(res){
					console.log("roles:"+res.data)
					this.dataList = this.sa.listAU(res.data);	// 数据
				}.bind(this), {res: mockData});
			},
			// 修改
			update: function (data) {
				console.log("222")
				var data2 = this.sa.copyJSON(data);
				// data2.create_time = undefined;
				// data2.delete("createTime")
				delete data2.createTime
				delete data2.is_update
				delete data2.menus

				console.log("data2:"+JSON.stringify(data2))
				this.sa.ajaxPost('/role/update', data2, function(){
					this.sa.ok('修改成功');
					data.is_update = false;
				}.bind(this))
			},
			// 删除
			del: function (data) {
				if(data.is_lock == 1){
					return this.sa.alert('此角色是维持系统正常运行的重要角色，已被锁定，不可删除');
				}
				this.sa.confirm('是否删除，此操作不可撤销', function(){
					this.sa.ajaxGet('/role/delete',{roleId: data.id},function(){
						// this.sa.arrayDelete(this.dataList, data);
						this.f5();
						this.sa.ok('删除成功');
					}.bind(this))
				}.bind(this))
			},
			// 添加
			add: function () {
				var data = this.sa.copyJSON(this.m);
				// this.sa.ajax2('/role/add', data, function(){
				// 	this.sa.alert('添加成功', function(){
				// 		this.dataList.push(data);
				// 	}.bind(this));
				// }.bind(this))

				delete data.id
				delete data.createTime
				delete data.is_update
				delete data.menus

				this.sa.ajaxPost('/role/add', data, function(){
					this.sa.alert('添加成功', function(){
						this.f5();
					}.bind(this));
				}.bind(this))

			}, 
			// 修改菜单权限 
			menu_setup: function(data){
				this.$refs['menu-setup'].show(data.id, data.role_name);
			}
		},
		created: function(){
			this.f5();
		}
	}
</script>
