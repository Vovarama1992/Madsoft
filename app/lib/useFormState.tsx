import { useState } from 'react';

export default function useFormState(func: (formData: FormData)  => void) {
  const [page, setPage] = useState(0);

  function dispatch(formData: FormData) {
    func(formData);
    const nextPage = page + 1;
    setPage(nextPage);
  }
  return [page, dispatch] as [number, (formData: FormData) => void];
}