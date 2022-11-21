<script lang="ts" setup>
import draggable from 'vuedraggable';
import { ElCard, ElIcon, ElButton, ElInput } from 'element-plus';
import { Help } from '@element-plus/icons-vue';

const getOriginOrderData = () => {
  return [
    {
      id: 1,
      name: '1팀',
      children: [{
        id: 2,
        name: 'aa 맨',
        text: ''
      }, {
        id: 3,
        name: 'bb 맨',
        text: ''
      }, {
        id: 4,
        name: 'cc 맨',
        text: ''
      }]
    },
    {
      id: 5,
      name: '2팀',
      children: [{
        id: 6,
        name: 'dd 맨',
        text: ''
      }, {
        id: 7,
        name: 'ee 맨',
        text: ''
      }, {
        id: 8,
        name: 'ff 맨',
        text: ''
      }]
    },
    {
      id: 9,
      name: '3팀',
      children: [{
        id: 10,
        name: 'gg 맨',
        text: ''
      }, {
        id: 11,
        name: 'hh 맨',
        text: ''
      }, {
        id: 12,
        name: 'ii 맨',
        text: ''
      }]
    }
  ];
};

const parentDragging = ref(false);
const childDragging = ref(false);
const list = ref(getOriginOrderData());
const dragOptions = computed(() => ({
  animation: 200,
  group: 'id',
  disabled: false,
  ghostClass: 'ghost'
}));

const returnOriginOrderData = () => {
  list.value = getOriginOrderData();
};

</script>

<template>
  <div>
    <draggable
        :list="list"
        @start="parentDragging=true"
        @end="parentDragging=false"
        item-key="id"
        handle=".handle"
        v-bind="dragOptions"
    >
      <template #item="{ element: parent }">
        <el-card shadow="never">
          <div class="flex-wrap">
            <el-icon :size="20" class="handle">
              <Help/>
            </el-icon>
            <span v-text="parent.name"></span>
          </div>
          <draggable
              class="child-wrapper"
              :list="parent.children"
              @start="childDragging=true"
              @end="childDragging=false"
              item-key="id"
              handle=".handle"
          >
            <template #item="{ element: child }">
              <el-card shadow="never">
                <div class="flex-wrap">
                  <el-icon :size="20" class="handle">
                    <Help/>
                  </el-icon>
                  <div class="flex-wrap">
                    <span class="child-name child-item" v-text="child.name"></span>
                    <el-input class="item-input child-item" v-model="child.text"></el-input>
                  </div>
                </div>
              </el-card>
            </template>
          </draggable>
        </el-card>
      </template>
      <template #header>
        <div class="card-header">
          <div class="header">column 1</div>
          <div class="header">column 2</div>
          <div class="header">column 3</div>
          <div class="header">column 4</div>
          <div class="header">column 5</div>
        </div>
      </template>
      <template #footer>
        <el-button class="reset-button" type="primary" @click="returnOriginOrderData">원래 순서로</el-button>
      </template>
    </draggable>
  </div>
</template>

<style scoped>
.card-header {
  width: 99%;
  height: 30px;
  background-color: lightgray;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  align-items: center;
  text-align: center;
}
.card-header .header {
  width: 350px;
  min-width: 350px;
}

.flex-wrap {
  display: flex;
  flex-direction: row;
}

.child-item {
  width: 100%;
}

.child-wrapper {
  margin-top: 1rem;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.el-icon {
  margin-right: 16px;
  cursor: pointer;
}

.child-name {
  margin-left: 100px;
}

.item-input {
  min-width: 200px;
  margin-left: 220px;
}

.reset-button {
  margin-top: 1rem;
}
</style>
