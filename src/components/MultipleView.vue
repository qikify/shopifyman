<template>
<Tabs
  :tabs="tabs"
  :selected="selected"
  :canCreateNewView="true"
  @select="handleSelected"
  @create-new-view="onCreateNewView"
>
</Tabs>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Props = {
  itemStrings: any[];
  selected: number;
}

interface Emits {
  /** Emits when the action is expand */
  (event: 'delete-view', index: number): void;
  (event: 'rename-view', index: number, name: string): void;
  (event: 'create-view', name: string): void;
  (event: 'select-view', value: number): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const tabs = computed(() =>
  props.itemStrings.map((item, index) => ({
    content: item,
    index,
    onTabAction: () => {},
    id: `${item}-${index}`,
    isLocked: index === 0,
    actions:
      index === 0
        ? []
        : [
          {
            type: 'rename',
            onPrimaryAction: async (value: string) => {
              emits('rename-view', index, value);
            },
          },
          {
            type: 'delete',
            onPrimaryAction: async () => {
              await sleep(1);
              emits('delete-view', index);
            },
          },
        ],
  })),
);

const onCreateNewView = async (value: string) => {
  emits('create-view', value);
};

const handleSelected = (value: number) => {
  emits('select-view', value);
}
</script>
