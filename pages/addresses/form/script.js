import { mapState } from 'vuex'

export default {
  data () {
    return {
      cForm: {
        name: '',
        gender: '1',
        phoneNumber: '',
        location: {},
        room: '',
        tag: '1'
      }
    }
  },
  computed: mapState({
    addressesForm: state => state['wx/addresses'].form
  }),
  watch: {
    ['addressesForm.location'] (newVal) {
      console.log(newVal, 22)
      this.cForm.location = newVal
    }
  },
  // onLoad：选择地址返回后，不要 getDetail
  async onLoad () {
    this.id = this.$mp.query.id

    if (this.id) {
      this.$wx.setNavigationBarTitle({
        title: '修改收货地址'
      })

      this.cForm = await this.getDetail()
    } else {
      this.$wx.setNavigationBarTitle({
        title: '新增收货地址'
      })
    }
  },
  methods: {
    getDetail () {
      return this.$store.dispatch('wx/addresses/getDetail', {
        id: this.id
      })
    },
    changeTag (key, item) {
      this.cForm[key] = item.value
    },
    selectLocation () {
      if (this.cForm.location.id) {
        const { longitude, latitude } = this.cForm.location

        this.$wx.navigateTo({
          url: `/pages/addresses/map/index?longitude=${longitude}&latitude=${latitude}`
        })
      } else {
        this.$wx.navigateTo({
          url: '/pages/addresses/map/index'
        })
      }
    },
    async save () {
      const PHONE_REG = /^1\d{2}\s?\d{4}\s?\d{4}$/
      const { name, phoneNumber } = this.cForm

      if (!name.trim()) {
        this.$wx.showToast({ title: '请填写收货人' })
        return
      }

      if (!phoneNumber.trim()) {
        this.$wx.showToast({ title: '请填写手机号' })
        return
      }

      if (!PHONE_REG.test(phoneNumber)) {
        this.$wx.showToast({ title: '手机号格式错误' })
        return
      }

      if (!this.addressesForm.location.id) {
        this.$wx.showToast({ title: '请填写小区' })
        return
      }

      await this.$store.dispatch(`wx/addresses/${this.id ? 'put' : 'post'}`, {
        showLoading: true,
        id: this.id,
        body: this.cForm
      })

      this.$wx.showToast({
        title: this.id ? '修改成功' : '新增成功'
      })

      await this.$helpers.sleep(1500)

      this.$wx.navigateBack()
    }
  }
}
