<script setup lang="ts">
import { DataTable, type ColumnDef } from '@/components/ui/data-table';
import { ref, h, onMounted } from 'vue';
import { Checkbox } from '@/components/ui/checkbox';
import DataTableHeader from '@/components/ui/data-table/DataTableHeader.vue';
import type { Column } from '@tanstack/vue-table';
import { useRouter } from 'vue-router';
import { url } from '@/lib/api';
import axios from 'axios';

const router = useRouter();
const token = localStorage.getItem("Token-Watch");
if (!token) router.push('/login');

interface IData {
  Id: string;
  Title: string;
  Status: string;
  Priority: string;
  Progress: number;
}

const getProgressVariant = (progress: number) => {
  if (progress === 100) return 'bg-green-500';
  if (progress > 50) return 'bg-yellow-500';
  return 'bg-red-500';
};

const tasks = ref<IData[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await axios.get(`${url}/tasks`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    tasks.value = response.data.data;
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Erro ao buscar as tarefas";
  } finally {
    isLoading.value = false;
  }
});

console.log(tasks);

const columns: ColumnDef<IData>[] = [
  {
    accessorKey: 'Id',
    header: ({ table }) => h(Checkbox, {
      checked: table.getIsAllPageRowsSelected(),
      'onUpdate:checked': val => table.toggleAllPageRowsSelected(!!val),
      ariaLabel: 'Select All',
      class: 'translate-y-0.5',
    }),
    cell: ({ row }) => h(Checkbox, {
      checked: row.getIsSelected(),
      'onUpdate:checked': val => row.toggleSelected(!!val),
      'ariaLabel': 'Select row',
      class: 'translate-y-0.5',
      enableSorting: false,
      enableHiding: false,
    }),
  },
  {
    accessorKey: 'Id',
    header: 'ID',
    enableSorting: false,
  },
  {
    accessorKey: 'Title',
    header: ({ column }) => h(DataTableHeader, {
      column: column as Column<IData>,
      title: 'Título',
    })
  },
  {
    accessorKey: 'Status',
    header: 'Status',
    enableSorting: false,
  },
  {
    accessorKey: 'Priority',
    header: 'Prioridade',
    enableSorting: false,
  },
  {
    accessorKey: 'Progress',
    header: 'Progresso',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2' }, [
        h('span', { class: 'text-sm font-medium' }, `${row.original.Progress}%`),
        h('div', { class: 'w-full bg-gray-200 rounded-full h-2 overflow-hidden' }, [
          h('div', {
            class: `h-full ${getProgressVariant(row.original.Progress)}`,
            style: `width: ${row.original.Progress}%`,
          }),
        ]),
      ]),
  }
];
</script>

<template>
  <div>
    <page-header title="Listagem de todas as tarefas do sistema"></page-header>

    <div v-if="isLoading" class="text-center">Carregando tarefas...</div>
    <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
    <DataTable v-else :columns="columns" :data="tasks"></DataTable>
  </div>
</template>
