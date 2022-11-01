/*
 * @FilePath: /vue2.7/src/template/form/usecase/defineForm.js
 * @Author: maggot-code
 * @Date: 2022-10-31 16:03:46
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-02 02:11:50
 * @Description: 
 */
import { toObject } from "@/utils/trans";
import { FormEntity } from "../entity/Form.entity";
import { JobEntity } from "../entity/Job.entity";
import { SchemaEntity } from "../entity/Schema.entity";

function toKey(cell) {
    return cell.field;
}

export function defineForm() {
    const form = FormEntity();
    const job = JobEntity();
    const schema = SchemaEntity();
    const unwatch = watch(schema.cellSchema.data, (schema) => {
        const factor = {};
        const data = toObject(schema, toKey);
        for (const key in data) {
            factor[key] = data[key].value;
        }
        form.data.setup(factor);
        unwatch();
    });

    async function setupFormData() {
        if (unref(form.element.unusable)) return;

        const { data } = unref(form.element.refs).formOutput();

        form.data.setup(data);
    }
    async function resetFormData() {
        if (unref(form.element.unusable)) return;

        unref(form.element.refs).resetForm();

        await setupFormData();
    }

    onBeforeUnmount(() => {
        unwatch();
    });
    return {
        formRefs: form.element.refs,
        formJob: job.data,
        formSchema: schema.formSchema.data,
        cellSchema: schema.cellSchema.data,
        form,
        job,
        schema,
        setupFormData,
        resetFormData,
    }
}

export default defineForm;
