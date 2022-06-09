<template>
  <QuillEditor />
</template>

<script>
import { Quill, QuillEditor } from "@vueup/vue-quill";
import ImageUploader from "quill-image-uploader";
Quill.register("modules/imageUploader", ImageUploader);
Quill.import('blots/block/embed');

import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

import { reactive } from "@vue/reactivity";

export default {
  name: "RichText",
  components: { QuillEditor },

  setup() {
    const state = reactive({
      toolbarOptions: ["bold", "italic", "underline", "strike"],
    });

    return { state };
  },
};
</script>

<style></style>
