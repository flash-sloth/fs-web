import type { Ref } from 'vue';
import { computed, ref, unref } from 'vue';

function pagination<T = any>(list: T[], pageNo: number, pageSize: number): T[] {
  const offset = (pageNo - 1) * Number(pageSize);
  const ret =
    offset + Number(pageSize) >= list.length
      ? list.slice(offset, list.length)
      : list.slice(offset, offset + Number(pageSize));
  return ret;
}

export function usePagination<T = any>(list: Ref<T[]>, pageSize: number) {
  const currentPage = ref(1);
  const pageSizeRef = ref(pageSize);

  const getPaginationList = computed(() => {
    return pagination(unref(list), unref(currentPage), unref(pageSizeRef));
  });

  // 总条数
  const getTotal = computed(() => {
    return unref(list).length;
  });

  function setCurrentPage(page: number) {
    currentPage.value = page;
  }

  function setPageSize(size: number) {
    pageSizeRef.value = size;
  }

  return { setCurrentPage, getTotal, setPageSize, getPaginationList };
}
