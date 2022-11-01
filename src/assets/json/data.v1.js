/*
 * @FilePath: /vue2.7/src/assets/json/data.v1.js
 * @Author: maggot-code
 * @Date: 2022-11-01 23:41:51
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-02 01:23:07
 * @Description: 
 */
import { uuid } from "@/utils/uuid";
const data = {
    data: [],
    total: 107,
};

for (let index = 0; index < 20; index++) {
    const number = Math.random();
    const choice = number > 0.5 ? true : false;

    data.data.push({
        rowpower: choice ? "back,check" : "check",
        submittime: "2021-04-06 00:00:00",
        allusers: number,
        userid: number,
        checkresult: "0820",
        projno: "123",
        allusersname: "系统管理员",
        endtime: "2021-06-30 00:00:00",
        birth: "2020-12-01 00:00:00",
        submitman: 10000,
        projsourcesname: "市财政",
        starttime: "2021-04-06 00:00:00",
        submitmanname: "系统管理员",
        inhome: "001",
        checkresultname: "呼吸所办公室审核",
        projtype: "01",
        inhomename: "北京市呼吸疾病研究所",
        name: "测试项目",
        projecttype: "01",
        checktableid: 10,
        id: uuid(),
        projtotalfunding: 120.64,
        projtypename: "临床研究",
        projsources: "01",
        useridname: "系统管理员",
    });
}

export default data;
