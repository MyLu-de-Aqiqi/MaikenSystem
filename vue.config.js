// const url = 'http://localhost:8764';   //公司-开发环境
const url = 'http://106.14.247.150:8764';   //公司-开发环境



module.exports = {
	runtimeCompiler: true,
	devServer:{
		proxy:{
			'/admin':{
				// target:'http://localhost:8764/',
				target:'http://106.14.247.150:8764/',
				ws: true,
				changeOrigin:true,
				pathRewrite: {
					'^/admin': '/admin'
				}
			},
			'/': {
				target: url,
				ws: true,
				pathRewrite: {
					'^/': '/'
				}
			},
		}
	}
}

//服务器

