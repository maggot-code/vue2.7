# service
> 数据仓库构建
> Souce -> ODS -> DW -> DM -> APP

## Souce 数据源
从根本上说 `Souce` 不属于数据仓库，而是数据仓库的上游，数据仓库的数据来源都在这里。

## ODS（Operational Data Store）操作数据存储层
将数据源中的数据原子化存储，并且是固定的不变的（除非数据源发生变化），不对数据源做任何修改，**只做存储**（这点很重要）。

## DW（Data Warehouse）数据仓库层
主要是指通过代码实现对 `ODS` 中的数据进行清洗、聚合、计算、转换、修饰等操作，并管理好 `ODS` 中的数据，`DW` 层本身由多个部分组成：
* DWD（Data Warehouse Detail）数据仓库明细层，最贴近 `ODS` 对 `ODS`的详细描述和补充
* DWB（Data Warehouse Basic）数据仓库基础层，主要完成对数据的统计、清洗等工作
* DWS（Data Warehouse Summary）数据仓库汇总层，对 `DWB` 中的数据进行汇总，根据各个维度进行汇总
* DIM 数据仓库字典层，为数据仓库提供字典配置，例如黑白名单等

## DM（Data Model) 数据模型层
根据使用场景针对性的包装所需结构的数据

## APP 应用层
真正意义上数据的消费者，与 `Souce` 一样，也不属于数据仓库，而是数据仓库的下游。

## 前端部分
从前端角度来说，仅需要 `ODS` 即可，并且 `DW` 和 `DM` 也是可以合并的，总的来说，`DW` 和 `DM` 可以合并成一个 `DS （Data Service）` 层，用来从 `ODS` 中读取数据然后对下游输出所需结构的数据。

## DDD（Domain Driven Design）领域驱动设计
DDD 为我们提供了三个核心对象（对于前端来说）：
* 实体（Entity）：用于描述业务的对象
* 事件（Event）：用于描述状态变化信息的对象
* 服务（Service）：用于执行无状态更新的函数集合
