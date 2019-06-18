import service from './index'

const request = (method, url, data = null) => {
  method = method.toLowerCase()
  let carry = {
    post: () => service.post(url, data),
    get: () => service.get(url, { params: data }),
    put: () => service.put(url, data),
    delete: () => { // 处理参数为数组类型(delete当post操作,非表单序列化操作)
      if (data.id || data.code) return service.delete(url, { params: data })
      else return service.delete(url, { data: data })
    }
  }
  return carry[method]()
}

// 接口
// 登录操作
export const Login = params => request('post', '/api/Account/Login', params)

/* --------------------------------------- Device 设备控制器 ---------------------------------------- */
// 添加设备
export const DeviceAdd = params => request('post', '/api/Device/Add', params)
// 删除设备
export const DeviceDelete = params => request('delete', '/api/Device/Delete', params)
// 删除一组设备
export const DeviceDeleteBatch = params => request('delete', '/api/Device/DeleteBatch', params)
// 更新设备
export const DeviceUpdate = params => request('put', '/api/Device/Update', params)
// 获取所有设备
export const DeviceGetAll = params => request('get', '/api/Device/GetAll', params)
// 导出所有设备
export const DeviceExport = params => request('get', '/api/Device/Export', params)
// 导入所有设备
export const DeviceImport = params => request('get', '/api/Device/Import', params)

/* --------------------------------------- Space 空间控制器 ---------------------------------------- */
// 添加空间
export const SpaceAdd = params => request('post', '/api/Space/Add', params)
// 删除空间
export const SpaceDelete = params => request('delete', '/api/Space/Delete', params)
// 更新空间等级
export const SpaceUpdateRank = params => request('put', '/api/Space/UpdateRank', params)
// 更新空间
export const SpaceUpdate = params => request('put', '/api/Space/Update', params)
// 获取所有空间
export const SpaceGet = params => request('get', '/api/Space/Get', params)
// 获取所有设备空间树
export const SpaceDevGet = params => request('get', '/api/Device/GetSpaceTree', params)

/* --------------------------------------- DeviceType 设备类型控制器 ---------------------------------------- */
// 添加设备类型
export const DeviceTypeAdd = params => request('post', '/api/DeviceType/Add', params)
// 删除设备类型
export const DeviceTypeDelete = params => request('delete', '/api/DeviceType/Delete', params)
// 更新设备类型等级
export const DeviceTypeUpdateRank = params => request('put', '/api/DeviceType/UpdateRank', params)
// 更新设备类型
export const DeviceTypeUpdate = params => request('put', '/api/DeviceType/Update', params)
// 获取所有设备类型
export const DeviceTypeGet = params => request('get', '/api/DeviceType/Get', params)

/* --------------------------------------- DeviceSystemType 系统类型控制器 ---------------------------------------- */
// 添加系统类型
export const DeviceSystemTypeAdd = params => request('post', '/api/DeviceSystemType/Add', params)
// 删除系统类型
export const DeviceSystemTypeDelete = params => request('delete', '/api/DeviceSystemType/Delete', params)
// 更新系统类型等级
export const DeviceSystemTypeUpdateRank = params => request('put', '/api/DeviceSystemType/UpdateRank', params)
// 更新系统类型
export const DeviceSystemTypeUpdate = params => request('put', '/api/DeviceSystemType/Update', params)
// 获取所有系统类型
export const DeviceSystemTypeGet = params => request('get', '/api/DeviceSystemType/Get', params)

/* --------------------------------------- FileSet 文件集控制器 ---------------------------------------- */
// 添加文件集
export const FileSetAdd = params => request('post', '/api/FileSet/Add', params)
// 添加文件集资源
export const FileSetAddResource = params => request('post', '/api/FileSet/AddResource', params)
// 删除文件集
export const FileSetDelete = params => request('delete', '/api/FileSet/Delete', params)
// 删除一组文件集
export const FileSetDeleteBatch = params => request('delete', '/api/FileSet/DeleteBatch', params)
// 删除一组文件集资源
export const FileSetDeleteResource = params => request('delete', '/api/FileSet/DeleteResource', params)
// 更新文件集
export const FileSetUpdate = params => request('put', '/api/FileSet/Update', params)
// 获取文件集
export const FileSetGet = params => request('get', '/api/FileSet/Get', params)
// 获取所有文件集
export const FileSetGetAll = params => request('get', '/api/FileSet/GetAll', params)
