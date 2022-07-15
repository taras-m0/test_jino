<template lang="pug">
  #app
    form.form
      .row
        input(type="text").input-text
      .row()
        my-select(
          :options="options"
          v-model="sValue"
          label="Label"
        ).select
      .row
        input(type="text" v-model="sValue.label" ).input-text

      .row()
        my-select(
          :options="exampleUser"
          v-model="userValue"
          label="Тип аккаунта"
        ).select
      .row
        input(type="text" v-model="userValue.label" ).input-text

      .row()
        my-select(
          :options="exampleServices"
          v-model="serviceValue"
          label="Выбрать сервис"
        ).select
      .row
        input(type="text" v-model="serviceValue.label" ).input-text

      .row()
        my-select(
          :options="[]"
          label="Disabled"
          disabled
        ).select
      .row
        input(type="text" ).input-text

</template>

<script>
import MySelect from "./components/MySelect";
import options, { exampleUser, exampleServices } from "./options";
export default {
  components: { MySelect },
  data() {
    return {
      sValue: { value: "", label: "" },
      options,

      userValue: { value: "", label: "" },
      exampleUser,

      serviceValue: { value: "", label: "" },
      exampleServices,
    };
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.form {
  max-width: 500px;
  width: 90%;
}

.row {
  padding: 5px;
  position: relative;
}

.input-text {
  width: 100%;
  padding: 0.4rem 1.2rem;
  font-size: 1.6rem;
  line-height: 2rem;
  border-radius: 0.4rem;
  border: 1px solid #d3d3d3;
}
</style>
