import axios, { AxiosError } from 'axios'
import { defineStore } from 'pinia'
const backendUrl = import.meta.env.VITE_API_BACKEND_URL

export const useAuthStore = defineStore('auth', {
	state: () => ({
		token: localStorage.getItem('token'),
		user: JSON.parse(localStorage.getItem('user') || 'null'),
		role: localStorage.getItem('role'),
	}),

	getters: {
		isAuthenticated: (state) => !!state.token,
		getUser: (state) => state.user,
		isValidToken: (state) => {
			if (!state.token) return false
			try {
				const payload = JSON.parse(atob(state.token.split('.')[1]))
				return payload.exp * 1000 > Date.now()
			} catch {
				return false
			}
		},
		hasValidRole: (state) => {
			if (!state.token || !state.role) return false
			try {
				const payload = JSON.parse(atob(state.token.split('.')[1]))
				return payload.role === state.role
			} catch {
				return false
			}
		},
	},
	actions: {
		async validateToken() {
			try {
				const response = await axios.get(`${backendUrl}/api/validate-token`, {
					headers: { Authorization: `Bearer ${this.token}` },
				})
				return response.data.valid
			} catch {
				return false
			}
		},
		async login(email: string, password: string) {
			try {
				const response = await axios.post(`${backendUrl}/api/login`, { email, password })

				const { token, user, role } = response.data

				this.token = token
				this.user = user
				this.role = role

				localStorage.setItem('token', token)
				localStorage.setItem('user', JSON.stringify(user))
				localStorage.setItem('role', role)

				return true
			} catch (error: unknown) {
				if (axios.isAxiosError(error)) {
					const axiosError = error as AxiosError
					console.error('Login failed:', axiosError.response?.data || axiosError.message)
				} else if (error instanceof Error) {
					console.error('Login failed:', error.message)
				} else {
					console.error('Login failed: Unknown error')
				}
				return false
			}
		},
		async logout() {
			try {
				const response = await axios.post(`${backendUrl}/api/logout`, {})

				if (response.status !== 200) {
					throw new Error('Logout failed')
				}

				this.token = null
				this.user = null
				this.role = null
				localStorage.removeItem('token')
				localStorage.removeItem('user')
				localStorage.removeItem('role')
				window.location.href = '/auth/login'
			} catch (error: unknown) {
				if (axios.isAxiosError(error)) {
					const axiosError = error as AxiosError
					console.error('Logout failed:', axiosError.response?.data || axiosError.message)
				} else if (error instanceof Error) {
					console.error('Logout failed:', error.message)
				} else {
					console.error('Logout failed: Unknown error')
				}
			}
		},
	},
})
