<template>
  <div class="data-table">
    <div class="data-table__filter">
      <ui-money :value="moneyFilter" @change-input="debounceInput"/>
    </div>

    <!-- Your component code here -->
    <div class="data-table__content">
      <div class="data-table__columns">
        <data-table-column v-for="column in columns" :key="column.prop"  :rows="paginatedRows" :column="column" :style="`width: ${column.width}`"/>
      </div>
      <div class="data-table__list">
        <data-table-card v-for="row in paginatedRows" :key="row.id" :row="row" :columns="columns"/>
      </div>
    </div>
    <div class="data-table__paginator">
      <ui-pagination
        v-model="page"
        :pages="pageCount"
      />
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import DataTableColumn from './DataTableColumn.vue';
import DataTableCard from './DataTableCard.vue';
import FormatterMixin from '../../mixins/FormatterMixin';

export default {
  name: 'DataTable',
  components: {
    DataTableColumn,
    DataTableCard,
  },
  mixins: [FormatterMixin],

  props: {
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    page: 1,
    pageSize: 4,
    moneyFilter: 0,
  }),

  computed: {
    pageCount() {
      return Math.ceil(this.filteredRows.length / this.pageSize);
    },
    paginatedRows() {
      return this.filteredRows.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
    },
    filteredRows() {
      if (this.moneyFilter) {
        return this.rows.filter((el) => el.money <= this.moneyFilter);
      }
      return this.rows;
    },
  },

  methods: {
    debounceInput: debounce(function changeInput(value) {
      this.moneyFilter = value;
    }, 200),
  },
};
</script>

<style lang="scss">
.data-table__filter {
  display: flex;
  justify-content: right;
}
.data-table__content {
  display: flex;
  margin: 20px 0;
  width: 100%;
}

.data-table__columns {
  display: flex;
  width: 100%;
  height: max-content;
  @media (max-width: 769px) {
    display: none;
  }
}

.data-table__list {
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>
