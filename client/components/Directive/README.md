# 指令
## 表单验证 $fv
### class名
+ `fv-input-fail` 验证失败时加在input上的class
+ `fv-msg-fail` 验证失败时添加在错误信息显示标签上的class

### fv-check
#### 修饰符
|修饰符|说明|
|-----|----|
|required | 必填项 |
|number| 数字 |
| email | 邮箱 |
| mobile | 手机 |
| identity | 身份证 |
| postcode | 邮编 |
#### 参数 {`Object`}
+ reg {RegExp | RegExp Array} 要验证的正则表达式
+ title {String} 被验证项的标题，用来显示错误提示信息
+ allowEmpty {Boolean} 是否允许为空 默认false
+ max {Number} 最大长度
+ min {Number} 最小长度
+ rules {Array} 修饰符数组，和修饰符效果相同

#### tip
+ 指令必须写在表单输入元素上，如input，textarea等 
+ 输入元素必须有`id`属性

### fv-msg
#### 参数 {`String`}
+ 绑定的input的id

### 实例
#### 属性
+ this.$fv.errors {Array} 验证不通过的列表

#### 方法
+ this.$fv.checkAll(callback) 手动出发验证
  + callback {function} 回调函数
    + errors {Array} 回调函数的入参，返回未通过检查的条目

### 例1
```html
<input v-fv-check="{rules: ['required'], title:'用户名', min: 2, max: 5}" id="searchInput" type="text" placeholder="请输入关键词"/>
<span v-fv-msg="'searchInput'"></span>
```