/*
 * @FilePath: \vue2.7\src\template\form\usecase\defineFormRemote.js
 * @Author: maggot-code
 * @Date: 2022-11-01 16:41:27
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-04 16:03:00
 * @Description: 
 */
function defineSend(server) {
    async function request(props) {
        const response = await server
            .send(props.address, props.lib.method, { params: props.lib })
            .toExecute();

        return response?.data ?? [];
    }
    return request;
}
export function defineFormRemote(server) {
    return {
        search: defineSend(server),
        enums: defineSend(server),
    }
}

export default defineFormRemote;
