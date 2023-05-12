<template>
    <div class="data-table__card">
        <div v-for="{label, prop} in columns" :key="prop" class="data-table__card-row">
            <b>{{ label }}</b><br/> {{ row[prop] }}
        </div>
    </div>
</template>
<script>
import FormatterMixin from '../../mixins/FormatterMixin';

export default {
  mixins: [FormatterMixin],

  props: {
    columns: {
      type: Array,
      require: true,
    },
    row: {
      type: Object,
      require: true,
    },
  },
};
</script>
<style lang="scss">
.data-table__card {
    border: 1px solid black;
    padding: 10px;
    width: 100%;
    margin-bottom: 20px;
}
.data-table__card-row {
    margin-bottom: 15px;

    &:last-child {
        margin-bottom: 0;
    }
}
</style>
