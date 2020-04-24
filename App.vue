<template>
  <div>
    <img src="./assets/logo.png" class="logo" alt />
    <h1 class="to-center">Todo list</h1>
    <div class="row justify-content-center">
      <div class="col-5">
        <input
          type="text"
          class="form-control"
          placeholder="输入今天要做的事"
          v-model="entryText"
          @keydown.13="addTodoItem(entryText)"
        />
      </div>
      <div class="col-1">
        <button
          type="button"
          class="btn btn-primary"
          @click="addTodoItem(entryText)"
        >
          添加
        </button>
      </div>
    </div>
    <div class="row mt-3 pb-3">
      <div class="col-5 offset-3">
        <nav-bar
          :tabs="switchTabs"
          @onTab="handleCompeleteStatusTodo"
        ></nav-bar>
        <ul class="list-group">
          <li class="list-group-item active" aria-disabled="true">
            Tody Todo List
            <div class="row">
              <div class="col">
                全部
                <span class="badge badge-light badge-pill">
                  {{ computedAllTodo }}
                </span>
              </div>
              <div class="col">
                已完成
                <span class="badge badge-success badge-pill">
                  {{ computedTodoCompletedLenght }}
                </span>
              </div>
              <div class="col">
                未完成
                <span class="badge badge-secondary badge-pill">
                  {{ computedTodoUnCompletedLenght }}
                </span>
              </div>
              <div class="col">
                已删除
                <span class="badge badge-danger badge-pill">
                  {{ computedDelete }}
                </span>
              </div>
            </div>
          </li>
          <template v-if="computedAllDelete">
            <template v-for="(item, index) in todoList">
              <todo-item
                :item="item"
                :key="'todo' + index"
                :index="index"
                @check="checkTodoItem"
                @delete="deleteTodoItem"
                @editTodo="editTodoItem"
                @editDone="editDoneItem"
              />
            </template>
          </template>
          <li v-else class="list-group-item">
            <div class="jumbotron jumbotron-fluid">
              <div class="container">
                <h4 class="display-4">今日没有待办，</h4>
                <h4 class="display-5">休息一下吧</h4>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import todoItem from './components/TodoItem';
import navBar from './components/optionsNavBar';
import { ref, reactive, computed } from '@vue/composition-api';

const useTodoLogic = (entryText) => {
  const rawTodoList = [];
  const todoList = ref(rawTodoList);

  const computedTodoCompletedLenght = computed(
    () => todoList.value.filter((el) => el.isCheck).length
  );
  const computedTodoUnCompletedLenght = computed(
    () =>
      todoList.value.filter(
        (el) => el && !el.isCheck && !el.isDelete && !el.isDelete
      ).length
  );
  const computedDelete = computed(
    () => todoList.value.filter((el) => el && el.isDelete).length
  );
  const computedAllTodo = computed(
    () => todoList.value.filter((el) => el && !el.isDelete).length
  );
  const computedAllDelete = computed(() =>
    !todoList.value.every((el) => el.isDelete || el.isDelete === undefined)
  );
  const addTodoItem = (value) => {
    if (value.trim() === '') return;
    const addTodoProps = {
      text: value,
      isCheck: false,
      isDelete: false,
      isEdit: false,
    };
    rawTodoList.push(addTodoProps);
    todoList.value = rawTodoList;
    entryText.value = '';
  };

  const checkTodoItem = (index) => {
    todoList.value[index].isCheck = !todoList.value[index].isCheck;
  };

  const deleteTodoItem = (index) => {
    todoList.value.splice(index, 1, { ...rawTodoList[index], isDelete: true });
  };
  const editTodoItem = (index) => {
    todoList.value.splice(index, 1, { ...rawTodoList[index], isEdit: true });
  };
  const editDoneItem = (index) => {
    todoList.value.splice(index, 1, { ...rawTodoList[index], isEdit: false });
  };
  const _initSwichAvtiveTab = (switchTabs) => {
    switchTabs = switchTabs.map((el) => {
      el['active'] = false;
      return el;
    });
  };

  const _switchDiffStatus = (index, switchTabs) => {
    const findSwitchItem = switchTabs.find((el, i) => i === index);
    findSwitchItem.active = true;
    switchTabs.splice(index, 1, findSwitchItem);
  };

  const handleCompeleteStatusTodo = (index, switchTabs) => {
    _initSwichAvtiveTab(switchTabs);
    _switchDiffStatus(index, switchTabs);
    todoList.value = filtersTodo(index, rawTodoList);
  };

  const filtersTodo = (index, todoState) => {
    const [...tempTodoState] = todoState;
    switch (index) {
      case 0:
        return tempTodoState;
      case 1:
        return tempTodoState.filter((el) => el.isCheck);
      case 2:
        return tempTodoState.filter((el) => !el.isCheck);
    }
  };
  return {
    todoList,
    addTodoItem,
    checkTodoItem,
    deleteTodoItem,
    editTodoItem,
    editDoneItem,
    handleCompeleteStatusTodo,
    computedTodoCompletedLenght,
    computedTodoUnCompletedLenght,
    computedAllTodo,
    computedDelete,
    computedAllDelete
  };
};

const useSwitchTab = () => {
  const switchInfo = [
    { text: '全部' },
    { text: '完成' },
    { text: '未完成' },
  ].map((el) => {
    el['active'] = false;
    return el;
  });

  const wrappedSwitch = switchInfo.map((el) => reactive(el));
  let switchTabs = ref(wrappedSwitch);
  switchTabs.value[0].active = true;

  return { switchTabs };
};

export default {
  components: {
    todoItem,
    navBar,
  },
  setup() {
    const entryText = ref('');
    return {
      entryText,
      ...useSwitchTab(),
      ...useTodoLogic(entryText),
    };
  },
};
</script>

<style>
.row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.logo {
  display: block;
  height: 280px;
  margin: 0 auto;
}
.to-center {
  color: #7f8fa6;
  text-align: center;
}

.icon {
  height: 1em;
  width: 1em;
}
.options-wrap button {
  height: 2.5em;
  width: 2.5em;
  border-radius: 100%;
}
.todo-compeleted {
  text-decoration: line-through;
  color: gray;
}
.is-completed {
  color: gray;
  font-size: 16px;
  text-decoration: none !important;
}
.cursor {
  cursor: pointer;
}
</style>
