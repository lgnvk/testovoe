import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';
import getPayments from '@/mocks/getPayments';
import { saveToLocalStorage } from '../plugins';

Vue.use(Vuex);

const isMock = process.env.VUE_APP_FETCHING_MODE === 'mock';

const store = new Vuex.Store({
  plugins: [saveToLocalStorage],

  state: () => ({
    data: [],
    isLoading: false,
    isCached: false,
  }),

  mutations: {
    setState(state, value) {
      Object.entries(value).forEach(([key, data]) => {
        if (!Array.isArray(state[key]) && state[key] && typeof state[key] === 'object') {
          state[key] = {
            ...state[key],
            ...data,
          };
        } else {
          state[key] = data;
        }
      });
    },
  },

  actions: {
    async load({ commit }, params = {}) {
      commit('setState', { isLoading: true });

      try {
        const { data } = await api.getPayments(params).catch(async (err) => {
          if (process.env.VUE_APP_FETCHING_MODE === 'mock') {
            const mock = await getPayments(params);
            return mock;
          }
          // eslint-disable-next-line no-alert
          alert(err.message);
          return {};
        });

        if (Array.isArray(data) && data.length) {
          commit('setState', { data });
          commit('setState', { isCached: true });
        }
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert(e?.message);
      } finally {
        commit('setState', { isLoading: false });
      }
    },
    initStore() {
      if (localStorage.getItem('data')) {
        const data = JSON.parse(localStorage.getItem('data'));
        this.commit('setState', { data });
      } else {
        this.dispatch('load', {});
      }
    },
    clearCache() {
      this.commit('setState', { data: [] });
      this.commit('setState', { isCached: false });
      this.dispatch('load', {});
    },
  },
});

export default store;
