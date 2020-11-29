<template>
  <queryReport :router="{name: 'Page_visit_detail'}" >
      <template  v-slot:right>
          <div class="flex">
              <a-button>趋势</a-button>
              <a-button style="margin-left:30px">导出</a-button>
          </div>
      </template>
  </queryReport>
</template>

<script>
import queryReport from '@/views/weekly_monthly/components/query_report'
export default {
  components:{
    queryReport
  }
  
}
</script>