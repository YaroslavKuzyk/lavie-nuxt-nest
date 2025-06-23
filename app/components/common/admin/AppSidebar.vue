<script setup lang="ts">
import { SquareTerminal, Cog } from "lucide-vue-next";
import NavMain from "./NavMain.vue";
import NavUser from "./NavUser.vue";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const props = defineProps({
  collapsible: {
    type: String,
    default: "icon",
  },
});

const data = {
  navMain: [
    {
      title: "Товари",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Категорії",
          url: "/admin/categories",
        },
        {
          title: "Продукти",
          url: "/admin/products",
        },
      ],
    },
    {
      title: "Система",
      url: "#",
      icon: Cog,
      isActive: true,
      items: [
        {
          title: "Галерея",
          url: "/admin/gallery",
        },
        {
          title: "Кольори",
          url: "/admin/colors",
        },
        {
          title: "Розміри",
          url: "/admin/sizes",
        },
      ],
    },
  ],
};
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <img
        src="@/assets/img/common/logo-black-transparent.webp"
        class="w-26"
        alt="logo"
      />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
