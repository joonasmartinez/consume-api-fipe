import React, {useState, useEffect} from "react";
import Global from "./GlobalStyles";
import Header from "./components/header";
import TBody from "./components/tbody";
import Footer from "./components/footer";

function App() {

  const [marcas, setMarcas] = useState('');
  const [data, setData] = useState({ marca: '', modelo: '', ano: '' });

  useEffect(()=>{
     const data = async () => { 
      const response = await fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas", {method:'GET'}).then(res => res.json());
      setMarcas(response)
    }
     data();
  }, [])

  const sendSearch = (dados) => {
    setData(dados);
  }
  
  return (
    <div className="App">
      <Header sendSearch={sendSearch} />
      <TBody data={marcas} fromSearch={data}/>
      <Global />
      <Footer/>
    </div>
  )
}

export default App
