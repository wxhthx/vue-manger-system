import Overview from '@/components/overview/Overview'
import Login from '@/components/login/Login'

export const Navbar = [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
        path: '/plat',
        name: 'plat',
        component: Overview,
        children: [
            {
                path: 'overview',
                name: 'overview',
                component: Overview
            }
        ]
    }
]
