<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DateRangePicker } from '@/components/ui/daterange-picker'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogFooter } from '@/components/ui/dialog'
import axios from 'axios'
import { url } from '@/lib/api'

const categories = ref<any[]>([])
const tasks = ref<any[]>([])
const isCategoryModalOpen = ref(false)
const isEditCategoryModalOpen = ref(false)
const categoryName = ref('')
const categoryEditId = ref('')
const isModalOpen = ref(false)
const currentTask = ref<any>(null)
const inviteEmail = ref('')
const invitations = ref<any[]>([])
const toast = useToast();

import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useToast } from 'vue-toastification'

const router = useRouter()
const token = localStorage.getItem('Token-Watch')
if (!token) router.push('/login')

const store = useUserStore()

const fetchCategoriesAndTasks = async () => {
  try {
    const token = localStorage.getItem('Token-Watch')
    if (!token) return

    const categoryResponse = await axios.get(`${url}/categories/user/${store.userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    categories.value = categoryResponse.data.data || []

    const taskResponse = await axios.get(`${url}/tasks/user/${store.userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    tasks.value = taskResponse.data.data || []
  } catch (error) {
    console.error('Erro ao buscar dados:', error)
  }
}

onMounted(() => {
  fetchCategoriesAndTasks()
})

const addCategory = async () => {
  if (categoryName.value.trim() !== '') {
    try {
      const token = localStorage.getItem('Token-Watch')

      const today = new Date().toISOString()

      const payload = {
        Name: categoryName.value.trim(),
        AssignedTo: store.userId ? parseInt(store.userId) : 0,
        DeletionDate: null,
        ModifiedDate: today,
        CreationDate: today
      }

      const response = await axios.post(`${url}/categories`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.status === 201) {
        categories.value.push(response.data.data)
        categoryName.value = ''
        isCategoryModalOpen.value = false
      } else {
        console.error('Erro ao adicionar categoria:', response)
      }
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error)
    }
  }
}

const editCategory = async () => {
  try {
    const token = localStorage.getItem('Token-Watch')

    const today = new Date().toISOString()

    const payload = {
      Id: categoryEditId.value,
      Name: categoryName.value.trim(),
      DeletionDate: null,
      ModifiedDate: today,
      CreationDate: today
    }

    const response = await axios.put(`${url}/categories/${categoryEditId.value}`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (response.status === 200) {
      const index = categories.value.findIndex((cat) => cat.Id === categoryEditId.value)

      if (index !== -1) {
        categories.value[index] = response.data.data
      }
      categoryName.value = ''
      isEditCategoryModalOpen.value = false
    } else {
      console.error('Erro ao editar categoria:', response)
    }
  } catch (error) {
    console.error('Erro ao editar categoria:', error)
  }
}

const currentCategory = ref<{ id: number | null; name: string }>({
  id: null,
  name: ''
})

const openCategoryModal = (categoryId: number) => {
  const categoryToEdit = categories.value.find((category) => category.Id === categoryId)

  isCategoryModalOpen.value = true
  if (categoryToEdit) {
    currentCategory.value = {
      id: categoryToEdit.Id,
      name: categoryToEdit.name
    }
  }
}

const openEditCategoryModal = (categoryId: number) => {
  const categoryToEdit = categories.value.find((category) => category.Id === categoryId)

  if (categoryToEdit) {
    categoryEditId.value = categoryToEdit.Id
    categoryName.value = categoryToEdit.name
    isEditCategoryModalOpen.value = true
  }
}

const deleteCategory = async (category: any) => {
  try {
    const token = localStorage.getItem('Token-Watch')
    await axios.delete(`${url}/categories/${category.Id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    categories.value = categories.value.filter((c) => c !== category)
  } catch (error) {
    console.error('Erro ao excluir categoria:', error)
  }
}

const addTask = () => {
  currentTask.value = {
    id: null,
    title: '',
    description: '',
    completed: false,
    categoryId: 0,
    status: 'Pendente',
    priority: 'Média',
    assignedTo: '',
    dueDate: '',
    progress: 0,
    deletionDate: null,
    modifiedDate: '',
    creationDate: '',
    invitedUsers: [] as string[]
  }
  inviteEmail.value = ''
  isModalOpen.value = true
}

const openEditTaskModal = (taskId: number) => {
  console.log(taskId);
  const taskToEdit = tasks.value.find(task => task.Id === taskId)
  if (taskToEdit) {
    currentTask.value = { ...taskToEdit }
    isModalOpen.value = true
  }
}

const saveTask = async () => {
  if (currentTask.value) {
    const today = new Date().toISOString()
    try {
      const token = localStorage.getItem('Token-Watch')
      const taskPayload = {
        Title: currentTask.value.Title,
        Description: currentTask.value.Description,
        Status: currentTask.value.Status,
        Priority: currentTask.value.Priority,
        CategoryId: currentTask.value.CategoryId,
        AssignedTo: store.userId ? parseInt(store.userId) : 0,
        DueDate: currentTask.value.DueDate,
        Progress: currentTask.value.Progress,
        DeletionDate: currentTask.value.DeletionDate,
        ModifiedDate: today,
        CreationDate: today
      }

      if (currentTask.value.Id === null) {
        const response = await axios.post(`${url}/tasks`, taskPayload, {
          headers: { Authorization: `Bearer ${token}` }
        })
        tasks.value.push(response.data.data)
      } else {
        const response = await axios.put(`${url}/tasks/${currentTask.value.Id}`, taskPayload, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const index = tasks.value.findIndex((task) => task.id === currentTask.value.id)
        if (index !== -1) {
          tasks.value[index] = response.data.data
        }
      }
      isModalOpen.value = false
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error)
    }
  }
}

const deleteTask = async (taskId: number) => {
  try {
    const token = localStorage.getItem('Token-Watch')
    await axios.delete(`${url}/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    tasks.value = tasks.value.filter((task) => task.Id !== taskId)

    console.log(tasks);
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error)
  }
}

const toggleTaskCompletion = async (taskId: number) => {
  const task = tasks.value.find((task) => task.Id === taskId)
  if (task) {
    task.completed = !task.completed
    task.Status = task.completed ? 'Concluída' : 'Em andamento'
    task.Progress = task.completed ? 100 : 0

    try {
      const token = localStorage.getItem('Token-Watch')
      const updatedTask = {
        Id: task.Id,
        Title: task.Title,
        Description: task.Description,
        Status: task.Status,
        Priority: task.Priority,
        CategoryId: task.CategoryId,
        AssignedTo: store.userId ? parseInt(store.userId) : 0,
        DueDate: task.DueDate,
        Progress: task.Progress,
        CreationDate: task.CreationDate,
        ModifiedDate: new Date().toISOString(),
        DeletionDate: task.DeletionDate
      }

      await axios.put(`${url}/tasks/${taskId}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` }
      })

      const index = tasks.value.findIndex((task) => task.id === taskId)
      if (index !== -1) {
        tasks.value[index] = { ...task }
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error)
    }
  }
}

const tasksByCategory = computed(() => {
  return tasks.value.reduce(
    (acc, task) => {
      const category = categories.value.find((cat) => cat.Id == task.CategoryId)
      const catName = category ? category.Name : 'Sem Categoria'

      if (!acc[catName]) {
        acc[catName] = []
      }
      acc[catName].push(task)

      return acc
    },
    {} as Record<string, any[]>
  )
})

const addInvite = async () => {
  try {
    const token = localStorage.getItem('Token-Watch')
    if (!token) return

    const response = await axios.get(`${url}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    const users = response.data.data;

    const receiver = users.find(user => user.Email === inviteEmail.value);

    if (!receiver) {
      toast.error("Usuário não encontrado");
      return;
    }

    const receiverId = receiver.Id;

    const invitation = {
      SenderId: store.userId,
      ReceiverId: receiverId,
      TaskId: currentTask.value.Id,
      Status: 'Pending'
    }

    const inviteResponse = await axios.post(`${url}/invitations`, invitation, {
      headers: { Authorization: `Bearer ${token}` }
    })

    if(inviteResponse.status == 201){
      toast.success("Convite feito");
    }
  } catch (error) {
    console.error('Erro ao adicionar convite:', error)
  }
}


const removeInvite = async (inviteId: number) => {
  try {
    const token = localStorage.getItem('Token-Watch')

    await axios.delete(`${url}/invitations/${inviteId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    invitations.value = invitations.value.filter((invite) => invite.Id !== inviteId)
  } catch (error) {
    console.error('Erro ao remover convite:', error)
  }
}

const getCategoryProgress = (category: string) => {
  const categoryTasks = tasksByCategory.value[category] || []
  const completedTasks = categoryTasks.filter((task: any) => task.completed).length
  return categoryTasks.length > 0 ? (completedTasks / categoryTasks.length) * 100 : 0
}

const totalCategories = computed(() => categories.value.length)
const totalTasks = computed(() => (Array.isArray(tasks.value) ? tasks.value.length : 0))
const completedTasks = computed(() =>
  Array.isArray(tasks.value) ? tasks.value.filter((task) => task.completed).length : 0
)
const pendingTasks = computed(() =>
  Array.isArray(tasks.value) ? tasks.value.filter((task) => task.Status === 'Pendente').length : 0
)
</script>

<template>
  <div>
    <page-header title="Dashboard">
      <div class="flex items-center space-x-2">
        <DateRangePicker />
        <Button>Download</Button>
      </div>
    </page-header>

    <Tabs default-value="overview" class="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="tasks">Tarefas</TabsTrigger>
        <TabsTrigger value="categories">Categorias</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" class="space-y-4">
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Total de categorias</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="h-4 w-4 text-muted-foreground"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ totalCategories }}</div>
              <p class="text-xs text-muted-foreground">Total de categegorias</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Total de tarefas</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="h-4 w-4 text-muted-foreground"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ totalTasks }}</div>
              <p class="text-xs text-muted-foreground">Numero total de tarefas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Tarefas Completadas</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="h-4 w-4 text-muted-foreground"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ completedTasks }}</div>
              <p class="text-xs text-muted-foreground">Tarefas finalizadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Tarefas pendentes</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="h-4 w-4 text-muted-foreground"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ pendingTasks }}</div>
              <p class="text-xs text-muted-foreground">Tarefas pendentes</p>
            </CardContent>
          </Card>
        </div>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card class="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent class="pl-2">
              <p>ALGUMA COISA</p>
            </CardContent>
          </Card>
          <Card class="col-span-3">
            <CardHeader>
              <CardTitle>Tarefas recentes</CardTitle>
              <CardDescription>Um resumo das ultimas tarefas</CardDescription>
            </CardHeader>
            <CardContent>
              <ul class="space-y-2">
                <li
                  v-for="task in tasks.slice(-3)"
                  :key="task.Id"
                  class="flex items-center justify-between text-sm"
                >
                  <span>{{ task.Title }}</span>
                  <span
                    :class="{
                      'text-green-500': task.completed,
                      'text-red-500': !task.completed
                    }"
                  >
                    {{ task.completed ? 'Concluída' : 'Pendente' }}
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="tasks" class="space-y-4">
        <div class="gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <Card class="border-2 border-gray-300 p-4">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Minhas Tarefas</CardTitle>
              <Button variant="default" class="mt-4" @click="addTask">Adicionar Tarefa</Button>
            </CardHeader>
            <CardContent>
              <div v-if="tasks.length === 0" class="text-center text-muted-foreground">
                Você ainda não tem tarefas.
              </div>
              <div v-for="(categoryTasks, category) in tasksByCategory" :key="category">
                <div class="p-4 border border-gray-300 rounded-lg mb-2">
                  <div class="mb-4">
                    <strong class="text-lg">{{ category }}</strong>
                  </div>
                  <div class="w-full mt-2">
                    <div class="relative pt-1">
                      <div class="flex mb-2 items-center justify-between">
                        <span
                          class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full"
                        >
                          Progresso
                        </span>
                      </div>
                      <div class="flex mb-2 items-center justify-between">
                        <div class="relative pt-1 flex w-full">
                          <div
                            class="flex mb-2 items-center justify-between w-full bg-gray-200 rounded-full h-2"
                          >
                            <div
                              class="bg-blue-500 h-2 rounded-full"
                              :style="{ width: getCategoryProgress(category) + '%' }"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul>
                    <li
                      v-for="task in categoryTasks"
                      :key="task.Id"
                      class="flex flex-col justify-between items-start py-4 border-b border-gray-200"
                    >
                      <div class="flex items-center w-full justify-between">
                        <div>
                          <input
                            type="checkbox"
                            :checked="task.Status === 'Concluída'"
                            @click="toggleTaskCompletion(task.Id)"
                            class="mr-2"
                          />
                          <span
                            :class="{
                              'line-through text-muted-foreground': task.Status === 'Concluída'
                            }"
                          >
                            <strong>{{ task.Title }}</strong>
                          </span>
                        </div>
                        <div class="flex space-x-2 mt-2">
                          <Button variant="outline" size="sm" @click="openEditTaskModal(task.Id)">Editar</Button>
                          <Button variant="outline" size="sm" @click="deleteTask(task.Id)"
                            >Excluir</Button
                          >
                        </div>
                      </div>
                      <div v-if="task.Description" class="text-sm text-muted-foreground mt-2">
                        <span>{{ task.Description }}</span>
                      </div>
                      <div class="mt-2 text-sm text-muted-foreground">
                        <p><strong>Status:</strong> {{ task.Status }}</p>
                        <p><strong>Prioridade:</strong> {{ task.Priority }}</p>
                        <p><strong>Data de Vencimento:</strong> {{ task.DueDate }}</p>
                        <!-- <p><strong>Designado a:</strong> {{ task.assignedTo }}</p> -->
                        <p><strong>Data de Criação:</strong> {{ task.CreationDate }}</p>
                        <p v-if="task.modifiedDate">
                          <strong>Data de Modificação:</strong> {{ task.ModifiedDate }}
                        </p>
                        <p v-if="task.deletionDate">
                          <strong>Data de Exclusão:</strong> {{ task.DeletionDate }}
                        </p>
                        <p><strong>Progresso:</strong> {{ task.Progress }}%</p>
                        <div v-if="task.InvitedUsers && task.InvitedUsers.length" class="mt-2">
                          <p class="font-bold">Convidados:</p>
                          <ul>
                            <li v-for="(email, idx) in task.InvitedUsers" :key="idx">
                              {{ email }}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="categories" class="space-y-4">
        <div class="gap-4 md:grid-cols-1 lg:grid-cols-2">
          <Card class="border-2 border-gray-300 p-4">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Categorias</CardTitle>
              <Button variant="default" size="sm" @click="openCategoryModal"
                >Adicionar Categoria</Button
              >
            </CardHeader>
            <CardContent>
              <div v-if="categories.length === 0" class="text-center text-muted-foreground">
                Você ainda não tem categorias.
              </div>
              <ul>
                <li
                  v-for="category in categories"
                  :key="category"
                  class="flex justify-between items-center py-2 border-b border-gray-200"
                >
                  <span>{{ category.Name }}</span>
                  <div class="flex space-x-2">
                    <Button variant="outline" size="sm" @click="openEditCategoryModal(category.Id)"
                      >Editar</Button
                    >
                    <Button variant="outline" size="sm" @click="deleteCategory(category)"
                      >Excluir</Button
                    >
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>

    <Dialog v-model:open="isModalOpen">
      <DialogContent>
        <DialogHeader>
          <CardTitle>
            {{ currentTask && currentTask.Id ? 'Editar Tarefa' : 'Nova Tarefa' }}
          </CardTitle>
        </DialogHeader>
        <div class="max-h-[60vh] overflow-y-auto px-4 py-2">
          <div class="space-y-4">
            <div>
              <label for="title">Título</label>
              <Input v-model="currentTask.Title" id="title" placeholder="Título da tarefa" />
            </div>
            <div>
              <label for="description">Descrição</label>
              <Input
                v-model="currentTask.Description"
                id="description"
                placeholder="Descrição da tarefa"
              />
            </div>
            <div>
              <label for="category">Categoria</label>
              <select
                v-model="currentTask.CategoryId"
                id="category"
                class="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option v-for="(cat) in categories" :key="cat" :value="cat.Id">
                  {{ cat.Name }}
                </option>
              </select>
            </div>
            <div>
              <label for="priority">Prioridade</label>
              <select
                v-model="currentTask.Priority"
                id="priority"
                class="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
            <div>
              <label for="status">Status</label>
              <select
                v-model="currentTask.Status"
                id="status"
                class="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="Em andamento">Em andamento</option>
                <option value="Concluída">Concluída</option>
                <option value="Pendente">Pendente</option>
              </select>
            </div>
            <!-- <div>
              <label for="assignedTo">Designado a</label>
              <Input
                v-model="currentTask.assignedTo"
                id="assignedTo"
                placeholder="Nome do responsável"
              />
            </div> -->
            <div>
              <label for="dueDate">Data de Vencimento</label>
              <Calendar
                v-model="currentTask.DueDate"
                :single-date-picker="true"
                :show-dropdowns="true"
                id="dueDate"
                placeholder="Selecione uma data"
              />
            </div>

            <div>
              <label for="progress">Progresso (%)</label>
              <Input
                v-model.number="currentTask.Progress"
                id="progress"
                type="number"
                min="0"
                max="100"
                @input="currentTask.Progress = Math.min(currentTask.Progress, 100)"
              />
            </div>
            <div v-if="currentTask && currentTask.Id">
              <label for="inviteEmail">Compartilhar tarefa (Email)</label>
              <div class="flex items-center space-x-2">
                <Input v-model="inviteEmail" id="inviteEmail" placeholder="email@exemplo.com" />
                <Button variant="default" @click="addInvite">Compartilhar</Button>
              </div>
              <ul class="mt-2">
                <li
                  v-for="(email, index) in currentTask.invitedUsers"
                  :key="index"
                  class="flex items-center justify-between"
                >
                  <span>{{ email }}</span>
                  <Button variant="outline" size="sm" @click="removeInvite(index)">
                    Remover
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="isModalOpen = false">Cancelar</Button>
          <Button variant="default" @click="saveTask">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <Dialog v-model:open="isCategoryModalOpen">
      <DialogContent>
        <DialogHeader>
          <CardTitle>Nova Categoria</CardTitle>
        </DialogHeader>
        <DialogContent>
          <div class="space-y-4">
            <div>
              <label for="categoryName">Nome da Categoria</label>
              <Input v-model="categoryName" id="categoryName" placeholder="Nome da categoria" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" @click="isCategoryModalOpen = false">Cancelar</Button>
            <Button variant="default" @click="addCategory">Adicionar Categoria</Button>
          </DialogFooter>
        </DialogContent>
      </DialogContent>
    </Dialog>

    <Dialog v-model:open="isEditCategoryModalOpen">
      <DialogContent>
        <DialogHeader>
          <CardTitle>Editar Categoria</CardTitle>
        </DialogHeader>
        <DialogContent>
          <div class="space-y-4">
            <div>
              <label for="categoryName">Nome da Categoria</label>
              <Input
                v-model="categoryName"
                id="categoryName"
                placeholder="Nome da categoria"
                value="categoryName"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" @click="isEditCategoryModalOpen = false">Cancelar</Button>
            <Button variant="default" @click="editCategory">Salvar Edição</Button>
          </DialogFooter>
        </DialogContent>
      </DialogContent>
    </Dialog>
  </div>
</template>

<style scoped>
.card-header {
  font-size: 1.2rem;
  font-weight: bold;
}
.card-content {
  border: 1px solid #ddd;
  padding: 15px;
  margin-top: 10px;
}
.card-content li {
  margin-bottom: 10px;
}
.card-content ul {
  list-style: none;
  padding-left: 0;
}
.card-content .task {
  border-left: 2px solid #3490dc;
  padding-left: 10px;
}
.card-content .category {
  background-color: #f7fafc;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  font-weight: bold;
  color: #333;
}
</style>
