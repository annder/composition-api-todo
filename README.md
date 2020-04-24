## Using composition api create a todo application by Vue.

## Start step

First time, you should install concerning composisiton api packages with npm or yarn.

```bash
# Npm package manager
npm install @vue/composition-api
# Yarn package manager
yarn add @vue/composition-api
```

And, for swiftly access to composition-api, I use `parcel` package manager to developing application.

```bash
npm install -g parcel-bundler
```

## Usage composition api

Create HTML file as:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue composition API</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="./index.js"></script>
  </body>
</html>
```

Next step is create `index.js`, just like this:

```js
import Vue from 'vue';
import compositionAPI from '@vue/composition-api';
import App from './App.vue';

Vue.use(compositionAPI);

new Vue({
  el: '#app',
  render: (h) => h(App),
});
```

Note: If you want to experiencing new api, must add this sentence.

```diff
import Vue from 'vue';
+ import compositionAPI from '@vue/composition-api';
import App from './App.vue';

+ Vue.use(compositionAPI);

new Vue({
  el: '#app',
  render: (h) => h(App),
});
```

Next, coding App.vue file, just it is counter function.

```vue
<template>
  <div class="counter">
    {{ count }}
  </div>
  <button @click="addCount">addCount<button>
</template>
<script>
export default {
  setup() {
    const count = ref('');
    const addCount = () => {
      count.value++;
    };
    return {
      count,
      addCount
    };
  },
};

</script>
```

Ok, let us run application.

```bash
parcel index.html
```

Just a moment, parcel will auto downlaoding package to application, then download done,The browser will auto open, show your wrote content.

---

But this project not a simple counter function application, it is todo appliaction.


## Run application 

```bash
parcel index.html
```

## Build application 

```bash
parcel build index.html
```