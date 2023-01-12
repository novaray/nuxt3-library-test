<script setup lang="ts">
import { ElTree, ElButton, ElNotification } from 'element-plus';
import type Node from 'element-plus/es/components/tree/src/model/node';
import type { DragEvents } from 'element-plus/es/components/tree/src/model/useDragNode';
import type {
  AllowDropType,
  NodeDropType,
} from 'element-plus/es/components/tree/src/tree.type';
import { useTreeContextMenuStore } from '~/store';

const data = [
  {
    key: 1,
    label: 'Level one 1',
    children: [
      {
        key: 2,
        label: 'Level two 1-1',
        children: [
          {
            key: 3,
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    key: 4,
    label: 'Level one 2',
    children: [
      {
        key: 5,
        label: 'Level two 2-1',
        children: [
          {
            key: 6,
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        key: 7,
        label: 'Level two 2-2',
        children: [
          {
            key: 8,
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    key: 9,
    label: 'Level one 3',
    children: [
      {
        key: 10,
        label: 'Level two 3-1',
        children: [
          {
            key: 11,
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        key: 12,
        label: 'Level two 3-2',
        children: [
          {
            key: 13,
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
];
const store = useTreeContextMenuStore();

onMounted(() => {
  document.getElementById('pre-json')!.textContent = JSON.stringify(data, undefined, 2);
})

const handleDragStart = (node: Node, ev: DragEvents) => {
  console.log('drag start', node);
};
const handleDragEnter = (
  draggingNode: Node,
  dropNode: Node,
  ev: DragEvents
) => {
  console.log('tree drag enter:', dropNode.label);
};
const handleDragLeave = (
  draggingNode: Node,
  dropNode: Node,
  ev: DragEvents
) => {
  console.log('tree drag leave:', dropNode.label);
};
const handleDragOver = (draggingNode: Node, dropNode: Node, ev: DragEvents) => {
  console.log('tree drag over:', dropNode.label);
};
const handleDragEnd = (
  draggingNode: Node,
  dropNode: Node,
  dropType: NodeDropType,
  ev: DragEvents
) => {
  console.log('tree drag end:', dropNode && dropNode.label, dropType);
};
const handleDrop = (
  draggingNode: Node,
  dropNode: Node,
  dropType: NodeDropType,
  ev: DragEvents
) => {
  document.getElementById('pre-json')!.textContent = JSON.stringify(data, undefined, 2);
  console.log('tree drop:', dropNode.label, dropType);
};
const allowDrop = (draggingNode: Node, dropNode: Node, type: AllowDropType) => {
  if (dropNode.data.label === 'Level two 3-1') {
    return type !== 'inner';
  }

  return true;
};
const allowDrag = (draggingNode: Node) => {
  return !draggingNode.data.label.includes('Level three 3-1-1');
};

const contextMenu = (event: PointerEvent, node: Node, nodeProperty: Node, treeNode: any) => {
  store.open(event, 1);
};

const getIconSrc = (data: any) => {
  if (!data.hasOwnProperty('children') || data.children.length === 0) {
    return 'icon/ico_pin.svg';
  }

  return 'icon/ico_preview.svg';
};

const onNodeClick = () => {
  store.close();
};

const onCopyJsonButton = () => {
  const textContent = document.getElementById('pre-json')!.textContent as string;

  const t = document.createElement('textarea');
  document.body.appendChild(t);
  t.value = textContent;
  t.select();
  document.execCommand('copy');
  document.body.removeChild(t);

  ElNotification({
    title: 'Success',
    message: 'Text Copied!',
    type: 'success',
    duration: 2000
  });
}
</script>

<template>
  <div style="display: flex; flex-direction: row;">
    <el-tree
      style="width: 500px;"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      :data="data"
      draggable
      default-expand-all
      node-key="id"
      @node-click="onNodeClick"
      @node-contextmenu="contextMenu"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
    >
      <template #default="{data}">
        <div style="display: flex; flex-direction: row; align-items: center;">
          <img :src="getIconSrc(data)" alt="tree-icon" style="margin-right: 0.8rem;"/>
          {{ data.label }}
        </div>
      </template>
    </el-tree>
    <div>
      <pre id="pre-json" class="pre-json" />
      <el-button @click="onCopyJsonButton" style="margin-top: 5px;">Copy Json</el-button>
    </div>
  </div>
  <TreeContextMenu/>
</template>

<style scoped>
.pre-json {
  overflow: auto;
  height: 700px;
  max-height: 700px;
  width: 400px;
  border: dashed red;
}
</style>
