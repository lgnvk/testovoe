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
import { comma, dot, numberAndDot } from '../../constants/regExConstants';

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

      let curValue = value;
      const prevValue = this.prevValueInput;

      // Замена запятой на точку
      if (curValue.match(comma)) {
        curValue = curValue.replace(comma, '.');
      }
      // Замена неразрешенных символов
      if (curValue.match(numberAndDot)) {
        curValue = curValue.replace(numberAndDot, '');
      }
      // Запрет на точки первым знаком
      if (curValue[0] === '.') {
        curValue = curValue.slice(1);
      }
      // Запрет на ввод двух точек
      if (curValue.length > 1 && curValue[curValue.length - 1].match(dot) && curValue.length > prevValue.length && curValue.slice(0, curValue.length - 1).match(dot)) {
        curValue = curValue.slice(0, curValue.length - 1);
      }
      // Ограничение на знаки после точки
      if (curValue.match(dot)) {
        const [_, after] = curValue.split('.');
        if (after.length > 2) {
          curValue = curValue.slice(0, curValue.length - 1);
        }
      }

      this.prevValueInput = curValue;
      this.$emit('change-input', curValue ? Number(curValue) : undefined);
      nextTick(() => {
        this.valueInput = this.formatMoney(curValue);
      });
    },
  },
};
</script>
