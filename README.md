# 2.7

## 路由表 （流程结构）

> 如果设置`useRedirect = true (启用重定向)`，则`redirect`属性如果是空字符串`""`会指向第一个子路由，如果没有子路由则`useRedirect = false (强制修改，忽略配置)`
>
> `redirect`属性只能指定子路由地址，如果指定的地址`pid 与上级路由 id`不匹配则`useRedirect = false (强制修改，忽略配置)`

| 属性          | 说明                                                     | 类型                     | 默认值     |
| ------------- | -------------------------------------------------------- | ------------------------ | ---------- |
| `mode`        | [路由工作模式](##路由工作模式)                           | `String<RouterMode>`     | `template` |
| `template`    | [模板类型](##模板类型)                                   | `String<TemplateType>`   | `unknow`   |
| `pid`         | 上级路由标识                                             | `String | Number | Null` | `null`     |
| `id`          | 路由标识                                                 | `String | Number`        | 必填       |
| `address`     | 路由地址                                                 | `String`                 | 必填       |
| `redirect`    | 重定向地址                                               | `String`                 | `""`       |
| `title`       | 路由标题                                                 | `String | Number`        | `""`       |
| `icon`        | 路由图标                                                 | `String`                 | `""`       |
| `useRedirect` | 是否重定向                                               | `Boolean`                | `false`    |
| `hidden`      | 是否隐藏<br />路由所有信息不会出现在用户可视可操作范围中 | `Boolean`                | `false`    |
| `affix`       | 固定在面包屑                                             | `Boolean`                | `false`    |
| `token`       | 如果在外链工作模式下是否携带`token`                      | `Boolean`                | `false`    |
| `menu`        | 是否在菜单上渲染该路由                                   | `Boolean`                | `false`    |
| `props`       | 额外参数                                                 | `Object<any>`            | `{}`       |
| `service`     | [服务地址](##服务配置)                                   | `Object<Config>`         | `{}`       |

### 路由表结构

```json
{
    code:-1,
    message:"ok",
    data:[
        {
            mode:"directory",
            pid:null,
            id:"dfce4efe86df4058bf8b4c6051bb6131",
            address:"/review",
            redirect:"/check",
            title:"专家评审",   
            icon:"el-icon-user",
            useRedirect:true,
            menu:true,
            props:{
                tablename:"REVIEW_USER"
            }
        },
        {
            mode:"template",
            template:"curd",
            pid:"dfce4efe86df4058bf8b4c6051bb6131",
            id:"e75d2ab8a0ac4b9b86fba5d8d02d45c7",
            address:"/check",
            title:"专家审核",
            icon:"el-icon-user",
            menu:true
        },
        {
            mode:"view",
            pid:"dfce4efe86df4058bf8b4c6051bb6131",
            id:"e5f3ba806cfa454aba6d81b37f94b48d",
            address:"/again",
            title:"专家再评",
            icon:"el-icon-user",
            menu:true
        }
    ]
}
```

### 路由工作模式

| 模式        | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| `template`  | 模板模式（渲染指定模板）                                     |
| `view`      | 视图模式（介入编码的方式，所有路由信息对外提供，需要前端维护的特殊路由） |
| `directory` | 目录模式（作为子路由跳板，如果所有子路由统一携带某些属性可以设置在目录身上，子路由就不需要设置了） |
| `link`      | 外链模式（不触发任何路由活动，打开新的视图窗口）             |

## 服务配置

> `token`属性如果出现则说明给定了一个可能用于第三方的身份，则会直接使用，权重高于本地存储。（如果不需要不要携带该属性）

| 属性       | 说明                             | 类型                        | 默认        |
| ---------- | -------------------------------- | --------------------------- | ----------- |
| `uri`      | 服务地址                         | `String`                    | 必填        |
| `method`   | 服务请求方式                     | `GET | POST | PUT | DELETE` | `GET`       |
| `dataType` | 数据体类型`(body)`               | `json | formData`           | `json`      |
| `props`    | 额外参数`(会额外拼接到params后)` | `Object<any>`               | `{}`        |
| `useToken` | 是否携带`token`                  | `Boolean`                   | `true`      |
| `token`    | 第三方服务需要携带的`token`      | `String | undefined`        | `undefined` |

## 模板类型

| 类型         | 说明                                   | 关键字   |
| ------------ | -------------------------------------- | -------- |
| 未知模板     | 作为默认模板和未匹配到的模板渲染       | `unknow` |
| 表格模板     | 提供列表数据和相关的控制按钮，翻页功能 | `table`  |
| 表单模板     | 提供表单相关的功能                     | `form`   |
| 弹框模板     |                                        | `dialog` |
| 标签模板     |                                        | `tabs`   |
| 增删改查模板 | 提供搜索，功能按钮和列表功能           | `curd`   |
|              |                                        |          |
|              |                                        |          |
|              |                                        |          |
|              |                                        |          |
|              |                                        |          |
|              |                                        |          |
|              |                                        |          |
|              |                                        |          |
|              |                                        |          |
|              |                                        |          |
|              |                                        |          |
|              |                                        |          |
|              |                                        |          |
