export default {
    sourceRulesUrl: {
        add: '/sourceRule/add',
        delete: '/rbac/deleteResourceRule',
        get: '/sourceRule/getSourceRules',
        export: '/rbac/exportResource',
        import: '/api/rbac/importResource'
    },
    roleUrl: {
        add: '/rbac/addRoles',
        delete: '/rbac/deleteRoles',
        update: '/rbac/updateRoles',
        get: '/rbac/getRolesList'
    },
    roleRelationUrl: {
        update: '/rbac/operateUserRole',
        get: '/rbac/getUserRoleList'
    },
    roleAuthorityUrl: {
        get: '/rbac/getRolesAssignments',
        add: '/rbac/operateAssignments',
        delete: '/rbac/deleteAssignments'
    },
    authority: {
        get: '/rbac/getUserRoleAssignments'
    },
    navGroupUrl: {
        get: '/rbac/getNavigationAssembly',
        add: '/rbac/addNavigationCombinations',
        update: '/rbac/updateNavigationCombinations',
        delete: '/rbac/deleteNavigationCombinations',
        export: '/rbac/exportNavigationCate',
        import: '/api/rbac/importNavigationCate'
    }

}
