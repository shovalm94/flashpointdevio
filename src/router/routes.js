
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
      {path: 'backOffice/chapters/:courseId', component: () => import('../pages/BackOffice/Chapters'), meta: {authNotRequired: true}},
      {path: 'backOffice/lessons', component: () => import('../pages/BackOffice/Lessons'), meta: {authNotRequired: true}},
      {path: 'backOffice/updateChapters/:courseId/:chapterId', component: () => import('../pages/BackOffice/UpdateChapters'), meta: {authNotRequired: true}},
      {path: 'backOffice/updateLesson/:lessonId', component: () => import('pages/BackOffice/UpdateLesson'), meta: {authNotRequired: true}},
      {path: 'backOffice/createCourse', component: () => import('../pages/BackOffice/Creator'), meta: {authNotRequired: true}},
      {path: 'backOffice/updateCourse', component: () => import('pages/BackOffice/UpdateCoursePropertyDialog'), meta: {authNotRequired: true}},
      {path: 'backOffice/singleCourse', component: () => import('../pages/BackOffice/singleCourseShow'), meta: {authNotRequired: true}},
      {path: 'backOffice/UpdateCoursePropertyDialog', component: () => import('../pages/BackOffice/UpdateCoursePropertyDialog'), meta: {authNotRequired: true}},
      {path: 'backOffice/Students', component: () => import('../pages/BackOffice/Students'), meta: {authNotRequired: true}},

    ],
  },




    // Always leave this as last one, but you can also remove it
      {
      path: '*',
      component: () => import('pages/Error404.vue')
    }
]


export default routes
