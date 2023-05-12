<template>
    <div class="data-table__column">
        <div class="data-table__cell data-table__cell_small">
            {{ column.label }}
        </div>
        <div v-for="row in rows" :key="row.id" class="data-table__cell">
            {{ formatRow(row[column.prop], column.prop)}}
        </div>
    </div>
</template>
<script>
import FormatterMixin from '../../mixins/FormatterMixin';

export default {
  mixins: [FormatterMixin],
  props: {
    column: {
      type: Object,
      require: true,
    },
    rows: {
      tyoe: Array,
      require: true,
    },
  },
};
</script>
<style lang="scss">
.data-table__column {
  border: 1px solid black;
  border-right: none;
  &:last-child {
    border-right: 1px solid black;
  }
}
.data-table__cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid black;

  &:last-child {
    border-bottom: none;
  }

  &_small {
    height: 30px;
  }
}
</style>
