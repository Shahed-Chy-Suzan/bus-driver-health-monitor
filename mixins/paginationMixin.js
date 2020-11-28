export default {
  data () {
    return {
      options: {
        page: null,
        itemsPerPage: null,
        sortBy: 'id',
        sortDesc: true
      },

      pagination: {
        page: null,
        itemsPerPage: null,
        pageStart: null,
        pageStop: null,
        pageCount: null,
        itemsLength: null
      }
    }
  },

  computed: {
    paginationQuery () {
      return (
        `&page=${this.pagination.page ? this.pagination.page : 1}` +
        `&per_page=${
          this.pagination.itemsPerPage ? this.pagination.itemsPerPage : 50
        }` +
        `&order_by=${this.options.sortBy ? this.options.sortBy : 'id'}` +
        `&order_direction=${this.options.sortDesc ? 'desc' : 'asc'}`
      )
    }
  },

  methods: {
    setPaginationsData (meta) {
      this.pagination.page = meta.current_page
      this.pagination.itemsPerPage = meta.per_page
      this.pagination.pageStart = meta.from
      this.pagination.pageStop = meta.to
      this.pagination.pageCount = meta.last_page
      this.pagination.itemsLength = meta.total
    }
  }
}
