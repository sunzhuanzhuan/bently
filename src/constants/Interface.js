export default {
	common: {
		getCompanyList: '/export/account/getCompanyList',
		getAllPlatform: '/platform/getAll',
		getChineseCities: '/operator-gateway/common/v1/chineseCities',
		getToken: '/toolbox-gateway/file/v1/getToken',
	},
	sourceRulesUrl: {
		add: '/sourceRule/add',
		delete: '/rbac/deleteResourceRule',
		get: '/sourceRule/getSourceRules'
	},
	roleUrl: {
		add: '/rbac/addRoles',
		delete: '/rbac/deleteRoles',
		update: '/rbac/updateRoles',
		get: '/rbac/getRolesList'
	},
	roleRelationUrl: {
		update: '/rbac/updateUserRole',
		get: '/rbac/getUserRoleList'
	},
	auth: {
		getAuthorizations: 'rbac/getAuthorizations'
	}
}
