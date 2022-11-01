/*
 * @FilePath: \ytxd-ui\src\template\form\entity\Schema.entity.js
 * @Author: maggot-code
 * @Date: 2022-10-31 15:30:31
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-01 17:38:41
 * @Description: 
 */
import {
    defineObjectRef,
    defineArrayRef
} from "@/utils/factory";

export function SchemaEntity() {
    const formSchema = defineObjectRef();
    const cellSchema = defineArrayRef();
    function setup(response) {
        formSchema.setup(response?.formSchema);
        cellSchema.setup(response.cellSchema);
    }

    return {
        formSchema,
        cellSchema,
        setup,
        setupFormSchema: formSchema.setup,
        setupCellSchema: cellSchema.setup,
    }
}
