import { openWindow } from '..';
import { dataURLtoBlob, urlToBase64 } from './base64Conver';
type DownloadParams = {
  filename: string;
  mime?: string;
  bom?: BlobPart;
};
type DownloadBydataParams = {
  data: Blob;
} & DownloadParams;
type DownloadByBase64Params = {
  buf: string;
} & DownloadParams;
type DownloadByOnlineUrlParams = {
  url: string;
} & DownloadParams;
/**
 * Download online pictures
 *
 * @param url
 * @param filename
 * @param mime
 * @param bom
 */
export function downloadByOnlineUrl(params: DownloadByOnlineUrlParams) {
  const { url, filename, mime, bom } = params;
  urlToBase64(url).then(base64 => {
    downloadByBase64({ buf: base64, filename, mime, bom });
  });
}

/**
 * Download pictures based on base64
 *
 * @param buf
 * @param filename
 * @param mime
 * @param bom
 */
export function downloadByBase64(params: DownloadByBase64Params) {
  const { buf, filename, mime, bom } = params;
  const base64Buf = dataURLtoBlob(buf);
  downloadByData({ data: base64Buf, filename, mime, bom });
}

/**
 * Download according to the background interface file stream
 *
 * @param {any} data
 * @param {any} filename
 * @param {any} mime
 * @param {any} bom
 */
export function downloadByData(parasm: DownloadBydataParams) {
  const { data, filename, mime, bom } = parasm;
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data];
  const blob = new Blob(blobData, { type: mime || 'application/octet-stream' });

  const blobURL = window.URL.createObjectURL(blob);
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = blobURL;
  tempLink.setAttribute('download', filename);
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank');
  }
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  window.URL.revokeObjectURL(blobURL);
}

/**
 * Download file according to file address
 *
 * @param {any} sUrl
 */
export function downloadByUrl({
  url,
  target = '_blank',
  fileName
}: {
  url: string;
  target?: TargetContext;
  fileName?: string;
}): boolean {
  const x = new window.XMLHttpRequest();
  x.open('GET', url, true);
  x.responseType = 'blob';
  x.onload = () => {
    let fileUrl = window.URL.createObjectURL(x.response);
    const isChrome = window.navigator.userAgent.toLowerCase().includes('chrome');
    const isSafari = window.navigator.userAgent.toLowerCase().includes('safari');

    if (/(iP)/g.test(window.navigator.userAgent)) {
      console.error('Your browser does not support download!');
      return false;
    }
    if (isChrome || isSafari) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.target = target;

      if (link.download !== undefined) {
        link.download = fileName || fileUrl.substring(fileUrl.lastIndexOf('/') + 1, fileUrl.length);
      }

      if (document.createEvent) {
        const e = document.createEvent('MouseEvents');
        e.initEvent('click', true, true);
        link.dispatchEvent(e);
        return true;
      }
    }
    if (!fileUrl.includes('?')) {
      fileUrl += '?download';
    }
    openWindow(fileUrl, { target });
  };
  x.send();
  return true;
}

export const downloadFile = (response: any) => {
  const res = response.data;
  const type = res.type;
  if (type.includes('application/json')) {
    const reader = new FileReader();
    reader.onload = e => {
      if (e.target?.readyState === 2) {
        const data = JSON.parse(e.target?.result as string);
        window.$message?.warning(data.msg);
      }
    };
    reader.readAsText(res);
  } else {
    const disposition = response?.headers?.['content-disposition'];
    let fileName = '下载文件.zip';
    if (!disposition) {
      return;
    }
    const respcds = disposition.split(';');
    for (let i = 0; i < respcds.length; i += 1) {
      const header = respcds[i];
      if (header !== null && header !== '') {
        const headerValue = header.split('=');
        const hasHeaderValue = headerValue !== null && headerValue.length > 0;
        const hasFlieName = hasHeaderValue && headerValue[0].trim().toLowerCase() === 'filename';
        if (hasHeaderValue && hasFlieName) {
          fileName = decodeURI(headerValue[1]);
        }
      }
    }
    // 处理引号
    if ((fileName.startsWith("'") || fileName.startsWith('"')) && (fileName.endsWith("'") || fileName.endsWith('"'))) {
      fileName = fileName.substring(1, fileName.length - 1);
    }

    const blob = new Blob([res]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href);
  }
};
