import Overview from '@/components/overview/Overview'
import Login from '@/components/login/Login'
import Admin from '@/components/admin/Admin'
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
            }
        ]
    }
]
