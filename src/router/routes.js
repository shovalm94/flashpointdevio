
const routes = [

  //Main Layouts Paths
  {
    path: '/', component: () => import('../layouts/Nav.vue'), meta: {authNotRequired: true} ,

    children: [
      { path: '/login', component: () => import('../pages/Login'), meta:{authNotRequired: true}},
      { path: '/', component: () => import('../pages/Home'), meta: {authNotRequired: false}},
      { path: '/school', component: () => import('pages/Courses/School'), meta: {authNotRequired: false}},
      {path: '/profile/:id', component: () => import('../pages/Profile/Profile'), meta: {authNotRequired: false}},
      {path: 'profile/edit-profile/:id', component: () => import('../pages/Profile/EditProfile'), meta: {authNotRequired: false}},
      {path: 'profile/settings/:id', component: () => import('../pages/Profile/Settings'), meta: {authNotRequired: false}},
      {path: '/display', component: () => import('../pages/Profile/SubSettings/Display'), meta: {authNotRequired: false}},
      {path: '/push-notifications', component: () => import('pages/Profile/SubSettings/PushNotifications'), meta: {authNotRequired: false}},
      {path: '/privacy-and-security', component: () => import('../pages/Profile/SubSettings/PrivacyAndSecurity'), meta: {authNotRequired: true}},
      {path: '/delete-account/:id', component: () => import('../pages/Profile/SubSettings/DeleteAccount'), meta: {authNotRequired: true}},
      {path: '/app-info', component: () => import('../pages/Profile/SubSettings/AppInfo'), meta: {authNotRequired: true}},

    ],
  },




    // Always leave this as last one, but you can also remove it
      {
      path: '*',
      component: () => import('pages/Error404.vue')
    }
]


export default routes
