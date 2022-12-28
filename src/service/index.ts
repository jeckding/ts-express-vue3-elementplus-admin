// 批量引入文件

const files: any = import.meta.globEager('./modules/*.ts')
const keys = Object.keys(files)
 
const importModules = files

for (let path of keys) {
	// 裁剪字符串方式得到路径中的文件名（无扩展名）
	let name = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.ts'));
	// 对原对象执行添加新的属性并删除旧属性达到处理效果
	importModules[name] = importModules[path].default;
	delete importModules[path];
}
const $service = importModules

export default {
	$service
}