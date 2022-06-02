<template>
  <div class="modal">
    <div class="modal-content">
      <p>{{ props.modalMessage }}</p>
      <button class="button" @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["modalMessage"],

  setup(props, { emit }) {
    const closeModal = () => emit("close-modal");

    return { props, closeModal };
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);

  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    width: 300px;
    padding: 40px 30px;
    background-color: #fff;

    p {
      text-align: center;
    }

    button {
      align-self: center;
      color: #fff;
      background-color: #303030;

      &:hover {
        background-color: #8b8b8b;
      }
    }
  }
}
</style>
