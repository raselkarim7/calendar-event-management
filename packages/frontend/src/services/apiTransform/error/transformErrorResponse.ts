import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import type { ApiErrorResponseInterface, ErrorInterface } from '@/types';

const transformErrorResponse = ({ status, data }: FetchBaseQueryError): ErrorInterface => {
  const errData = data as ApiErrorResponseInterface;

  return {
    status: status ?? 500,
    message: 'Something is wrong, cannot retrieve the data from the server.',
    errors: errData?.errors ?? errData?.message,
  };
};

export default transformErrorResponse;
