import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/app/AppLayout.vue'
import AuthLayout from '@/layouts/auth/AuthLayout.vue'
// import { useAuthStore } from '@/stores/authStore';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/auth',
			component: AuthLayout,
			children: [
				{
					path: 'login',
					name: 'login',
					component: () => import('../views/auth/LoginPage.vue'),
				},
				{
					path: 'register',
					name: 'register',
					component: () => import('../views/auth/RegisterPage.vue'),
				},
				{
					path: 'forgot-password',
					name: 'forgot-password',
					component: () => import('../views/auth/ForgotPasswordPage.vue'),
				},
				{
					path: 'reset-password',
					name: 'reset-password',
					component: () => import('../views/auth/ResetPasswordPage.vue'),
				},
			],
		},
		{
			path: '/',
			component: AppLayout,
			children: [
				{
					path: '/dashboard',
					name: 'admin-dashboard',
					component: () => import('../views/dashboard/AdminDashboardPage.vue'),
				},
				{
					path: '/dashboard',
					name: 'faculty-dashboard',
					component: () => import('../views/dashboard/FacultyDashboardPage.vue'),
				},
				{
					path: '/users-mgmt',
					name: 'user-management',
					component: () => import('../views/user/UserManagementPage.vue'),
				},
				{
					path: '/users-mgmt/create',
					name: 'create-user-account',
					component: () => import('../views/user/CreateEditUserAccountPage.vue'),
				},
				{
					path: 'users-mgmt/edit/:ref',
					name: 'user-account-edit',
					component: import('../views/user/CreateEditUserAccountPage.vue'),
					props: true,
				},
				{
					path: '/courses',
					name: 'course-management',
					component: () => import('../views/course/CourseManagementPage.vue'),
				},

				{
					path: '/students',
					name: 'student-management',
					component: () => import('../views/student/StudentManagementPage.vue'),
				},

				{
					path: '/classes',
					name: 'class-management',
					component: () => import('../views/class/ClassManagement.vue'),
				},
				{
					path: '/classes/:ref',
					name: 'class-details',
					component: () => import('../views/class/ClassDetailsPage.vue'),
					props: true,
				},

				{
					path: '/attendance-logs',
					name: 'attendance-logs',
					component: () => import('../views/auditlogs/AttendancePage.vue'),
				},
				{
					path: '/audit-logs',
					name: 'audit-logs',
					component: () => import('../views/auditlogs/AuditLogPage.vue'),
				},
				{
					path: '/settings',
					name: 'settings',
					component: () => import('../views/user/SettingsPage.vue'),
				},
			],
		},
		{
			path: '/e',
			component: AuthLayout,
			children: [
				{
					path: '/:pathMatch(.*)*',
					name: 'not-found',
					component: () => import('../views/error/NotFoundPage.vue'),

				},
				{
					path: '/unauthorized',
					name: 'unauthorized',
					component: () => import('../views/error/UnauthorizedPage.vue'),
				},
			],
		},
	],
})

// router.beforeEach(async (to) => {
//     const auth = useAuthStore();

//     if (to.meta.requiresAuth) {
//         const isValid = await auth.validateToken();
//         if (!isValid) {
//             return '/login';
//         }
//     }
//     return true;
// });

export default router
