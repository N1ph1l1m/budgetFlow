import { ChangeEvent, useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { RootState } from "../../store";
import {fetchTransactions} from "../../entities/API/getTransactions"
const Custom = () => {

  const dispatch = useDispatch();
  const { isLoaded,categoryList } = useSelector(
    (state: RootState) => state.transactionsSlice
  );

  useEffect(() => {
    fetchTransactions({isLoaded,categoryList, dispatch});
  }, [isLoaded, categoryList,dispatch]);

  const getToday = () => {
    const today = new Date();

    return today.toISOString().split("T")[0];
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
