import { ref } from 'vue'

export function useUsers() {
    const users = ref([])
    const loading = ref(false)
    const error = ref(null)

    const fetchUsers = async () => {
        loading.value = true
        error.value = null

        try {
            const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/users`
            const response = await fetch(apiUrl)
            const data = await response.json()
            users.value = data.map(user => ({
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                phone: user.phone
            }))
        } catch (err) {
            error.value = 'Error al cargar los usuarios'
        } finally {
            loading.value = false
        }
    }

    const addUser = (userData) => {
        const newId = users.value.length > 0
            ? Math.max(...users.value.map(u => u.id)) + 1
            : 1

        const newUser = {
            id: newId,
            ...userData
        }

        users.value.push(newUser)
    }

    const updateUser = (id, userData) => {
        const index = users.value.findIndex(u => u.id === id)
        if (index !== -1) {
            users.value[index] = { id, ...userData }
        }
    }

    const deleteUser = (id) => {
        users.value = users.value.filter(u => u.id !== id)
    }

    return {
        users,
        loading,
        error,
        fetchUsers,
        addUser,
        updateUser,
        deleteUser
    }
}
