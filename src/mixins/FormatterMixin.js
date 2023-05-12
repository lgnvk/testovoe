import DateTime from 'luxon/src/datetime';

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
      const date = DateTime.fromISO(value).toLocaleString();
      if (date.match(/[^0-9,.]/)) {
        return '';
      }
      return date;
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
