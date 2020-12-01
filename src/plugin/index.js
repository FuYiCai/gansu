import Vue from 'vue' ;
import {ConfigProvider,Radio,Dropdown,Modal,Pagination,DatePicker,Select,message,Popover,Avatar,Table,Breadcrumb,Layout,Icon,Menu,Row,Col, Button,Form ,Input,Card} from 'ant-design-vue';
Vue.use(Button);
Vue.use(Form);
Vue.use(Input);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Menu);
Vue.use(Breadcrumb);
Vue.use(Table);
Vue.use(Avatar);
Vue.use(Popover);
Vue.use(Select);
Vue.use(Pagination);
Vue.use(Modal);
Vue.use(Dropdown);
Vue.use(Radio);
Vue.use(ConfigProvider);

Vue.use(DatePicker);



console.log('sdfgsad',Modal);
Vue.prototype.$message = message;
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$destroyAll = Modal.destroyAll;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;


