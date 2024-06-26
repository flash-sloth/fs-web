import type { ErrorMessageMode } from '@vben/http';
import { ResultEnum } from '@vben/http';
import { $t } from '@/locales';
import { useAuthStoreWithOut } from '@/store/modules/auth';
import { useMessage } from '@/hooks/web/useMessage';

const { createMessage, createErrorModal } = useMessage();

export function checkStatus(err: any, errorMessageMode: ErrorMessageMode = 'message'): void {
  const { response } = err || {};
  const msg: string = response?.data?.msg ?? '';
  const status: number = response?.status;
  const authStore = useAuthStoreWithOut();

  let errMessage = '';
  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    case ResultEnum.UNAUTHORIZED:
      errMessage = msg || $t('sys.api.errMsg401');
      authStore.resetStore();
      break;
    case ResultEnum.FORBIDDEN:
      errMessage = $t('sys.api.errMsg403');
      break;
    // 404请求不存在
    case 404:
      errMessage = $t('sys.api.errMsg404');
      break;
    case 405:
      errMessage = $t('sys.api.errMsg405');
      break;
    case 408:
      errMessage = $t('sys.api.errMsg408');
      break;
    case 500:
      errMessage = $t('sys.api.errMsg500');
      break;
    case 501:
      errMessage = $t('sys.api.errMsg501');
      break;
    case 502:
      errMessage = $t('sys.api.errMsg502');
      break;
    case 503:
      errMessage = $t('sys.api.errMsg503');
      break;
    case 504:
      errMessage = $t('sys.api.errMsg504');
      break;
    case 505:
      errMessage = $t('sys.api.errMsg505');
      break;
    default:
  }

  tips(errMessage, errorMessageMode);
}

function tips(errMessage: string, errorMessageMode: ErrorMessageMode) {
  if (errMessage) {
    if (errorMessageMode === 'modal') {
      createErrorModal({ title: $t('sys.api.errorTip'), content: errMessage });
    } else if (errorMessageMode === 'message') {
      createMessage.error({ content: errMessage, key: `global_error_message_status_${status}` });
    }
  }
}
