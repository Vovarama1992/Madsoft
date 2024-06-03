'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import { useState } from 'react';

export default function TextArea({theme, length }: {theme: string, length: number}) {
    const [page, setPage] = useState(0);
    const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function nextQuestion(formData: FormData) {
    const value = formData.get(theme);
    const params = new URLSearchParams(searchParams);
    const currentPage = params.get('page');
    const nextPage = currentPage ? parseInt(currentPage, 10) + 1 : 1;
    setPage(nextPage);
    params.set('page', nextPage.toString());
    replace(`${pathname}?${params.toString()}`);
    alert('данные отправлены сервер ' + theme + ': ' + value);
    
}
    return (
        <form action={nextQuestion} className="flex flex-col mt-[20px] ml-[15px]  w-[35%] h-[50%]">
            <h2>{theme}</h2>
            <textarea  name={theme}></textarea>
            <button type="submit" disabled={page >  2} onClick={() => {
                setPage(prevPage => prevPage + 1);
                alert('page is ' + page);
            }}  className="ml-[10px] mt-[20px] w-[90px] h-[40px] rounded-[7px] bg-red-500 text-white flex justify-center items-center">
        Ответить
  </button>
            </form>
    )
}