import Navbar from '@/components/navbar/Navbar'
import Overview from '@/components/overview/Overview'
import Login from '@/components/login/Login'
import Admin from '@/components/admin/Admin'
import UsersManage from '@/components/users/UsersManage'
import AddUser from '@/components/users/add/AddUser'
import CoursesManager from '@/components/courses/CoursesManager'
import AddCourse from '@/components/courses/add/AddCourse'
import SchoolsManager from '@/components/schools/SchoolsManager'
import AddSchool from '@/components/schools/add/AddSchool'
import CourseResources from '@/components/resources/course/CourseResources'
import ExamResources from '@/components/resources/exam/ExamResources'
import TutorsResources from '@/components/resources/tutors/TutorsResources'
import AddTutor from '@/components/resources/tutors/add/AddTutor'
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
                path: 'addAdmin',
                name: 'addAdmin',
                components: {
                    navbar: Navbar,
                    main: AddAdmin
                }
            },
            {
                path: 'adminDetail/:id',
                name: 'adminDetail',
                components: {
                    navbar: Navbar,
                    main: Details
                }
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
                path: 'addUser/:id',
                name: 'addUser',
                components: {
                    navbar: Navbar,
                    main: AddUser
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
                path: 'addSchool/:id',
                name: 'addSchool',
                components: {
                    navbar: Navbar,
                    main: AddSchool
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
                path: 'addCourse/:id',
                name: 'addCourse',
                components: {
                    navbar: Navbar,
                    main: AddCourse
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
                path: 'TutorsResources',
                name: 'TutorsResources',
                components: {
                    navbar: Navbar,
                    main: TutorsResources
                }
            },
            {
                path: 'addTutor/:id',
                name: 'addTutor',
                components: {
                    navbar: Navbar,
                    main: AddTutor
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
