<template lang="pug">
  v-select(
    v-bind="{ ...$attrs , appendToBody: false, clearable: false /*, closeOnSelect: false, multiple: true, taggable: true, dropdownShouldOpen: dropdownShouldOpen */}"
    :options="plainOptions"
    :disabled="disabled"
    v-on="{ ...$listeners }"
    ref="select"
  ).my-select
    template(#option="{ label, group }")
      .vs__dropdown-group-title(
        v-if="group"
      ) {{ group }}
      .vs__dropdown-option-label {{ label }}

    template(#open-indicator="{ attributes }")
      open-indicator( v-bind="attributes" )

    template(
      #selected-option-container="{ option, deselect, multiple, disabled }"
    )
      .vs__selected-option-container
        span.vs__label {{ label }}
        span.vs__current-option {{ option.label }}

    template(
      #search="{ attributes, events }"
    )
      input(
        maxlength="1"
        v-bind="searchAttrs( attributes)"
        v-on="searchEvents( events )"
      ).vs__search

</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import OpenIndicator from "../assets/open-indicator.svg?inline";

export default {
  name: "MySelect",
  components: { vSelect, OpenIndicator },

  model: {
    prop: "value",
    event: "input",
  },

  props: {
    options: {
      type: [Object, Array],
      default: () => ({}),
    },

    label: String,

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    plainOptions() {
      const objOptions = Array.isArray(this.options)
        ? { "": this.options }
        : this.options;

      return Object.keys(objOptions).reduce(
        (result, group) => [
          ...result,
          ...objOptions[group].map((item, index) => ({
            value: item,
            label: item,
            group: index === 0 ? group : null,
          })),
        ],
        []
      );
    },

    searchString() {
      return this.disabled ? this.label : "";
    },
  },

  methods: {
    searchEvents(events) {
      return {
        ...events,
        // 'blur': this.onSearchBlur,
        // 'focus': this.onSearchFocus,
        input: () => {},
      };
    },

    searchAttrs(attrs) {
      return { ...attrs, value: this.searchString };
    },
    dropdownShouldOpen(VueSelect) {
      return VueSelect.open;
    },

    trace(...args) {
      console.log("trace", ...args);
      return "";
    },
  },

  mounted() {
    // this.$refs.select.open = true;
    console.log("mounted");
  },
};
</script>

<style lang="sass">
.my-select
  font-size: 1.6rem
  line-height: 2.4rem
  color: #333333

.vs__dropdown-menu
  margin-top: 8px
  padding: 0
  position: relative

.vs__dropdown-option
  font-size: 14px
  line-height: 20px
  padding: 0

.vs__dropdown-option-label
  padding: 1.2rem 1.6rem

.vs__dropdown-group-title
  font-weight: 700
  padding: .8rem 1.2rem
  border-top: 1px solid #EBEBEB
  margin-top: .8rem

.vs__dropdown-option:first-of-type  .vs__dropdown-group-title
  border-top: none
  margin-top: 0


.vs__dropdown-option--selected .vs__dropdown-option-label
  background:  #F7F7F7
  border-radius: 4px

.vs__dropdown-option--highlight
  background: transparent
  color: #333333
  .vs__dropdown-option-label
    background: #EBEBEB
    border-radius: 4px

.vs__search
  font-size: 1.6rem
  line-height: 2.4rem

.vs__dropdown-toggle
  border: 1px solid #D3D3D3
  border-radius: 4px

.vs--open .vs__dropdown-toggle
  border: 1px solid #7CDA86
  box-shadow: 0 0 2px 3px #E7FFE9
  border-radius: 4px

.vs__selected-option-container
  display: flex
  flex-direction: column
  margin-left: .8rem
  min-height: 4rem

.vs__label
  font-size: 1.3rem
  line-height: 1.6rem

.vs__current-option
  font-size: 1.6rem
  line-height: 2.4rem
</style>
