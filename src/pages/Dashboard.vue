<template lang="pug">
.dashboard
  Box(padding="1000")
    BlockStack(gap="400")
      Text(as="h1", variant="headingLg") Shopifyman
      MultipleView(
        :item-strings="tabs",
        :selected="selectedTab",
        @create-view="addView",
        @delete-view="deleteView",
        @rename-view="renameView",
        @duplicate-view="duplicateView",
        @select-view="changeTab",
      )
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
                    Text(as="pre", :tone="isError ? 'critical' : 'base'", v-if="isJson") {{ response }}
                    div(v-else, v-html="response")
</template>

<script setup>
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue';
import { fetchFunction } from '@/services';
import JsonEditorVue from 'json-editor-vue';
import { Mode } from 'vanilla-jsoneditor';
import { MultipleView } from '@/components';

const method = ref('get');
const url = ref('');
const body = ref('');
const response = ref('');
const isLoading = ref(false);
const isError = ref(false);
const isJson = ref(false);
const status = ref(0);
const responseRef = useTemplateRef('responseRef');
const views = ref([{ name: 'Default' }]);
const selectedTab = ref(0);

const tabs = computed(() => views.value.map(item => item.name));

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
    response.value = '';
    const payload = JSON.parse(body.value || '{}');
    const options = {};

    if (body.value && method.value !== 'get') {
      options.body = JSON.stringify(payload)
    }

    const res = await (fetchFunction)[method.value](url.value, options);

    response.value = res.json;
    status.value = res.statusCode;
    isJson.value = true;
    console.log('Response: ', res);
  } catch (err) {
    console.log(err);

    isJson.value = typeof err.json !== 'string';
    response.value = err.json;
    status.value = err.statusCode;
    isError.value = true;
  } finally {
    isLoading.value = false;
    const currentView = views.value[selectedTab.value];

    views.value[selectedTab.value] = {
      ...currentView,
      name: currentView.isFixed ? currentView.name : `${method.value.toUpperCase()} ${url.value}`,
      method: method.value,
      url: url.value,
      response: response.value,
      status: status.value,
      body: body.value,
      isError: isError.value,
      isJson: isJson.value,
    };
  }
};

const responseHeight = computed(() => {
  if (!responseRef.value) return 0;

  return document.body.clientWidth < (1201 - 240 - 60)
      ? 750 // mobile view
      : window.innerHeight - responseRef.value?.getBoundingClientRect().top - 60;
});

const deleteView = (index) => {
  views.value.splice(index, 1);
}

const renameView = (index, name) => {
  views.value[index] = {
    ...views.value[index],
    name,
    isFixed: true,
  }
}

const duplicateView = (index, name) => {
  views.value.push({
    ...views.value[index],
    name,
    isFixed: false,
  });
}

const changeTab = (tab) => {
  selectedTab.value = tab;
  updateView(views.value[tab]);
}

const addView = (name) => {
  views.value.push({ name });
}

const updateView = (data) => {
  url.value = data.url || '';
  method.value = data.method || 'get';
  response.value = data.response || '';
  status.value = data.status || 0;
  body.value = data.body || '';
  isError.value = data.isError || false;
  isJson.value = data.isJson || false;
};

const setupView = () => {
  const storedViews = localStorage.getItem('shopifyman-views');

  if (storedViews) {
    const data = JSON.parse(storedViews);
    views.value = data;
    updateView(data[selectedTab.value]);
  }
}

watch(() => views.value, () => {
  localStorage.setItem('shopifyman-views', JSON.stringify(views.value));
}, { deep: true });

onMounted(() => {
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key == "Enter") {
      const target = event.target;

      if (target.classList.contains('cm-content')) {
        event.preventDefault();
      }

      window.scrollTo(0, 0);
      sendRequest();
    }
  }, { capture: true });

  setupView();
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
