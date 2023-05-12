import React,{useState,useEffect} from 'react'
import axios from "axios"
import { useLocation } from 'react-router-dom'
function Luser() {
  const[data,setData]=useState([])
  const[firstTime,setFirstTime]=useState(true)
  const [values, setValues] = useState('');
  const [values1, setValues1] = useState('');
  const [values2, setValues2] = useState('');
  const [final,setFinal]=useState(false)
  const [history,setHistory]=useState([])
  const[email,setEmail]=useState('')
  const location = useLocation();
   
const [showOptions, setShowOptions] = useState(false);const [showOptions1, setShowOptions1] = useState(false);const [showOptions2, setShowOptions2] = useState(false);const [showOptions3, setShowOptions3] = useState(false);

const [sub0, setSub0] = useState(false);const [sub01, setSub01] = useState(false);const [sub02, setSub02] = useState(false);const [sub03, setSub03] = useState(false);

const [sub1, setSub1] = useState(false);const [sub11, setSub11] = useState(false);const [sub12, setSub12] = useState(false);const [sub13, setSub13] = useState(false);

const [sub2, setSub2] = useState(false);const [sub21, setSub21] = useState(false);const [sub22, setSub22] = useState(false);const [sub23, setSub23] = useState(false);

const [sub3, setSub3] = useState(false);const [sub31, setSub31] = useState(false);const [sub32, setSub32] = useState(false);const [sub33, setSub33] = useState(false);

const handleButtonClick = (index,value) => {
  if (index==0)
  {
    setShowOptions(!showOptions);setShowOptions1(false);setShowOptions2(false);setShowOptions3(false)
    setValues( value);
  }else if (index==1)
  {
    setShowOptions1(!showOptions1);setShowOptions(false);setShowOptions2(false);setShowOptions3(false);
    setValues( value);
  }
  else if (index==2)
  {
    setShowOptions2(!showOptions2);setShowOptions1(false);setShowOptions(false);setShowOptions3(false);
    setValues( value);
  }
  else if (index==3)
  {
    setShowOptions3(!showOptions3);setShowOptions1(false);setShowOptions2(false);setShowOptions(false);
    setValues( value);
  }  
};
const handleButtonClick1=(index,value)=>{
  if (index==0)
  {
    setSub0(!sub0);setSub01(false);setSub02(false);setSub03(false)
    setValues1(value);
  }  
  else if(index==1)
  {
    setSub0(false);setSub01(!sub01);setSub02(false);setSub03(false)
    setValues1(value);
  }
  else if(index==2)
  {
    setSub0(false);setSub01(false);setSub02(!sub02);setSub03(false)
    setValues1(value);
  }
  else if(index==3)
  {
    setSub0(false);setSub01(false) ;setSub02(false);setSub03(!sub03) 
    setValues1(value); 
  }
}
const handleButtonClick2=(index,value)=>{
  if (index==0)
  {
    setSub1(!sub1);setSub11(false);setSub12(false);setSub13(false)
    setValues1(value);
  }
  else if(index==1)
  {
    setSub1(false);setSub11(!sub11);setSub12(false);setSub13(false)    
    setValues1(value);
  }
  else if(index==2)
  {
    setSub1(false);setSub11(false);setSub12(!sub12);setSub13(false)  
    setValues1(value);
  }
  else if(index==3)
  {
    setSub1(false);setSub11(false);setSub12(false);setSub13(!sub13) 
    setValues1(value);
  }
}
const handleButtonClick3=(index,value)=>{
  if (index==0)
  {
    setSub2(!sub0);setSub21(false);setSub22(false);setSub23(false)
    setValues1(value);
  } 
  else if(index==1){
    setSub2(false);setSub21(!sub01) ;setSub22(false);setSub23(false)
    setValues1(value);
  }
  else if(index==2)
  {
    setSub2(false);setSub21(false);setSub22(!sub02);setSub23(false) 
    setValues1(value); 
  }
  else if(index==3)
  {
    setSub2(false);setSub21(false);setSub22(false);setSub23(!sub03)
    setValues1(value);
  }
}

const handleButtonClick4=(index,value)=>{
  if (index==0)
  {
    setSub3(!sub3);setSub31(false);setSub32(false);setSub33(false)
    setValues1(value);
  }  
  else if(index==1)
  {
    setSub3(false);setSub31(!sub31);setSub32(false);setSub33(false)
    setValues1(value);
  }
  else if(index==2)
  {
    setSub3(false);setSub31(false);setSub32(!sub32);setSub33(false)
    setValues1(value);
  }
  else if(index==3)
  {
    setSub3(false);setSub31(false);setSub32(false);setSub33(!sub33)
    setValues1(value);
  
  }
}

const Button = ({ value, onClick }) => {
  return (
    <button onClick={onClick}>
      {value}
    </button>
  );
};
useEffect(()=>
  {  
    const userEmail = location.state?.email || ''; 
    setEmail(userEmail)  
  if(firstTime){
    
    axios.get('http://127.0.0.1:5000/protected-user',
   {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      console.log((response))
    })
    .catch(error => {
      console.error(error);
    })
    axios.get("http://127.0.0.1:5000/userreq")
    .then(res=>{
      setData(res.data.data)
      console.log(res.data.data[0],"optisol")
    })
    .catch(e=>{
      console.log(e)
    })
    axios.get("http://127.0.0.1:5000/fetch")
    .then(res=>{
      res.data.data.map(item=>
        {
      if({item}.item.email==userEmail){
        setHistory({item}.item.input)
      }
       })})
    .catch(e=>{
      console.log(e)
    })
    
      setFirstTime(false)
  }

}

  ,[])
   
  useEffect(() => {
    if(values && values1 && values2){
      setFinal(true)
      console.log(final)
    }
  }, [values,values1,values2]);
  
const handleSubmit =()=>
{
  const userEmail = location.state?.email || ''; 
  let inputvalues=[]
  inputvalues.push(values,values1,values2)
    let data={Email:userEmail,myValues:inputvalues}
    axios.post("http://127.0.0.1:5000/history",data)
    .then(res=>{
      if(res.status ==200){
        alert('Your response has been recorded')
        window.location.reload(false)
      }
    })
    .catch(e=>{console.log(e)})
}
const renderArray = (array) => {
  return array.map((element, index) => (
    <div key={index}>{element}</div>
  ));
};

const renderLastArrayElements = (array) => {
  return array.slice(3).map((element, index) => (
    <div key={index}>
      <h2>Previous login info:</h2>
      {renderArray(element)}
    </div>
  ));
};
  return (
  <div>
      {data.map(data1 => (
        <div >
          {data1.documents.map((document,index)=>(
            <div style={{display:'flex',flexDirection:'row',margin:'20px',justifyContent:'center'}}>
               <div style={{color:'#fff',backgroundColor:'#006be0',borderRadius:"15px",cursor:"pointer",width:'120px',height:"30px",display:'flex',justifyContent:'center',alignContent:"center",alignItems:'center'}} 
                 onClick={()=>handleButtonClick(index,document['question'])} >{document['question']} </div>
               <br/>
            </div>
          ))
          }         
          {
            showOptions ?
                data1.documents[0].followUpQuestions.map((item,index)=>{
                  return(<><button  onClick={()=>handleButtonClick1(index,item.name)} >{item.name}</button></>) }):null
          }
          {
           showOptions1 ?
                data1.documents[1].followUpQuestions.map((item,index)=>{
                  return(<><button  onClick={()=>handleButtonClick2(index,item.name)}>{item.name}</button></>) }):null
          }
          {
           showOptions2 ?
                data1.documents[2].followUpQuestions.map((item,index)=>{
                  return(<><button onClick={()=>handleButtonClick3(index,item.name)}>{item.name}</button></>) }):null
          }
          {
           showOptions3 ?
                data1.documents[3].followUpQuestions.map((item,index)=>{
                  return(<><button onClick={()=>handleButtonClick4(index,item.name)}>{item.name}</button></>) }):null
         }
              <br/>
              <br/>
         {
            sub0 ?
                data1.documents[0].followUpQuestions[0].sub.map((item)=>{
                  return(<><Button value={item}  onClick={() =>setValues2(item)} /></>)})
                  :null
         }
         {
           sub01 ?
                data1.documents[0].followUpQuestions[1].sub.map((item)=>{
                  return(<><Button value={item}  onClick={() =>setValues2(item)} /></>)})
                  :null
        } 
        {
           sub02 ?
                data1.documents[0].followUpQuestions[2].sub.map((item)=>{
                  return(<><Button value={item}  onClick={() =>setValues2(item)} /></>)})
                  :null
        }
        {
         sub03 ?
                data1.documents[0].followUpQuestions[3].sub.map((item)=>{
                  return(<><Button value={item}  onClick={() =>setValues2(item)} /></>)})
                  :null
        }
              <br/>

        {
         sub1 ?
                data1.documents[1].followUpQuestions[0].sub.map((item)=>{
                  return(<><Button value={item}  onClick={() =>setValues2(item)} /></>)})
                  :null
        }
        {
         sub11 ?
                data1.documents[1].followUpQuestions[1].sub.map((item)=>{
                  return(<><Button value={item}  onClick={() =>setValues2(item)} /></>)})
                  :null
        } 
        {
         sub12 ?
                data1.documents[1].followUpQuestions[2].sub.map((item)=>{
                  return(<><Button value={item}  onClick={() =>setValues2(item)} /></>)})
                  :null
        }
        {
         sub13 ?
                data1.documents[1].followUpQuestions[3].sub.map((item)=>{
                  return(<><Button value={item}  onClick={() =>setValues2(item)} /></>)})
                  :null
        }

        {
         sub2 ?
                data1.documents[2].followUpQuestions[0].sub.map((item)=>{
                  return(<><Button value={item}  onClick={() =>setValues2(item)} /></>)})
                  :null
        }
        {
         sub21 ?
                data1.documents[2].followUpQuestions[1].sub.map((item)=>{
                  return(<><Button value={item}  onClick={() =>setValues2(item)} /></>)})
                  :null
        } 
        {
         sub22 ?
                data1.documents[2].followUpQuestions[2].sub.map((item)=>{
                  return(<><Button value={item}  onClick={() =>setValues2(item)} /></>)})
                  :null
        }
        {
         sub23 ?
                data1.documents[2].followUpQuestions[3].sub.map((item)=>{
                  return(<><Button value={item}  onClick={() =>setValues2(item)} /></>)})
                  :null
        }

        {
         sub3 ?
                data1.documents[3].followUpQuestions[0].sub.map((item)=>{
                  return(<><Button value={item}  onClick={() =>setValues2(item)} /></>)})
                  :null
        }
        {
         sub31 ?
                data1.documents[3].followUpQuestions[1].sub.map((item)=>{
                  return(<><Button value={item}  onClick={() =>setValues2(item)} /></>)})
                  :null
        } 
        {
         sub32 ?
                data1.documents[3].followUpQuestions[2].sub.map((item)=>{
                  return(<><Button value={item}  onClick={() =>setValues2(item)} /></>)})
                  :null
        }
        {
         sub33 ?
                data1.documents[3].followUpQuestions[3].sub.map((item)=>{
                  return(<><Button value={item}  onClick={() =>setValues2(item)} /></>)})
                  :null
        }
       
        </div>
      ))}
      <div>
      {
        final?
         <><button onClick={()=>{handleSubmit()}}>Submit</button></>:null
      }
      </div>
      <div
      style={{
        position: 'fixed',
        top: '0',
        right: '0',
        height: '100%',
        width: '300px',
        padding: '10px',
        boxSizing: 'border-box',
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        overflow: 'auto',
      }}
      >
      <h2>Welcome {email}</h2>
      <h2>Previous login info:</h2>
       {
         renderArray(history.slice(0, 3))
       } 
       {
        renderLastArrayElements(history)
       }
      </div>
  </div>
  )
}

export default Luser