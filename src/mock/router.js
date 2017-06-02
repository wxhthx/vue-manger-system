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
                component: Admin        
            },
            {
                path: 'users',
                name: 'users',
                component: UsersManage
            },
            {
                path: 'schools',
                name: 'schools',
                component: SchoolsManager
            },
            {
                path: 'courses',
                name: 'courses',
                component: CoursesManager
            },
            {
                path: 'resources',
                name: 'resources',
                children: [
                    {
                        path: 'courseResources',
                        name: 'courseResources',
                        component: CourseResources
                    },
                    {
                        path: 'examResources',
                        name: 'examResources',
                        component: ExamResources
                    },
                    {
                        path: 'teacherResources',
                        name: 'teacherResources',
                        component: TeacherResources
                    },
                    {
                        path: 'courseTypes',
                        name: 'courseTypes',
                        component: CourseTypes
                    }
                ]
            }
        ]
    }
]
