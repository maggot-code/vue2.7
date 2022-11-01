<!--
 * @FilePath: \ytxd-ui\src\components\Toggle\toggle.vue
 * @Author: zhangxin
 * @Date: 2022-09-06 16:34:49
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-01 17:27:17
 * @Description: 
-->
<template>
  <div class="toggle">
    <div class="toggle-form-outer">
      <el-link
        v-show="isShowPlace"
        icon="icon-ym icon-ym-nav-prev"
        class="icon-left"
        :underline="false"
        @click="moveLocation('left')"
      />
      <div class="toggle-form-inlayer" :class="className" ref="toggleRefs">
        <slot name="toggle-form"></slot>
      </div>
      <el-link
        v-show="isShowPlace"
        @click="moveLocation('right')"
        icon="icon-ym icon-ym-nav-next"
        class="icon-right"
        :underline="false"
      />
    </div>

    <div class="toggle-btn">
      <slot name="toggle-btn"></slot>
    </div>
  </div>
</template>

<script>
import {
  onMounted,
  ref,
  unref,
  computed,
  onBeforeUnmount,
} from "vue";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "toggle",
  //混入
  mixins: [],
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  setup(props, context) {
    const toggleRefs = ref();
    const isShowPlace = ref(false);
    const className = computed(() => {
      return unref(isShowPlace) ? [] : ["toggle-form-inlayer-noicon"];
    });
    const moveLocation = (place) => {
      toggleRefs.value.scrollLeft =
        place === "left"
          ? toggleRefs.value.scrollLeft - (toggleRefs.value.clientWidth - 200)
          : toggleRefs.value.scrollLeft + (toggleRefs.value.clientWidth - 200);
    };

    const observer = new ResizeObserver((entries) => {
      const [{ target }] = entries;
      if (target.scrollWidth !== target.clientWidth) {
        isShowPlace.value = target.scrollWidth !== target.clientWidth;
      }
    });

    onMounted(() => {
      observer.observe(unref(toggleRefs), { box: "border-box" });
    });

    onBeforeUnmount(() => {
      observer.disconnect();
    });
    return { moveLocation, toggleRefs, isShowPlace, className };
  },
};
</script>
<style lang="scss" scoped>
@import "./toggle.scss";
</style>
