import getData from "./scripts/getData";
import react,{useState} from "react"

function App() {
  let [inputValue,setInputValue]=useState('')
  let [data,setData]=useState('')
  const updateInput=(e)=>{
    const number=e.target.value
    if(number<999999999999){
      setInputValue(number)
      getData(number).then(data=>setData(data))
    }
  }
  return (
    <div className="App">
      <div className="App_inner">
        <div className="App_container">
          <input onChange={updateInput} value={inputValue} type="number" className="input"/>
          <div className="data_display">
            <p>{data}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
