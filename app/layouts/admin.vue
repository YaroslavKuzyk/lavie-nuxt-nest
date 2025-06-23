<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
      >
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <template v-for="(breadcrumb, index) in breadcrumbs" :key="index">
                <BreadcrumbItem
                  :class="{
                    'pointer-events-none': index === breadcrumbs.length - 1,
                  }"
                >
                  <BreadcrumbLink>
                    <NuxtLink :to="breadcrumb.url" class="text-sm">
                      {{ breadcrumb.label }}
                    </NuxtLink>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator
                  v-if="index !== breadcrumbs.length - 1"
                  class="hidden md:block"
                />
              </template>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <NuxtPage />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup lang="ts">
import AppSidebar from "@/components/common/admin/AppSidebar.vue";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

import { useAdminStore } from "@/stores/useAdminStore";

const adminStore = useAdminStore();

const breadcrumbs = computed(() => adminStore.breadcrumbs);
</script>

<style scoped></style>
