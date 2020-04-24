<template>
  <li
    v-if="!item.isDelete"
    :key="item.text + index"
    class="list-group-item d-flex justify-content-between align-items-center"
  >
    <div class="todo-content">
      <h2
        v-if="!item.isEdit"
        :class="item.isCheck ? 'todo-compeleted' : ''"
        class="col todo-text"
        @dblclick="editTodo(index)"
      >
        {{ item.text }}
      </h2>
      <input
        type="text"
        class="form-control"
        v-else
        @blur="editDone(index)"
        v-model.lazy="item.text"
      />
      <div class="col is-completed">
        {{ computedTodoState(item).value }}
      </div>
    </div>

    <div class="options-wrap">
      <button
        type="button"
        class="btn btn-primary"
        @click="checkTodoItem(index)"
      >
        <img src="./../assets/check.png" class="icon" alt />
      </button>
      <button
        type="button"
        class="btn btn-danger"
        @click="deleteTodoItem(index)"
      >
        <img src="./../assets/delete.png" class="icon" alt />
      </button>
    </div>
  </li>
</template>

<script>
import { ref, computed } from '@vue/composition-api';
export default {
  name: 'todo-item',
  props: {
    item: Object,
    index: Number,
  },
  setup() {
    const editTodoText = ref('');
    const computedTodoState = (item) =>
      computed(() => {
        return !item.isEdit ? (item.isCheck ? '完成' : '未完成') : '编辑中';
      });
    return { editTodoText, computedTodoState };
  },
  methods: {
    checkTodoItem(index) {
      this.$emit('check', index);
    },
    deleteTodoItem(index) {
      this.$emit('delete', index);
    },
    editTodo(index) {
      this.$emit('editTodo', index);
    },
    editDone(index) {
      this.$emit('editDone', index);
    },
  },
};
</script>

<style>
.todo-content {
  width: 22em;
}
.todo-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 12em !important;
}
</style>
