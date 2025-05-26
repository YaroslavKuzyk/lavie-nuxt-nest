<template>
  <div>
    <nav v-if="authStore.accessToken">
      <Button @click="authStore.logout()">Logout</Button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/useAuthStore";
const authStore = useAuthStore();
</script>

<style scoped></style>
