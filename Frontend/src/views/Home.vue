<script setup lang="ts">
import { useRouter } from 'vue-router';
import LogoImage from "@/assets/images/logo2.png";

import {Button} from "@/components/ui/button";

const router = useRouter();
const redirectTo = (page: string) => {
  if (page === 'login') {
    router.push('/login');
  } else if (page === 'register') {
    router.push('/register');
  }
};
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-muted p-6 md:p-10">
    <div class="w-full max-w-sm md:max-w-3xl">
      <Card class="overflow-hidden">
        <CardContent class="grid p-0 md:grid-cols-2">
          <form class="p-6 md:p-8 space-y-6">
            <div class="text-center">
              <h1 class="text-2xl font-bold">Bem-vindo ao Gerenciamento de tarefas</h1>
              <p class="text-muted-foreground">Escolha uma opção para começar</p>
            </div>
            <div class="grid gap-4">
              <Button 
                type="button" 
                class="w-full" 
                @click="redirectTo('login')"
              >
                Fazer login
              </Button>
              <Button 
                type="button" 
                class="w-full" 
                @click="redirectTo('register')"
              >
                Registrar-se
              </Button>
            </div>
          </form>

          <div class="relative hidden bg-muted md:block">
            <img :src="LogoImage" alt="Logo" class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
