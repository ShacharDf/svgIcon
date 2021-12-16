<template>
<div :style="{width:size.width+'px', height:size.height+'px'}">
  <svg tabindex="0" class="icon" :viewBox="viewBox" :class="classList" xmlns=http://www.w3.org/2000/svg role="img" >
    <title>{{title}}</title> 
    <use :xlink:href="constructedIcon + icon" ></use>
  </svg>
</div>
</template>

<script>
export default {
  name: "svgIcon",
  props: {
    icon: { type: String, required: true },
    classList: { type: String, default: "" },
    title: { type: String },
    size: { default: () => ({ width: 64, height: 64 }) },
    fileName: { type: String, required: true, default: "svgs" },
    viewBox: { type: String, default: "0 0 32 32" },
  },
  computed: {
    constructedIcon() {
      return require(`@/assets/svg/${this.fileName}.svg`) + "#";
    },
  },
};
</script>

<style scoped>
svg {
  width: 100%;
  height: 100%;
}
</style>
