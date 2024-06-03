'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import { useState } from 'react';

export default function CheckBox({ theme, options, length }: { theme: string, options: string[], length: number }) {
    const [page, setPage] = useState(0);
    const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function nextQuestion(formData: FormData) {
    let values: string[] = [];
  formData.forEach((value, key) => {
    if (value === 'on' || value) {
      values.push(`${key}: ${value}`);
    }
  });
    const params = new URLSearchParams(searchParams);
    const currentPage = params.get('page');
    const nextPage = currentPage ? parseInt(currentPage, 10) + 1 : 1;
    setPage(nextPage);
    params.set('page', nextPage.toString());
    replace(`${pathname}?${params.toString()}`);
    alert(`Выбранные пункты: ${values.join(', ')}`);
    
}

    return (
        <form action={nextQuestion} className="flex flex-col mt-[20px] ml-[15px]  w-[35%] h-[50%]">
        <h2 className="mb-[35px] ml-[15px]">{theme}</h2>
        {options.map((option, index) => (
          <label key={index}>
            <input className="ml-[15px]" type="checkbox" name={option}  /> {option}
          </label>
        ))}
        <button disabled={page >  2} type='submit' onClick={() => {
                setPage(prevPage => prevPage + 1);
                alert('page is ' + page);
            }}  className="ml-[10px] mt-[20px] w-[90px] h-[40px] rounded-[7px] bg-red-500 text-white flex justify-center items-center">
        Ответить
  </button>
      </form>
    );
  }
