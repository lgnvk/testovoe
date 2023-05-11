import { DateTime } from 'luxon';

const FormatterMixin = {
  methods: {
    formatMoney(value) {
      if (value) {
        const parts = String(value).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        return parts.join('.');
      }
      return value;
    },
    formatDate(value) {
      value = DateTime.fromISO(value).toLocaleString();
      if (value.match(/[^0-9,.]/)) {
        return '';
      }
      return value;
    },
    formatRow(value, columnProp) {
      if (columnProp === 'money') {
        return this.formatMoney(value);
      }
      if (columnProp === 'date') {
        return this.formatDate(value);
      }
      return value;
    },
  },
};

export default FormatterMixin;
