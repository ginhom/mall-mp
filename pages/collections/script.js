import CProducts from '@/components/products'
import cartProductsMixin from '@/mixins/cart-products'
import fixedCartMixin from '@/mixins/fixed-cart'
import CEmpty from '@/components/empty'
import CFixedCart from '@/components/fixed-cart'

export default {
  components: { CProducts, CEmpty, CFixedCart },
  mixins: [cartProductsMixin, fixedCartMixin],
  data () {
    return {
      productsList: {
        items: [],
        total: 0
      }
    }
  },
  async onShow () {
    this.productsList = await this.getProductsList()
    this.loaded = true
  },
  methods: {
    async getProductsList () {
      const { data } = await this.$store.dispatch('wx/collections/postAction', {
        body: { type: 'GET' }
      })

      const { items, total } = await this.$store.dispatch('public/products/getList', {
        query: {
          where: { id: { $in: data } },
          limit: 1000
        }
      })

      return {
        items: items.map(item => this.addCartKeys(item)),
        total
      }
    }
  }
}
