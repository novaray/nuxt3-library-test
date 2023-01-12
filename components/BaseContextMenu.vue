<script setup lang="ts">
const popperJs = await import('@popperjs/core').then(lib => lib.default || lib)
const { createPopper } = popperJs;

interface BaseContextMenuProps {
  visible: boolean;
  update: boolean;
  event: PointerEvent;
  data: any;
}
interface BaseContextMenuEmits {
  (e: 'click:outside'): void;
}

const props = defineProps<BaseContextMenuProps>();
const emit = defineEmits<BaseContextMenuEmits>();
const onUpdate = toRefs(props).update
const popper = ref();
const getBoundingClientRect = computed(() => {
  const {clientX: x, clientY: y} = props.event;

  return () => ({
    width: 0,
    height: 0,
    top: y,
    right: x,
    bottom: y,
    left: x,
  });
});

const virtualElement = reactive({
  getBoundingClientRect: getBoundingClientRect
});

const open = () => {
  popper.value = createPopper(virtualElement as any, popper.value, {
    placement: 'right-start',
    modifiers: [
      {
        name: 'preventOverflow',
        options: {
          boundariesElement: document.querySelector('body')
        },
      }
    ]
  });
};

watch(onUpdate, (update) => {
  if (!update) {
    return;
  }
  open();
});

const onOutsideClick = () => {
  emit('click:outside');
}

</script>

<template>
  <client-only>
    <div
      class="context-menu"
      ref="popper"
      v-show="visible"
      tabindex="-1"
      @contextmenu.capture.prevent
      v-click-outside="onOutsideClick"
    >
      <slot></slot>
    </div>
  </client-only>
</template>

<style scoped>
.context-menu {
  position: fixed;
  z-index: 999;
  overflow: hidden;
  background: lightgray;
  border-radius: 4px;
  box-shadow: 0 1px 4px 0 #eee;
}
</style>
