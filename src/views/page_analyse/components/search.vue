<template>
    <a-row type="flex" justify="space-between" style="margin-bottom:10px">
      <a-col :span="22">
          {{inputText}} <a-input placeholder="请输入关键字" v-model="inputValue" style="width:15%" /> 
        <slot />
        <a-button type="link" size="small" @click="getTimes('day')"> 今日 </a-button>
        <a-button type="link" size="small" @click="getTimes('zhou')"> 本周 </a-button>
        <a-button type="link" size="small" @click="getTimes('benYue')"> 本月 </a-button>
        <a-button type="link" size="small" @click="getTimes('shangYue')"> 上月 </a-button>
        <a-range-picker @change="onChangePickerRange" style="width:25%" />
        <a-button @click="query" style="margin-left:10px" type="primary"> 查询 </a-button>
      </a-col>
      <a-col :span="2"> 
         <a-button @click="exportExcel">导出报表</a-button>
      </a-col>
    </a-row>
</template>
<script>
import moment from 'moment';
import FileSaver from 'file-saver' ;
import XLSX from 'xlsx' ;
export default {
    props:{
        inputText:{
            type:String,
            default:'页面标题：'
        }
    },
    inject:['me'],
    data() {
        return {
           inputValue:""
        }
    },
    methods: {
      
      onChangePickerRange(date,dateString) {
        // console.log(date, dateString);
        this.pickerRange = dateString
      },
      query(){
          this.$emit('search')
      },
      getTimes(date){
          console.log("????????");
          const map = {
            day:  moment(),
            zhou : [moment().day(7).subtract(6, 'days'), moment().day(7)] ,
            benYue : [moment(moment().format('YYYY-MM-01')), moment(moment().add(1, 'months').format('YYYY-MM-01')).subtract(1, 'days')],
            shangYue :  [moment(moment().subtract(1, 'months').format('YYYY-MM-01')), moment(moment().format('YYYY-MM-01')).subtract(1, 'days')]
          }
          this.$emit('getTimesChange', map[date])
      },
      exportExcel() {
            //   this.me._data.columns,this.me._data.data
            var wopts = {
                bookType: 'xlsx',
                bookSST: true,
                type: 'binary'
            };
            var workBook = {
                SheetNames: ['Sheet1'],
                Sheets: {},
                Props: {}
            };
            const table = [];
            const dataSource = this.me._data.data ;
            for(let i=0;i<dataSource.length;i++){
                const params = {
                    姓名: dataSource[i].name,
                    年龄: dataSource[i].age,
                    address: dataSource[i].address,
                }
                table[i] = params
            };
            //1、XLSX.utils.json_to_sheet(data) 接收一个对象数组并返回一个基于对象关键字自动生成的“标题”的工作表，默认的列顺序由使用Object.keys的字段的第一次出现确定
            //2、将数据放入对象workBook的Sheets中等待输出
            workBook.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(table);

            //3、XLSX.write() 开始编写Excel表格
            //4、changeData() 将数据处理成需要输出的格式
            FileSaver.saveAs(new Blob([this.changeData(XLSX.write(workBook, wopts))], {type: 'application/octet-stream'}), "sheetjs.xlsx")
        },
        
        changeData(s) {
            //如果存在ArrayBuffer对象(es6) 最好采用该对象
            if (typeof ArrayBuffer !== 'undefined') {

            //1、创建一个字节长度为s.length的内存区域
            var buf = new ArrayBuffer(s.length);

            //2、创建一个指向buf的Unit8视图，开始于字节0，直到缓冲区的末尾
            var view = new Uint8Array(buf);

            //3、返回指定位置的字符的Unicode编码
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;

            } else {
                var buf = new Array(s.length);
                for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            }
        },
    }
}
</script>