import Navbar from '@/components/navbar/Navbar'
import Overview from '@/components/overview/Overview'
import Login from '@/components/login/Login'
import Admin from '@/components/admin/Admin'
import UsersManage from '@/components/users/UsersManage'
import CoursesManager from '@/components/courses/CoursesManager'
import SchoolsManager from '@/components/schools/SchoolsManager'
import CourseResources from '@/components/resources/course/CourseResources'
import ExamResources from '@/components/resources/exam/ExamResources'
import TeacherResources from '@/components/resources/teacher/TeacherResources'
import CourseTypes from '@/components/resources/courseTypes/CourseTypes'
import AddAdmin from '@/components/admin/add/AddAdmin'
import Details from '@/components/admin/details/Details'
export const RouterData = [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
        path: '/plat',
        name: 'plat',
        component: Overview,
        children: [
            {
                path: 'admin',
                name: 'admin',
                components: {
                    navbar: Navbar,
                    main: Admin
                }
            },
            {
                path: 'adminAdd',
                name: 'adminAdd',
                components: {
                    navbar: Navbar,
                    main: AddAdmin
                }
            },
            {
                path: 'adminDetail/:id',
                name: 'adminDetail',
                component: Details
            },
            {
                path: 'users',
                name: 'users',
                components: {
                    navbar: Navbar,
                    main: UsersManage
                }
            },
            {
                path: 'schools',
                name: 'schools',
                components: {
                    navbar: Navbar,
                    main: SchoolsManager
                }
            },
            {
                path: 'courses',
                name: 'courses',
                components: {
                    navbar: Navbar,
                    main: CoursesManager
                }
            },    
            {   
                path: 'courseResources',
                name: 'courseResources',
                components: {
                    navbar: Navbar,
                    main: CourseResources
                }
            },
            {   
                path: 'examResources',
                name: 'examResources',
                components: {
                    navbar: Navbar,
                    main: ExamResources
                }
            },
            {   
                path: 'teacherResources',
                name: 'teacherResources',
                components: {
                    navbar: Navbar,
                    main: TeacherResources
                }
            },
            {   
                path: 'courseTypes',
                name: 'courseTypes',
                components: {
                    navbar: Navbar,
                    main: CourseTypes
                }
            }
        ]
    }
]