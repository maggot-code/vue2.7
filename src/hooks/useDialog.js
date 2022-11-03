/*
 * @FilePath: /vue2.7/src/hooks/useDialog.js
 * @Author: maggot-code
 * @Date: 2022-11-04 00:11:32
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-04 00:28:46
 * @Description: 
 */
export function useDialog() {
    const dialog = inject("dialog");

    return dialog;
}

export default useDialog;
