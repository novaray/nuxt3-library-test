import { defineStore } from 'pinia';

export interface TreeContextMenuStore {
  visible: boolean;
  update: boolean;  // 열려있는 상태에서 다시 열기 위함의 용도
  event: PointerEvent | null;
  data: any;
}

export const useTreeContextMenuStore = defineStore('treeContextMenuStore', {
  state: (): TreeContextMenuStore => ({
    visible: false,
    update: false,
    event: null,
    data: null
  }),
  actions: {
    open(event: PointerEvent, data: any) {
      this.visible = true;
      this.update = true;
      this.event = event;
      this.data = data;
      setTimeout(() => {
        this.update = false;
      }, 0);
    },
    close() {
      this.visible = false;
      this.event = null;
      this.data = null;
    }
  }
})
