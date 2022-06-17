import React, {useState, useEffect} from "react";
import Global from "./GlobalStyles";
import Header from "./components/header";
import TBody from "./components/tbody";

function App() {

  const [search, setSearch] = useState('');
  const [marcas, setMarcas] = useState('');
  const [modelos, setModelos] = useState('');

  useEffect(()=>{
     const data = async () => { 
      const response = await fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas", {method:'GET'}).then(res => res.json());
      setMarcas(response)
    }
     data();
  }, [])
  
  return (
    <div className="App">
      <Header />
      <TBody data={marcas}/>
      <Global />
    </div>
  )
}

export default App
