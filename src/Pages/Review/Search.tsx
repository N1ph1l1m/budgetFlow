import { useEffect, useState } from "react";
import styles from "../../app/styles/Search.module.css"
import { RootState } from "../../store";
import { useSelector,useDispatch } from "react-redux";
import ListTransactions from "../../widget/ListTransactions/ListTransactions";
import { fetchTransactions } from "../../entities/API/getTransactions";
import { ITransactionData } from "../../store/Slice/transactionsSlice/transactionsSlice";
const Search = () => {

     const dispatch = useDispatch();
  const { isLoaded,categoryList } = useSelector(
    (state: RootState) => state.transactionsSlice
  );

  useEffect(() => {
    fetchTransactions({isLoaded,categoryList, dispatch});
  }, [isLoaded, categoryList,dispatch]);


    const [transactionName,setTransactionName] = useState("")
    const [resultList,setResultList] = useState([])


    const {transactionState} = useSelector((state:RootState)=>state.transactionsSlice)

    function  findTransactions(){
        if(transactionName.length >=2){
      const result= transactionState?.filter((item)=>item.description.toLocaleLowerCase().includes(transactionName.toLocaleLowerCase()) )
        setResultList(result)
        console.log(typeof(resultList));
        }else{
                    setResultList([])
        }

    }


    const renderList = ()=>{

        return(<>
        {resultList.map((item)=>(
            <ul className={styles.resultWrap}>
                     <li>{item.id}</li>
                   <li>{item.description}</li>
                                  <li>{item.date}</li>
                                                 <li>{item.price}</li>

                   </ul>
        ))}
        </>)


    }

    const renderResult =()=>{
        return(<>

            {renderList()}



        </>)
    }

    function handlerInput(e){
        setTransactionName(e.target.value)
    }


    useEffect(()=>{
        findTransactions()
    },[transactionName])




    return (
        <div className={styles.searchWrap}>
            <h1>Поиск</h1>
            <input className={styles.searchInput} onChange={(e)=>handlerInput(e)} value={transactionName}/>
            {renderResult()}
        </div>
    );
};

export default Search;
