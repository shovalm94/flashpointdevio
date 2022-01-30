
const routes = [

  //Main Layouts Paths
  {
    path: '/', component: () => import('../layouts/Nav.vue'), meta: {authNotRequired: true} ,

    children: [
      { path: '/login', component: () => import('../pages/Login'), meta:{authNotRequired: true}},
      { path: '/home', component: () => import('../pages/Home'), meta: {authNotRequired: false}} ,
      { path: '/school', component: () => import('pages/Courses/School'), meta: {authNotRequired: false}},
      {path: '/profile/:id', component: () => import('../pages/Profile/Profile'), meta: {authNotRequired: false}},
      {path: '/edit-profile/:id', component: () => import('../pages/Profile/EditProfile'), meta: {authNotRequired: false}},
      {path: '/settings/:id', component: () => import('../pages/Profile/Settings'), meta: {authNotRequired: false}},
      {path: '/display', component: () => import('../pages/Profile/SubSettings/Display'), meta: {authNotRequired: false}},
      {path: '/push-notifications', component: () => import('pages/Profile/SubSettings/PushNotifications'), meta: {authNotRequired: false}},
      {path: '/privacy-and-security', component: () => import('../pages/Profile/SubSettings/PrivacyAndSecurity'), meta: {authNotRequired: true}},
      {path: '/help-and-support', component: () => import('../pages/Profile/SubSettings/HelpAndSupport'), meta: {authNotRequired: true}},
      {path: '/app-info', component: () => import('../pages/Profile/SubSettings/AppInfo'), meta: {authNotRequired: true}},
      {path: '/createCourse', component: () => import('../pages/BackOffice/Creator'), meta: {authNotRequired: true}},
      {path: '/updateCourse', component: () => import('../components/CourseComps/UpdateCoursePropertyDialog'), meta: {authNotRequired: true}},
      {path: '/singleCourse', component: () => import('../pages/BackOffice/singleCourseShow'), meta: {authNotRequired: true}},

    ],
  },




    // Always leave this as last one, but you can also remove it
      {
      path: '*',
      component: () => import('pages/Error404.vue')
    }
]


export default routes
