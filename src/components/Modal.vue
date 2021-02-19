<template></template>


<script>
export default {
  name: "modal",

  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>