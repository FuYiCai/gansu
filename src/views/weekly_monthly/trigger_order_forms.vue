<template>
  <div>
    <a-radio-group default-value="a" button-style="solid">
      <a-radio-button value="a">
        周报
      </a-radio-button>
      <a-radio-button value="b">
        月报
      </a-radio-button>
    </a-radio-group>
    <queryReport style="margin-top:20px" />
  </div>
</template>

<script>
import queryReport from '@/views/weekly_monthly/components/query_report'
export default {
  components:{
    queryReport
  }
  
}
</script>