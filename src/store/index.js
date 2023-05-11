import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';
import getPayments from '@/mocks/getPayments';

Vue.use(Vuex);

const isMock = process.env.VUE_APP_FETCHING_MODE === 'mock';

const store = new Vuex.Store({

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
        const { data } = isMock ? await getPayments(params) : await api.getPayments(params);

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

store.subscribe((_, state) => {
  localStorage.setItem('data', JSON.stringify(state.data));
});

export default store;
