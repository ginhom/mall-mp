<template>
  <div class="p-addresses-map bgc1">
    <c-search
      placeholder="请输入小区/写字楼"
      @focus="navigateTo('/pages/addresses/search/index')">
    </c-search>
    <map
      id="map"
      class="b-map"
      :longitude="location.longitude"
      :latitude="location.latitude"
      scale="14"
      show-location
      @regionchange="handleRegionChange">
    </map>
    <scroll-view
      class="b-result"
      scroll-y>
      <ul class="c-list bgc1">
        <li
          v-for="item in addresses"
          :key="item.id"
          class="c-list__item is-adaptable"
          @click="select(item)">
          <p class="c-list__desc fs28">{{ item.name }}</p>
          <p class="c-list__desc c9 fs24">{{ item.address }}</p>
        </li>
      </ul>
    </scroll-view>
    <c-dialog
      :visible="cConfirm.visible"
      title="请确认"
      content="需要获取您的位置信息，请到小程序的设置打开授权"
      @cancel="cConfirm.visible = false"
      @confirm="handleConfirm">
    </c-dialog>
  </div>
</template>

<script src="./script.js"></script>

<style
  lang="scss"
  src="./style.scss">
</style>
