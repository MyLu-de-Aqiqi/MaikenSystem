const url = 'http://localhost:8764';   //公司-开发环境
// const url = 'https://www.mimkenc.cn:8764';   //公司-开发环境



module.exports = {
	runtimeCompiler: true,
	devServer:{
		proxy:{
			'/admin':{
				// target:'http://localhost:8764/',
				target: url,
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

