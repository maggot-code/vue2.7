/*
 * @FilePath: \vue2.7\src\template\form\usecase\defineFormFile.js
 * @Author: maggot-code
 * @Date: 2022-11-01 16:40:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-04 13:41:35
 * @Description: 
 */
function defineUpload(server) {
    const fileServer = server.post();

    function request({ file, onProgress, data }) {
        const { uid } = file;
        const body = new FormData();
        body.append("files", file);
        body.append('uploadPath', data.uploadPath || 'UpFile/');
        const tocall = () => fileServer.toExecute({
            data: body,
            onUploadProgress: (progress) => {
                const { loaded, total } = progress;
                const percent = (loaded / total) * 100;
                onProgress({ percent });
            }
        });

        return {
            uid,
            tocancel: fileServer.toAbort,
            tocall
        }
    }

    return request;
}
function defineDownload(server) {
    const fileServer = server.post();

    function request(file) {
        const body = new FormData();
        body.append('url', file.url);

        return fileServer.toExecute({ data: body });
    }
    return request;
}
export function defineFormFile(server) {
    return {
        call: defineUpload(server),
        down: defineDownload(server)
    }
}

export default defineFormFile;
