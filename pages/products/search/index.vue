<template>
  <div class="p-products-search">
    <c-search
      ref="search"
      show-submit
      @confirm="search()">
    </c-search>
    <div class="b-keywords bgc1">
      <template v-if="history[0]">
        <h2 class="b-title fs28">
          历史搜索
          <i
            class="c-icon c-icon--del"
            @click="clearHistory">
          </i>
        </h2>
        <ul class="b-tags">
          <li
            v-for="(item, index) in history"
            :key="index"
            class="b-tags__item c-tag h60 bgc7 c10 fs26"
            @click="search(item)">
            {{ item }}
          </li>
        </ul>
      </template>
      <h2 class="b-title fs28">热门搜索</h2>
      <ul class="b-tags">
        <li
          v-for="(item, index) in hotKeywords"
          :key="index"
          class="b-tags__item c-tag h60 bgc7 c10 fs26"
          @click="search(item)">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style
  lang="scss"
  src="./style.scss">
</style>
