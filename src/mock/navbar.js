export const Navbar = [
    {
        id: 'privilege',
        text: '权限管理',
        selectedId: 'privilege',
        children: [
            {
                id: 'admin',
                text: '管理员',
                path: '/plat/admin'
            }
        ]
    },
    {
        id: 'users',
        text: '用户管理',
        selectedId: 'uses',
        children: [
            {
                id: 'usersManager',
                text: '管理员',
                path: '/plat/uses'
            }
        ]
    },
    {
        id: 'schools',
        text: '学校管理',
        selectedId: 'schools',
        children: [
            {
                id: 'schoolsManager',
                text: '管理员',
                path: '/plat/schools'
            }
        ]
    },
    {
        id: 'courses',
        text: '课程管理',
        selectedId: 'courses',
        children: [
            {
                id: 'coursesManager',
                text: '课程管理',
                path: '/plat/courses'
            }
        ]
    },
    {
        id: 'resources',
        text: '资源管理',
        selectedId: 'resources',
        children: [
            {
                id: 'courseResources',
                text: '课程资料',
                path: '/plat/resources/courseResources'
            },
            {
                id: 'examResources',
                text: '考试资料',
                path: '/plat/resources/examResources'
            },
            {
                id: 'teacherResources',
                text: '讲师资料',
                path: '/plat/resources/teacherResources'
            },
            {
                id: 'coursesTypes',
                text: '课程类型',
                path: '/plat/resources/coursesTypes'
            }
        ]
    }
]
