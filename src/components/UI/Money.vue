<template>
  <input
    type="text"
    :value="valueInput"
    @input="(e) => validateInput(e.target.value)"
    class="ui-money"
  />
</template>

<script>
import { nextTick } from 'vue';
import FormatterMixin from '../../mixins/FormatterMixin';

export default {

  name: 'UiMoney',

  props: {
    value: {
      type: Number,
      require: true,
    },
  },
  mixins: [FormatterMixin],

  data() {
    return {
      valueInput: '',
      prevValueInput: '',
    };
  },

  methods: {
    validateInput(value) {
      this.valueInput = value;

      let cur = value;
      const prev = this.prevValueInput;

      // Замена запятой на точку
      if (cur.match(/,/g)) {
        cur = cur.replace(/,/g, '.');
      }
      // Замена неразрешенных символов
      if (cur.match(/[^0-9.]/g)) {
        cur = cur.replace(/[^0-9.]/g, '');
      }
      // Запрет на точки первым знаком
      if (cur[0] === '.') {
        cur = cur.slice(1);
      }
      // Запрет на ввод двух точек
      if (cur.length > 1 && cur[cur.length - 1].match(/[.]/) && cur.length > prev.length && cur.slice(0, cur.length - 1).match(/\./g)) {
        cur = cur.slice(0, cur.length - 1);
      }
      // Ограничение на знаки после точки
      if (cur.match(/\./g)) {
        const [_, after] = cur.split('.');
        if (after.length > 2) {
          cur = cur.slice(0, cur.length - 1);
        }
      }

      this.prevValueInput = cur;
      this.$emit('change-input', cur ? Number(cur) : undefined);
      nextTick(() => {
        this.valueInput = this.formatMoney(cur);
      });
    },
  },
};
</script>
