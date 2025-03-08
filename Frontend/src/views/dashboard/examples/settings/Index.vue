<script>
import { useRouter } from 'vue-router';

const router = useRouter();
const token = localStorage.getItem("Token-Watch")
if(!token) router.push('/login');
</script>

<template>
  <div>
    <page-header>Settings</page-header>
  </div>
</template>
