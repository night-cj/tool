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

/*

Share V1 API

*/

/* --------------------------------------- Account 账户控制器 ---------------------------------------- */
// 登录操作
export const Login = params => request('post', '/api/Account/Login', params)
// 切换项目和角色
export const AccountSwitch = params => request('post', '/api/Account/Switch', params)
// 添加账户
export const AccountAdd = params => request('post', '/api/Account/Add', params)
// 删除账户
export const AccountDelete = params => request('delete', '/api/Account/Delete', params)
// 删除一组账户
export const AccountDeleteBatch = params => request('delete', '/api/Account/DeleteBatch', params)
// 修改账户
export const AccountUpdate = params => request('put', '/api/Account/Update', params)
// 修改账户状态
export const AccountUpdateStatus = params => request('put', '/api/Account/UpdateStatus', params)
// 更新账户密码
export const AccountUpdatePassword = params => request('put', '/api/Account/UpdatePassword', params)
// 获取账户
export const AccountGet = params => request('get', '/api/Account/Get', params)
// 获取所有账户
export const AccountGetAll = params => request('get', '/api/Account/GetAll', params)
// 获取所有项目
export const GetUserProjects = params => request('get', '/api/Account/GetUserProjects', params)
// 校验Token
export const VerifyToken = params => request('get', '/api/Account/VerifyToken', params)

/* --------------------------------------- Claim 功能控制器 ---------------------------------------- */
// 添加功能
export const ClaimAdd = params => request('post', '/api/Claim/Add', params)
// 删除功能
export const ClaimDelete = params => request('delete', '/api/Claim/Delete', params)
// 删除一组功能
export const ClaimDeleteBatch = params => request('delete', '/api/Claim/DeleteBatch', params)
// 更新功能
export const ClaimUpdate = params => request('put', '/api/Claim/Update', params)
// 获取所有功能
export const ClaimGetAll = params => request('get', '/api/Claim/GetAll', params)

/* --------------------------------------- Permission 接口到功能的映射控制器 ---------------------------------------- */
// 刷新接口到功能的映射
export const PermissionRefresh = params => request('post', '/api/Permission/Refresh', params)
// 更新一组接口到功能的映射
export const PermissionUpdateBatch = params => request('delete', '/api/Permission/UpdateBatch', params)
// 更新接口到功能的映射
export const PermissionUpdate = params => request('put', '/api/Permission/Update', params)
// 获取所有接口到功能的映射
export const PermissionGetAll = params => request('get', '/api/Permission/GetAll', params)

/* --------------------------------------- ClaimRole 角色到功能的映射控制器 ---------------------------------------- */
// 添加角色到功能的映射
export const ClaimRoleAdd = params => request('post', '/api/ClaimRole/Add', params)
// 删除角色到功能的映射
export const ClaimRoleDelete = params => request('delete', '/api/ClaimRole/Delete', params)
// 删除一组角色到功能的映射
export const ClaimRoleDeleteBatch = params => request('delete', '/api/ClaimRole/DeleteBatch', params)
// 更新角色到功能的映射
export const ClaimRoleUpdate = params => request('put', '/api/ClaimRole/Update', params)
// 更新一组角色到功能的映射
export const ClaimRoleAddOrUpdateBatch = params => request('put', '/api/ClaimRole/AddOrUpdateBatch', params)
// 获取所有角色到功能的映射
export const ClaimRoleGetAll = params => request('get', '/api/ClaimRole/GetAll', params)

/* --------------------------------------- Menu 菜单控制器 ---------------------------------------- */
// 添加菜单
export const MenuAdd = params => request('post', '/api/Menu/Add', params)
// 删除菜单
export const MenuDelete = params => request('delete', '/api/Menu/Delete', params)
// 更新菜单等级
export const MenuUpdateRank = params => request('put', '/api/Menu/UpdateRank', params)
// 更新菜单
export const MenuUpdate = params => request('put', '/api/Menu/Update', params)
// 获取所有菜单
export const MenuGet = params => request('get', '/api/Menu/Get', params)

/* --------------------------------------- MenuRole 角色到菜单的映射控制器 ---------------------------------------- */
// 添加角色到菜单的映射
export const MenuRoleAdd = params => request('post', '/api/MenuRole/Add', params)
// 删除角色到菜单的映射
export const MenuRoleDelete = params => request('delete', '/api/MenuRole/Delete', params)
// 删除一组角色到菜单的映射
export const MenuRoleDeleteBatch = params => request('delete', '/api/MenuRole/DeleteBatch', params)
// 更新角色到菜单的映射
export const MenuRoleUpdate = params => request('put', '/api/MenuRole/Update', params)
// 获取所有角色到菜单的映射
export const MenuRoleGetAll = params => request('get', '/api/MenuRole/GetAll', params)

/* --------------------------------------- Role 角色控制器 ---------------------------------------- */
// 添加角色
export const RoleAdd = params => request('post', '/api/Role/Add', params)
// 删除角色
export const RoleDelete = params => request('delete', '/api/Role/Delete', params)
// 删除一组角色
export const RoleDeleteBatch = params => request('delete', '/api/Role/DeleteBatch', params)
// 更新角色
export const RoleUpdate = params => request('put', '/api/Role/Update', params)
// 获取所有角色
export const RoleGetAll = params => request('get', '/api/Role/GetAll', params)

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

/* --------------------------------------- LibraryEmergency 应急预案控制器 ---------------------------------------- */
// 添加应急预案
export const LibraryEmergencyAdd = params => request('post', '/api/LibraryEmergency/Add', params)
// 删除应急预案
export const LibraryEmergencyDelete = params => request('delete', '/api/LibraryEmergency/Delete', params)
// 删除一组应急预案
export const LibraryEmergencyDeleteBatch = params => request('delete', '/api/LibraryEmergency/DeleteBatch', params)
// 更新应急预案
export const LibraryEmergencyUpdate = params => request('put', '/api/LibraryEmergency/Update', params)
// 获取所有应急预案
export const LibraryEmergencyGetAll = params => request('get', '/api/LibraryEmergency/GetAll', params)

/* --------------------------------------- LibraryMaintenance 保养经验控制器 ---------------------------------------- */
// 添加保养经验
export const LibraryMaintenanceAdd = params => request('post', '/api/LibraryMaintenance/Add', params)
// 删除保养经验
export const LibraryMaintenanceDelete = params => request('delete', '/api/LibraryMaintenance/Delete', params)
// 删除一组保养经验
export const LibraryMaintenanceDeleteBatch = params => request('delete', '/api/LibraryMaintenance/DeleteBatch', params)
// 更新保养经验
export const LibraryMaintenanceUpdate = params => request('put', '/api/LibraryMaintenance/Update', params)
// 获取所有保养经验
export const LibraryMaintenanceGetAll = params => request('get', '/api/LibraryMaintenance/GetAll', params)

/* --------------------------------------- LibraryProblem 问题代码控制器 ---------------------------------------- */
// 添加问题代码
export const LibraryProblemAdd = params => request('post', '/api/LibraryProblem/Add', params)
// 删除问题代码
export const LibraryProblemDelete = params => request('delete', '/api/LibraryProblem/Delete', params)
// 删除一组问题代码
export const LibraryProblemDeleteBatch = params => request('delete', '/api/LibraryProblem/DeleteBatch', params)
// 更新问题代码
export const LibraryProblemUpdate = params => request('put', '/api/LibraryProblem/Update', params)
// 获取所有问题代码
export const LibraryProblemGetAll = params => request('get', '/api/LibraryProblem/GetAll', params)

/* --------------------------------------- LibraryRepair 维修经验控制器 ---------------------------------------- */
// 添加维修经验
export const LibraryRepairAdd = params => request('post', '/api/LibraryRepair/Add', params)
// 删除维修经验
export const LibraryRepairDelete = params => request('delete', '/api/LibraryRepair/Delete', params)
// 删除一组维修经验
export const LibraryRepairDeleteBatch = params => request('delete', '/api/LibraryRepair/DeleteBatch', params)
// 更新维修经验
export const LibraryRepairUpdate = params => request('put', '/api/LibraryRepair/Update', params)
// 获取所有维修经验
export const LibraryRepairGetAll = params => request('get', '/api/LibraryRepair/GetAll', params)

/* --------------------------------------- ProblemRepair 问题代码和维修经验的映射控制器 ---------------------------------------- */
// 添加问题代码和维修经验的映射
export const ProblemRepairAdd = params => request('post', '/api/ProblemRepair/Add', params)
// 删除问题代码和维修经验的映射
export const ProblemRepairDelete = params => request('delete', '/api/ProblemRepair/Delete', params)
// 删除一组问题代码和维修经验的映射
export const ProblemRepairDeleteBatch = params => request('delete', '/api/ProblemRepair/DeleteBatch', params)
// 更新问题代码和维修经验的映射
export const ProblemRepairUpdate = params => request('put', '/api/ProblemRepair/Update', params)
// 获取所有问题代码和维修经验的映射
export const ProblemRepairGetAll = params => request('get', '/api/ProblemRepair/GetAll', params)

/* --------------------------------------- Meta 元数据控制器 ---------------------------------------- */
// 添加元数据
export const MetaAdd = params => request('post', '/api/Meta/Add', params)
// 删除元数据
export const MetaDelete = params => request('delete', '/api/Meta/Delete', params)
// 删除一组元数据
export const MetaDeleteBatch = params => request('delete', '/api/Meta/DeleteBatch', params)
// 更新元数据
export const MetaUpdate = params => request('put', '/api/Meta/Update', params)
// 获取所有元数据
export const MetaGetAll = params => request('get', '/api/Meta/GetAll', params)

/* --------------------------------------- Project 项目控制器 ---------------------------------------- */
// 添加项目
export const ProjectAdd = params => request('post', '/api/Project/Add', params)
// 删除项目
export const ProjectDelete = params => request('delete', '/api/Project/Delete', params)
// 更新项目
export const ProjectUpdate = params => request('put', '/api/Project/Update', params)
// 获取项目
export const ProjectGet = params => request('get', '/api/Project/Get', params)
// 获取所有项目
export const ProjectGetAll = params => request('get', '/api/Project/GetAll', params)

/* --------------------------------------- ProjectRole 用户和项目以及角色的映射控制器 ---------------------------------------- */
// 添加用户和项目以及角色的映射
export const ProjectRoleAdd = params => request('post', '/api/ProjectRole/Add', params)
// 删除用户和项目以及角色的映射
export const ProjectRoleDelete = params => request('delete', '/api/ProjectRole/Delete', params)
// 删除一组用户和项目以及角色的映射
export const ProjectRoleDeleteBatch = params => request('delete', '/api/ProjectRole/DeleteBatch', params)
// 更新用户和项目以及角色的映射
export const ProjectRoleUpdate = params => request('put', '/api/ProjectRole/Update', params)
// 获取所有用户和项目以及角色的映射
export const ProjectRoleGetAll = params => request('get', '/api/ProjectRole/GetAll', params)

/* --------------------------------------- Resource 资源控制器 ---------------------------------------- */
// 删除资源
export const ResourceDelete = params => request('delete', '/api/Resource/Delete', params)
// 删除一组用户和项目以及角色的映射
export const ResourceDeleteBatch = params => request('delete', '/api/Resource/DeleteBatch', params)
// 更新资源
export const ResourceUpdate = params => request('put', '/api/Resource/Update', params)
// 获取资源
export const ResourceGet = params => request('get', '/api/Resource/Get', params)
// 获取所有资源
export const ResourceGetAll = params => request('get', '/api/Resource/GetAll', params)

/* --------------------------------------- Skill 技能控制器 ---------------------------------------- */
// 添加技能
export const SkillAdd = params => request('post', '/api/Skill/Add', params)
// 添加技能资源
export const SkillAddResource = params => request('post', '/api/Skill/AddResource', params)
// 删除技能
export const SkillDelete = params => request('delete', '/api/Skill/Delete', params)
// 删除一组技能
export const SkillDeleteBatch = params => request('delete', '/api/Skill/DeleteBatch', params)
// 更新技能
export const SkillUpdate = params => request('put', '/api/Skill/Update', params)
// 获取所有技能
export const SkillGetAll = params => request('get', '/api/Skill/GetAll', params)

/*

Project V1 API

*/

/* --------------------------------------- Building 建筑控制器 ---------------------------------------- */
// 添加建筑
export const BuildingAdd = params => request('post', '/api/Building/Add', params)
// 删除建筑
export const BuildingDelete = params => request('delete', '/api/Building/Delete', params)
// 删除一组建筑
export const BuildingDeleteBatch = params => request('delete', '/api/Building/DeleteBatch', params)
// 更新建筑
export const BuildingUpdate = params => request('put', '/api/Building/Update', params)
// 获取建筑
export const BuildingGet = params => request('get', '/api/Building/Get', params)
// 获取所有建筑
export const BuildingGetAll = params => request('get', '/api/Building/GetAll', params)

/* --------------------------------------- CostCenter 成本中心控制器 ---------------------------------------- */
// 添加成本中心
export const CostCenterAdd = params => request('post', '/api/CostCenter/Add', params)
// 删除成本中心
export const CostCenterDelete = params => request('delete', '/api/CostCenter/Delete', params)
// 删除一组成本中心
export const CostCenterDeleteBatch = params => request('delete', '/api/CostCenter/DeleteBatch', params)
// 更新成本中心
export const CostCenterUpdate = params => request('put', '/api/CostCenter/Update', params)
// 获取所有成本中心
export const CostCenterGetAll = params => request('get', '/api/CostCenter/GetAll', params)

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
// 获取所有设备
export const DeviceExport = params => request('get', '/api/Device/Export', params)
// 获取所有设备
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

// ------------------------------------------------------测试--------------------------------
