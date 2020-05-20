<template>
  <div class="app">
    <ATabs v-model="currentTab" :options="tabList" />
    <template v-if="currentTab === 0">
      <ATable :list="list" height="200px" @selection="onSelection">
        <ATableColumn type="selection" />
        <ATableColumn label="属性名" prop="key">
          <template #default="item">
            <span :title="item.key">{{ item.key | ellipsis }}</span>
          </template>
        </ATableColumn>
        <ATableColumn label="属性值" prop="value">
          <template #default="item">
            <span :title="item.value">{{ item.value | ellipsis }}</span>
          </template>
        </ATableColumn>
        <ATableColumn class-name="set-column" width="50px" label="操作">
          <template #default="item">
            <span @click="delItem(item)">删除</span>
          </template>
        </ATableColumn>
      </ATable>
      <div class="btn-block">
        <button @click="copyRemoteCookie" :disabled="!pickedItems.length">
          搬运
        </button>
      </div>
    </template>
    <template v-else>
      <div class="text-area">
        <textarea cols="30" rows="4" @input="onInput" />
      </div>
      <button @click="setCookie" :disabled="!pasteCookie.length">覆盖</button>
    </template>
  </div>
</template>

<script>
import { ellipsis } from "./utils";
import ATable from "../components/ATable/index.vue";
import ATabs from "../components/ATabs/index.vue";
import ATableColumn from "../components/ATableColumn";

export default {
  name: "app",
  data() {
    return {
      currentTab: 0,
      cookies: {},
      pasteCookie: "",
      tabList: [
        { label: "当前", value: 0 },
        { label: "覆写", value: 1 },
      ],
      pickedItems: [],
    };
  },

  components: { ATable, ATableColumn, ATabs },

  computed: {
    list() {
      return Object.keys(this.cookies).map((key) => ({
        key,
        value: this.cookies[key],
      }));
    },
  },
  filters: {
    ellipsis: ellipsis(10),
  },

  methods: {
    onSelection(item, data) {
      this.pickedItems = data;
    },
    onInput(e) {
      const input = e.target;
      const { copy, parserCookie } = this.$utils;
      if (e.inputType !== "insertFromPaste") {
        input.value = "";
        return;
      }

      try {
        const result = copy(parserCookie(e.target.value));
        if (!Object.keys(result).length) throw new Error("请填写正确的cookie");
        this.noticeRemoteCookieJson = result;
      } catch (e) {
        input.value = "";
        this.$toast(e.message);
        console.log("not ok", e.message);
      }
      this.pasteCookie = e.target.value;
    },

    async getPageCookie() {
      let result = await this.$utils.noticeContent({ event: "get-cookie" });
      if (!result.success) return;
      this.cookies = result.data.json;
    },

    copyRemoteCookie(e) {
      const cookies = this.pickedItems
        .reduce((p, it) => p + `${it.key}=${it.value};`, "")
        .replace(/;$/, "");

      this.$utils.clipboard(cookies, e);
    },

    async setCookie() {
      const result = await this.$utils.noticeContent({
        event: "set-cookie",
        data: this.noticeRemoteCookieJson || {},
      });
      if (!result.success) return;
      this.$toast("覆盖成功!");
    },

    async delItem(item) {
      const tmp = { ...this.cookies };
      delete tmp[item.key];
      this.cookies = tmp;

      this.$utils.noticeContent({
        event: "del-cookie",
        data: { ...item },
      });
    },
  },
  watch: {},
  created() {
    this.getPageCookie();
  },
  mounted() {},
  beforeDestroy() {},
};
</script>

<style lang="less" rel="stylesheet/less">
.app {
  padding: 10px;
  width: 500px;
  .set-column {
    span {
      cursor: pointer;
      user-select: none;
      &:hover {
        color: #409eff;
      }
      &:active {
        color: #3a8ee6;
      }
    }
  }

  .btn-block {
    margin-left: 10px;
    button {
      padding: 8px 20px;
      margin: 10px 0;
    }
  }

  button {
    border: 1px solid var(--border-color);
    background-color: #fff;
    white-space: nowrap;
    outline: none;
    padding: 8px 15px;
    border-radius: 4px;
    color: var(--text-color-light);
    cursor: pointer;

    &:hover {
      color: var(--active-color);
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }

    &:active {
      color: var(--active-color);
      border-color: var(--active-color);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      background-color: #fff;
      border-color: var(--border-color);
      color: var(--text-color-light);
    }
  }

  .text-area {
    padding: 10px;
    textarea {
      width: 100%;
      border-color: var(--border-color);
      border-radius: 4px;
      height: 100px;
      font-size: 15px;
      padding: 5px 10px;
      font-family: sans-serif;
    }
  }
}
</style>
