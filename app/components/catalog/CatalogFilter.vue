<template>
  <div class="flex flex-col gap-5">
    <Accordion type="single" collapsible class="border p-5">
      <AccordionItem value="item-1">
        <AccordionTrigger
          class="p-0 font-semibold text-[#585757] hover:no-underline cursor-pointer"
        >
          Категорії
        </AccordionTrigger>
        <AccordionContent class="pt-6">
          <div class="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
            <div
              v-for="category in 20"
              :key="category"
              class="flex items-center gap-2"
            >
              <Checkbox id="terms" class="cursor-pointer rounded-none" />
              <label
                for="terms"
                class="text-md font-regular text-[#585757] cursor-pointer"
              >
                Мереживо
              </label>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    <Accordion type="single" collapsible class="border p-5">
      <AccordionItem value="item-1">
        <AccordionTrigger
          class="p-0 font-semibold text-[#585757] hover:no-underline cursor-pointer"
        >
          Розмір
        </AccordionTrigger>
        <AccordionContent class="pt-6">
          <div class="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
            <div
              v-for="category in 3"
              :key="category"
              class="flex items-center gap-2"
            >
              <Toggle
                aria-label="Toggle italic"
                class="cursor-pointer rounded-none data-[state=on]:bg-[#A6ADA5] data-[state=on]:text-[#E9E4E1]"
                variant="outline"
              >
                S
              </Toggle>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    <Accordion type="single" collapsible class="border p-5">
      <AccordionItem value="item-1">
        <AccordionTrigger
          class="p-0 font-semibold text-[#585757] hover:no-underline cursor-pointer"
        >
          Колір
        </AccordionTrigger>
        <AccordionContent class="pt-6">
          <div class="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
            <div
              v-for="category in 3"
              :key="category"
              class="flex items-center gap-2"
            >
              <Toggle
                aria-label="Toggle italic"
                variant="outline"
                class="cursor-pointer rounded-none data-[state=on]:bg-[#A6ADA5] data-[state=on]:text-[#E9E4E1]"
              >
                <div class="w-6 h-6 border bg-[#fff] rounded-full"></div>
                Помаранчевий
              </Toggle>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>

<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Toggle } from "@/components/ui/toggle";
</script>

<style scoped></style>
