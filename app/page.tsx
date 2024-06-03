'use server';
import Image from "next/image";
import Question from './Question';
import Clock from './Clock';
import List from './lib/questionList';

const length = List.length;
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    
  };
}) {
  const page = Number(searchParams?.page) || 0;
  const length = List.length;
  const currentQuestion = List[page];

  return (
    <main className="absolute left-[2vw] lg:left-[5vw] pr-[10px] top-[2vh] lg:top-[5vh] w-[96vw] lg:w-[80vw] h-[96vh] lg:h-[70vh] bg-red-100">
    <div className=" ml-[10px] flex items-center font-semibold  text-[38px] ">Тестирование
    <Clock />
    </div>
    
    <div className="ml-[10px] mt-[20px] mr-[100px] flex flex-row gap-[3px]  h-[25px] w-[98%] bg-transparent">
    {Array.from({ length }).map((_, index) => (
    <div key={index} className={`w-40 h-full rounded-[6px] ${index < page ? 'bg-black' : index === page ? 'bg-red-500' : 'bg-white'}`}></div>
  ))}
    </div>
    {page <= length - 1 ? <Question 
        type={currentQuestion.type} 
        theme={currentQuestion.theme} 
        options={currentQuestion.options}
        pageNum={page} 
        length={length} 
      /> : <div className="absolute left-[25%] top-[25%] w-[25%] h-[25%] flex justify-center-items-center text-[40px]">
        Тест окончен
        </div>}
    
    </main>
  );
}



