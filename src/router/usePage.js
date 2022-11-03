/*
 * @FilePath: \vue2.7\src\router\usePage.js
 * @Author: maggot-code
 * @Date: 2022-11-03 12:43:38
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-03 12:50:13
 * @Description: 
 */
function usablePage(pages) {
    return Array.isArray(pages) && pages.length > 0;
}
export function mergePage(...arg) {
    const routes = arg.filter(usablePage);

    if (routes.length <= 0) return [];

    return routes.flat();
}

export function usePage(pages) {
    return [];
}

export default usePage;
