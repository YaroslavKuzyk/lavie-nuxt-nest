<template>
  <SidebarProvider>
    <AppSidebar />
    <main>
      <SidebarTrigger class="cursor-pointer" />
      <NuxtPage />
    </main>
  </SidebarProvider>
</template>

<script setup lang="ts">
import AppSidebar from "@/components/common/admin/AppSidebar.vue";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
</script>

<style scoped></style>
