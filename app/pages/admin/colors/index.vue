<template>
  <Card>
    <CardHeader>
      <CardTitle>Кольори</CardTitle>
      <CardDescription>
        <div class="flex gap-4 items-center justify-between mt-3">
          <div class="w-1/3">
            <Input v-model="search" type="text" placeholder="Пошук по назві" />
          </div>
          <div>
            <CreateColorDrawer>
              <template #trigger>
                <Button class="cursor-pointer">
                  <Plus />
                  Додати колір
                </Button>
              </template>
            </CreateColorDrawer>
          </div>
        </div>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Назва</TableHead>
            <TableHead>Значення</TableHead>
            <TableHead>Створено</TableHead>
            <TableHead>Оновлено</TableHead>
            <TableHead class="text-right">Дії</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="colorsStore.colors.length">
            <TableRow v-for="color in colorsStore.colors" :key="color.id">
              <TableCell>{{ color.id }}</TableCell>
              <TableCell>{{ color.name }}</TableCell>
              <TableCell>{{ color.value }}</TableCell>
              <TableCell>{{
                $dayjs(color.createdAt).format("DD.MM.YYYY")
              }}</TableCell>
              <TableCell>{{
                $dayjs(color.updatedAt).format("DD.MM.YYYY")
              }}</TableCell>
              <TableCell class="text-right">
                <Button
                  variant="ghost"
                  class="size-9 mr-2 cursor-pointer"
                  @click="onEdit(color.id)"
                >
                  <Pencil />
                </Button>

                <Button
                  variant="ghost"
                  class="size-9 text-red-500 hover:text-red-500 cursor-pointer"
                  @click="onDelete(color.id)"
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="6" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </CardContent>

    <EditColorDrawer
      :is-open="isOpen"
      :id="id ?? 0"
      @update:is-open="isOpen = $event"
    />
  </Card>
</template>

<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateColorDrawer from "~/components/admin/colors/drawers/CreateColorDrawer.vue";
import EditColorDrawer from "~/components/admin/colors/drawers/EditColorDrawer.vue";
import { Input } from "@/components/ui/input";
import { Pencil, Plus, Trash2 } from "lucide-vue-next";
import { useAdminStore } from "~/stores/useAdminStore";
import { useColorsStore } from "~/stores/useColorsStore";

definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});

const colorsStore = useColorsStore();
const adminStore = useAdminStore();
const isOpen = ref(false);
const id = ref<number | null>(null);
const search = ref("");

watch(
  () => search.value,
  async () => {
    await colorsStore.fetchColors(search.value);
  },
  { immediate: true }
);

onMounted(async () => {
  adminStore.setBreadcrumbs([
    { label: "Головна", url: "/admin" },
    { label: "Кольори", url: "/admin/colors" },
  ]);
});

const onEdit = (colorId: number) => {
  isOpen.value = true;
  id.value = colorId;
};

const onDelete = async (id: number) => {
  await colorsStore.deleteColor(id);
};
</script>

<style scoped></style>
