<template lang="pug">
.dashboard
  Box(padding="1000")
    BlockStack(gap="400")
      Text(as="h1", variant="headingLg") Shopifyman
      InlineGrid(:columns="['oneThird', 'twoThirds']", gap="400")
        BlockStack(gap="400")
          div.request
            Select(width="100", v-model="method", :options="options")
            .url
              TextField(
                placeholder="URL",
                v-model="url",
                @keyup.enter="sendRequest",
              )
            Button(
              :loading="isLoading",
              @click="sendRequest",
              variant="primary",
            ) Send
          .div
            JsonEditorVue(
              v-model="body",
              :mode="Mode.text",
              :style="{ height: responseHeight - 30 + 'px' }",
              :main-menu-bar="false",
              :status-bar="false",
            )
        BlockStack(gap="400")
          .response(ref="responseRef")
            Card
              Box(:minHeight="responseHeight + 'px'")
                BlockStack(gap="400")
                  InlineStack(gap="200")
                    Text(as="h2", variant="headingMd") Response
                    Badge(
                      v-if="status",
                      :tone="isError ? 'critical' : 'success'"
                    ) {{ status }}
                  Scrollable
                    Text(as="pre", :tone="isError ? 'critical' : 'base'") {{ response }}
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef } from 'vue';
import { fetchFunction } from '@/services';
import JsonEditorVue from 'json-editor-vue';
import { Mode } from 'vanilla-jsoneditor';

const method = ref('get');
const url = ref('');
const body = ref('');
const response = ref<any>('');
const isLoading = ref(false);
const isError = ref(false);
const status = ref(0);
const responseRef = useTemplateRef<HTMLElement>('responseRef');

const options = [
  { value: 'get', label: 'GET' },
  { value: 'post', label: 'POST' },
  { value: 'put', label: 'PUT' },
  { value: 'patch', label: 'PATCH' },
  { value: 'delete', label: 'DELETE' },
];

const sendRequest = async () => {
  try {
    status.value = 0;
    isError.value = false;
    isLoading.value = true;
    const payload = JSON.parse(body.value || '{}');
    const options: any = {};

    if (body.value) {
      options.body = JSON.stringify(payload)
    }

    const res = await (fetchFunction as any)[method.value](url.value, options);

    response.value = res.json;
    status.value = res.statusCode;
    console.log('Response: ', res);
  } catch (err: any) {
    console.log(err);

    response.value = err.json;
    status.value = err.statusCode;
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

const responseHeight = computed(() => {
  if (!responseRef.value) return 0;

  return document.body.clientWidth < (1201 - 240 - 60)
      ? 750 // mobile view
      : window.innerHeight - responseRef.value?.getBoundingClientRect().top - 60;
});

onMounted(() => {
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key == "Enter") {
      sendRequest();
    }
  });
});
</script>

<style lang="scss" scoped>
.request {
  display: flex;
  gap: 10px;

  .url {
    flex-grow: 1;
  }
}
</style>
