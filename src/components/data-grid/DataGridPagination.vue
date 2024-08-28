<template>
  <nav>
    <ul class="pagination">

      <li v-show="!hasRecords">
        No records found
      </li>

      <li
        class="page-item"
        :class="currentPage === 1 ? 'disabled' : ''"
      >
        <a
          class="page-link"
          @click.stop.prevent="goto(currentPage - 1)"
        >
          Previous
        </a>
      </li>


      <li
        v-for="page in getPagesCount"
        :key="page"
        class="page-item"
        :class="currentPage === page ? 'active' : ''"
      >
        <a
          @click.stop.prevent="goto(page)"
          class="page-link"
        >
          {{ page }}
        </a>
      </li>


      <li
        class="page-item"
        :class="currentPage >= getPagesCount ? 'disabled' : ''"
      >
        <a
          @click.stop.prevent="goto(currentPage + 1)"
          class="page-link"
        >
          Next
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>

export default {
  name: 'DataGridPagination',
  data () {
    return {}
  },
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    recordCount: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },

  computed: {
    hasRecords () {
      return this.recordCount > 0
    },

    getPagesCount () {
      return Math.ceil(this.recordCount / this.pageSize)
    }
  },

  emits: ['page-changed'],

  methods: {
    goto (page) {
      this.$emit('page-changed', {
        page
      })
    }
  }
}
</script>

<style scoped>
* {
  user-select: none;
}

.page-item {
  cursor: pointer;
}

.disabled {
  cursor: not-allowed;
}



</style>
