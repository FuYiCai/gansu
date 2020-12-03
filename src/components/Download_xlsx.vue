<template>
    <a-button @click="exportExcel">导出报表</a-button>
</template>
<script>
import FileSaver from 'file-saver' ;
import XLSX from 'xlsx' ;
export default {
    props:{
        dataSource:{
            type:Array,
            required: true
        },
    },
    methods:{
        exportExcel() {

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
            
            let dataSource = [{暂无数据:'暂无数据'}] ;
            if(this.dataSource.length){
                dataSource = this.dataSource
            }

            // const table = [];
            // for(let i=0;i<dataSource.length;i++){
            //     const params = {
            //         姓名: dataSource[i].name,
            //         年龄: dataSource[i].age,
            //         address: dataSource[i].address,
            //     }
            //     table[i] = params
            // };
            //1、XLSX.utils.json_to_sheet(data) 接收一个对象数组并返回一个基于对象关键字自动生成的“标题”的工作表，默认的列顺序由使用Object.keys的字段的第一次出现确定
            //2、将数据放入对象workBook的Sheets中等待输出
            workBook.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(dataSource);

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