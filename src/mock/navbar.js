export const Navbar = [
    // {
    //     id: 'privilege',
    //     text: '权限管理',
    //     selectedId: 'privilege',
    //     primaryPath: '/plat/admin',
    //     children: [
    //         {
    //             id: 'admin',
    //             text: '管理员',
    //             path: '/plat/admin'
    //         }
    //     ]
    // },
    {
        id: 'users',
        text: '用户管理',
        selectedId: 'users',
        primaryPath: '/plat/users',
        children: [
            {
                id: 'usersManager',
                text: '用户管理',
                path: '/plat/users'
            }
        ]
    },
    {
        id: 'schools',
        text: '学校管理',
        selectedId: 'schools',
        primaryPath: '/plat/schools',
        children: [
            {
                id: 'schoolsManager',
                text: '学校管理',
                path: '/plat/schools'
            }
        ]
    },
    {
        id: 'courses',
        text: '课程管理',
        selectedId: 'courses',
        primaryPath: '/plat/courses',
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
        primaryPath: '/plat/TutorsResources',
        children: [
            // {
            //     id: 'courseResources',
            //     text: '课程资料',
            //     path: '/plat/courseResources'
            // },
            // {
            //     id: 'examResources',
            //     text: '考试资料',
            //     path: '/plat/examResources'
            // },
            {
                id: 'TutorsResources',
                text: '讲师资料',
                path: '/plat/TutorsResources'
            },
            {
                id: 'courseTypes',
                text: '课程类型',
                path: '/plat/courseTypes'
            }
        ]
    }
]
