<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { EditorView, basicSetup } from 'codemirror';
import { Compartment, EditorState } from '@codemirror/state';
import { SimpleScrollbar } from '@sa/materials';
import { oneDark } from '@codemirror/theme-one-dark';
import { java } from '@codemirror/lang-java';
import { useThemeStore } from '@/store/modules/theme';
import { updateCodeCreatorContent } from '@/service/main/generator/codeCreatorContent/api';
import { useMessage } from '@/hooks/web/useMessage.jsx';
import type { FsGenFile } from './types.ts';
const { createMessage } = useMessage();
const containerRef = ref<Element>();
const language = new Compartment();
const tabSize = new Compartment();
const theme = new Compartment();
const defaultTheme = EditorView.baseTheme({});
const state = EditorState.create({
  doc: `// 请选择文件`,
  extensions: [basicSetup, language.of(java()), tabSize.of(EditorState.tabSize.of(4)), theme.of(defaultTheme)]
});

const props = defineProps<{
  file: FsGenFile | null;
}>();

let view: EditorView | null = null;
onMounted(() => {
  view = new EditorView({
    state,
    parent: containerRef.value as any
  });
  changeTheme();
});

// 监控文件变化
watch(
  () => props.file,
  file => {
    if (file && view) {
      view?.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: file.content }
      });
    }
  }
);

/** 切换主题 */
function changeTheme() {
  if (useThemeStore().darkMode) {
    view?.dispatch({
      effects: [theme.reconfigure(oneDark)]
    });
  } else {
    view?.dispatch({
      effects: [theme.reconfigure(defaultTheme)]
    });
  }
}

async function save() {
  if (view) {
    const content = view.state.doc.toString();
    props.file && (await updateCodeCreatorContent({ id: props.file.id as string, content }));
    createMessage.success('保存成功');
  }
}

watch(
  () => useThemeStore().darkMode,
  () => {
    changeTheme();
  }
);
defineExpose({
  save
});
</script>

<template>
  <SimpleScrollbar class="code-gen-ide-panel-box h-full text-size-4">
    <div ref="containerRef"></div>
  </SimpleScrollbar>
</template>

<style lang="scss">
.dark {
  .code-gen-ide-panel-box {
    .simplebar-scrollbar:before {
      background-color: aqua;
    }
    background-color: #282c34;
  }
}
</style>
