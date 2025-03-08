<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { url } from '@/lib/api'
import { useRouter } from 'vue-router'


enum RoleEnum {
  USER = 0,
  ADMIN = 1
}

class User {
  public Id: number
  public Name: string
  public Email: string
  public Password: string
  public Role: RoleEnum
  public CreationDate: string | null
  public ModifiedDate: string | null
  public DeletionDate: string | null

  constructor(
    Id: number,
    Name: string,
    Email: string,
    Password: string,
    Role: RoleEnum,
    DeletionDate?: string | null,
    ModifiedDate?: string | null,
    CreationDate?: string | null
  ) {
    this.Id = Id
    this.Name = Name
    this.Email = Email
    this.Password = Password
    this.Role = Role
    this.DeletionDate = DeletionDate ?? null
    this.ModifiedDate = ModifiedDate ?? null
    this.CreationDate = CreationDate ?? null
  }
}

const users = ref<User[]>([])
const store = useUserStore()
const currentLoggedUserId = computed(() => store.userId)
const token = localStorage.getItem("Token-Watch")
const router = useRouter();
const userStore = useUserStore();

if(!token) router.push('/login');

const isAdmin = computed(() => store.userData?.Role == RoleEnum.ADMIN)

const visibleUsers = computed(() => {
  return isAdmin.value
    ? users.value
    : users.value.filter((u) => u.Id === currentLoggedUserId.value)
})

const isModalOpen = ref(false)
const isEditing = ref(false)
const currentUser = ref<User>(new User(0, '', '', '', RoleEnum.USER))

const loadUserDetails = async (userId: number) => {
  try {
    const response = await axios.get(`${url}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const userDetails = response.data.data;
    
    const user = users.value.find(u => u.Id === userId);

    console.log(user);

    if (user) {
      user.Password = userDetails.Password;
      user.Role = userDetails.Role;
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
}

const loadUsers = async () => {
  try {
    const response = await axios.get(`${url}/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    users.value = response.data.data;

    users.value.forEach(user => {
      loadUserDetails(user.Id);
    });
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

onMounted(() => {
  loadUsers()
})

const openNewUserModal = () => {
  currentUser.value = new User(0, '', '', '', RoleEnum.USER)
  isEditing.value = false
  isModalOpen.value = true
}

const openEditUserModal = (user: User) => {
  if (user.Id === currentLoggedUserId.value) {
    currentUser.value = { ...user }
    isEditing.value = true
    isModalOpen.value = true
  }
}

const saveUser = async () => {
  try {
    if (isEditing.value) {
      currentUser.value.ModifiedDate = new Date().toISOString().split('T')[0];
      await axios.put(`${url}/users/${currentUser.value.Id}`, currentUser.value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      userStore.userData = { ...currentUser.value };
    } else {
      currentUser.value.CreationDate = new Date().toISOString().split('T')[0];
      await axios.post(`${url}/users`, currentUser.value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });      
    }

    await loadUsers();
    isModalOpen.value = false;
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

const deleteUser = async (userId: number) => {
  try {
    await axios.delete(`${url}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    await loadUsers()
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}
</script>


<template>
  <div>
    <page-header>Seção de Usuários</page-header>

    <Card>
      <CardHeader class="flex flex-row justify-between">
        <CardTitle>Lista de Usuários</CardTitle>
        <div v-if="isAdmin">
          <Button variant="default" @click="openNewUserModal">Novo Usuário</Button>
        </div>
      </CardHeader>
      <CardContent>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in visibleUsers" :key="user.Id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.Id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.Name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.Email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ user.Role === RoleEnum.ADMIN ? 'Admin' : 'User' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div class="flex space-x-2">
                  <Button v-if="user.Id === currentLoggedUserId" variant="outline" size="sm" @click="openEditUserModal(user)">Editar</Button>
                  <Button variant="outline" size="sm" @click="deleteUser(user.Id)" v-if="isAdmin">
                    Excluir
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>

    <Dialog v-model:open="isModalOpen">
      <DialogContent>
        <DialogHeader>
          <CardTitle>{{ isEditing ? 'Editar Usuário' : 'Novo Usuário' }}</CardTitle>
        </DialogHeader>
        <div class="space-y-4 mt-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Nome</label>
            <Input v-model="currentUser.Name" id="name" placeholder="Nome do usuário" />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <Input v-model="currentUser.Email" id="email" placeholder="Email do usuário" />
          </div>
          <div v-if="!isEditing">
            <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
            <Input v-model="currentUser.Password" id="password" type="password" placeholder="Senha" />
          </div>
          <div v-if="isAdmin">
            <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
            <select
              v-model="currentUser.Role"
              id="role"
              class="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            >
              <option :value="RoleEnum.ADMIN">Admin</option>
              <option :value="RoleEnum.USER">User</option>
            </select>
          </div>
        </div>
        <DialogFooter class="mt-4">
          <Button variant="outline" @click="isModalOpen = false">Cancelar</Button>
          <Button variant="default" @click="saveUser">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>