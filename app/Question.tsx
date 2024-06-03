'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import  useFormState  from './lib/useFormState';

type QuestionProps = {
  type: string;
  theme: string;
  options?: string[];
  length: number;
  pageNum: number;
};

export default function Question({ type, theme, options, length, pageNum }: QuestionProps) {
  const [page, dispatch] = useFormState(nextQuestion);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [stop, setStop] = useState(false);
  const [value, setValue] = useState('');
  

  useEffect(() => {
   
    const stopParam = searchParams?.get('stop') == 'true' ? true : false;
    
    setStop(stopParam);
  }, [searchParams]);
  useEffect(() => {
      setValue('');
  }, [page]
  )
  

  function nextQuestion(formData: FormData) {
    let values: string[] = [];
    formData.forEach((value, key) => {
      if (value === 'on' || value) {
        values.push(`${key}: ${value}`);
      }
    });
    const params = new URLSearchParams(searchParams);
    const currentPage = params.get('page') as string;
    
    const nextPage = currentPage ? parseInt(currentPage, 10) + 1 : 1;
    params.set('page', nextPage.toString());
    replace(`${pathname}?${params.toString()}`);
    alert(`Выбранные пункты: ${values.join(', ')}`);
    
    
  }

  function renderInput() {
    
    return <input type='text' onChange={(e) => setValue(e.target.value)}  name={theme}></input>;
  }

  function renderTextArea() {
    
    return <textarea onChange={(e) => setValue(e.target.value)}  className="h-[50%]" name={theme}></textarea>;
  }

  function renderCheckBox() {
    
    return (
      <>
        {options?.map((option, index) => (
          <label key={index}>
            <input className="ml-[15px]" type="checkbox" onChange={(e) => setValue(e.target.value)} name={option}  /> {option}
          </label>
        ))}
      </>
    );
  }

  function renderRadio() {
    
    return (
      <>
       {options?.map((option, index) => (
          <label key={index}>
            <input className="ml-[15px]" onChange={(e) => setValue(e.target.value)} type="radio" name={theme}  /> {option}
          </label>
        ))}
      </>
    );
  }

  function renderContent() {
    switch (type) {
      case 'Input':
        return renderInput();
      case 'TextArea':
        return renderTextArea();
      case 'CheckBox':
        return renderCheckBox();
      case 'Radio':
        return renderRadio();
      default:
        return null;// здесь можно добавить новые типы вопросов
    }
  }

  return (
    !stop ? (
      <form action={dispatch} className="flex flex-col mt-[20px] ml-[15px] w-[35%] h-[50%]">
        <h2 className="mb-[35px] ml-[15px]">{theme}</h2>
        {renderContent()}
        <button
          type="submit"
          
          disabled={page >= length || !value}
          className="ml-[10px] mt-[20px] w-[90px] h-[40px] rounded-[7px] bg-red-500 text-white flex justify-center items-center"
        >
          Ответить
        </button>
      </form>
    ) : (
      <div className="flex w-[100%] text-[30px] h-[100%] pt-[7%] justify-center ">Время вышло</div>
    )
  );
}