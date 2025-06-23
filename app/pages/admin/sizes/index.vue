<template>
  <Card>
    <CardHeader>
      <CardTitle>Розміри</CardTitle>
      <div>
        <div class="flex gap-4 items-center justify-between mt-3">
          <div class="w-1/3">
            <Input v-model="search" type="text" placeholder="Пошук по назві" />
          </div>
          <div>
            <CreateSizeDrawer>
              <template #trigger>
                <Button class="cursor-pointer">
                  <Plus />
                  Додати розмір
                </Button>
              </template>
            </CreateSizeDrawer>
          </div>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Назва</TableHead>
            <TableHead>Створено</TableHead>
            <TableHead>Оновлено</TableHead>
            <TableHead class="text-right">Дії</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="sizesStore.sizes.length">
            <TableRow v-for="size in sizesStore.sizes" :key="size.id">
              <TableCell>{{ size.id }}</TableCell>
              <TableCell>{{ size.name }}</TableCell>
              <TableCell>{{
                $dayjs(size.createdAt).format("DD.MM.YYYY")
              }}</TableCell>
              <TableCell>{{
                $dayjs(size.updatedAt).format("DD.MM.YYYY")
              }}</TableCell>
              <TableCell class="text-right">
                <Button
                  variant="ghost"
                  class="size-9 mr-2 cursor-pointer"
                  @click="onEdit(size.id)"
                >
                  <Pencil />
                </Button>

                <Button
                  variant="ghost"
                  class="size-9 text-red-500 hover:text-red-500 cursor-pointer"
                  @click="onDelete(size.id)"
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="6" class="h-24 text-center">
                Немає результатів
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </CardContent>

    <EditSizeDrawer
      :is-open="isOpen"
      :id="id ?? 0"
      @update:is-open="isOpen = $event"
    />
  </Card>
</template>

<script setup lang="ts">
import { useAsyncData } from "nuxt/app";
import { definePageMeta } from "#imports";
import { ref, watch, onMounted } from "vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateSizeDrawer from "~/components/admin/sizes/drawers/CreateSizeDrawer.vue";
import EditSizeDrawer from "~/components/admin/sizes/drawers/EditSizeDrawer.vue";
import { Input } from "@/components/ui/input";
import { Pencil, Plus, Trash2 } from "lucide-vue-next";
import { useAdminStore } from "~/stores/useAdminStore";
import { useSizesStore } from "~/stores/useSizesStore";

definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});

const sizesStore = useSizesStore();
const adminStore = useAdminStore();
const isOpen = ref(false);
const id = ref<number | null>(null);
const search = ref("");

const { data: sizes } = useAsyncData("sizes", async () => {
  return await sizesStore.fetchSizes(search.value);
});

watch(
  () => search.value,
  async () => {
    await sizesStore.fetchSizes(search.value);
  }
);

onMounted(async () => {
  adminStore.setBreadcrumbs([
    { label: "Головна", url: "/admin" },
    { label: "Розміри", url: "/admin/sizes" },
  ]);
});

const onEdit = (sizeId: number) => {
  isOpen.value = true;
  id.value = sizeId;
};

const onDelete = async (id: number) => {
  await sizesStore.deleteSize(id);
};
</script>

<style scoped></style>
