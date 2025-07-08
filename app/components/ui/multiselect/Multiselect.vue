<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "~/components/ui/command";
import { Button } from "~/components/ui/button";
import { Check, ChevronDown } from "lucide-vue-next";

const props = defineProps<{
  options: Record<string, any>[] | string[] | number[];
  modelValue: string[] | number[] | undefined;
  placeholder?: string;
  itemTitle?: string;
  itemValue?: string;
  returnObject?: boolean;
}>();

const modelValue = computed({
  get: () => props.modelValue || [],
  set: (value) => emit("update:modelValue", value),
});

const emit = defineEmits(["update:modelValue"]);
const open = ref(false);

// Форматування опцій в [{ value, label }]
const normalizedOptions = computed(() => {
  if (!props.options?.length) return [];

  const isPrimitive =
    typeof props.options[0] === "string" ||
    typeof props.options[0] === "number";

  if (isPrimitive) {
    return props.options.map((o) => ({
      value: o,
      label: o,
      original: o, // 👈 оригінальне значення
    }));
  }

  return (props.options as Record<string, any>[]).map((o) => ({
    value: props.itemValue ? o[props.itemValue] : o.value,
    label: props.itemTitle ? o[props.itemTitle] : o.label,
    original: o, // 👈 оригінальний об’єкт
  }));
});

function toggle(v: string | number) {
  const selectedOption = normalizedOptions.value.find((o) => o.value === v);
  if (!selectedOption || !modelValue.value) return;

  const target = props.returnObject ? selectedOption.original : v;

  const exists = modelValue.value.some((item: any) =>
    props.returnObject ? item[props.itemValue || "value"] === v : item === v
  );

  const updated = exists
    ? modelValue.value.filter((item: any) =>
        props.returnObject ? item[props.itemValue || "value"] !== v : item !== v
      )
    : [...modelValue.value, target];

  emit("update:modelValue", updated);
}

function getItemValue(item: any) {
  return props.returnObject ? item?.[props.itemValue || "value"] : item;
}

function getItemLabel(item: any) {
  if (!item) return "";
  if (!props.returnObject) {
    return normalizedOptions.value.find((o) => o.value === item)?.label;
  }
  return props.itemTitle ? item[props.itemTitle] : item.label;
}

function isSelected(value: string | number) {
  return modelValue.value?.some((item: any) =>
    props.returnObject
      ? item?.[props.itemValue || "value"] === value
      : item === value
  );
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        class="w-full text-left cursor-pointer hover:bg-transparent px-[12px]"
      >
        <span
          v-if="modelValue?.length === 0"
          class="text-muted-foreground font-normal flex justify-between w-full"
        >
          {{ placeholder }}
          <span class="cursor-pointer mt-[2px]">
            <ChevronDown class="size-4 opacity-50" />
          </span>
        </span>

        <div v-else class="flex gap-1 flex-wrap justify-start w-full">
          <span
            v-for="(v, index) in modelValue?.slice(0, 3)"
            :key="getItemValue(v)"
            class="flex font-normal"
          >
            {{ getItemLabel(v) }}
            <span v-if="index < Math.min(2, modelValue.length - 1)" class="mr-1"
              >,</span
            >
          </span>

          <span
            v-if="modelValue?.length > 3"
            class="text-muted-foreground ml-1"
          >
            (+{{ modelValue?.length - 3 }} інших)
          </span>
        </div>
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-[500px] p-0">
      <Command>
        <CommandList>
          <CommandGroup v-if="normalizedOptions.length > 0">
            <CommandItem
              v-for="opt in normalizedOptions"
              :key="opt.value"
              :value="opt.value"
              @select="toggle(opt.value)"
              class="flex items-center justify-between py-[6px]! cursor-pointer hover:bg-gray-100 mb-1"
              :class="modelValue?.includes(opt.value) ? 'bg-gray-100' : ''"
            >
              {{ opt.label }}
              <Check v-if="modelValue?.includes(opt.value)" class="h-4 w-4" />
            </CommandItem>
          </CommandGroup>
          <CommandGroup v-else>
            <CommandItem value="empty" class="py-[6px]! hover:bg-transparent">
              <span class="text-muted-foreground font-normal">
                Немає результатів
              </span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
