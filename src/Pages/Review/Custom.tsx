import { ChangeEvent, useState } from "react";

const Custom = () => {


  const getToday = () => {
    const today = new Date();
    console.log(today);
    return today.toISOString().split("T")[0]; // "2025-05-16"
  };

  const [startDate, setStartDate] = useState<string>(getToday());
const [endDate,setEndDate]  = useState<string>(getToday());

    function handlerStartDate(e:ChangeEvent<HTMLInputElement>){
        setStartDate(e.target.value)
    }

        function handlerEndDate(e:ChangeEvent<HTMLInputElement>){
        setEndDate(e.target.value)
    }


    return (
        <div>
            <label htmlFor='start'><span>За период с </span></label>
            <input  value={startDate} onChange={handlerStartDate} id="start" type='date' />

            <label htmlFor='end'><span>по </span></label>
            <input value={endDate} onChange={handlerEndDate} id="end" type='date' />
        </div>
    );
};

export default Custom;
