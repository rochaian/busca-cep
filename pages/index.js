import styles from '../styles/Home.module.css';
import React from 'react';
import NumberFormat from 'react-number-format';
import axios from 'axios';


export default function Home(){


    const [cep, setCep] = React.useState('');
    const [cepResult, setCepResult] = React.useState({});
    const [ hideResult, setHideResult] = React.useState(true);
    

    const onBuscarCep = async event => {
        event.preventDefault()

        axios.post(`/api/buscaCep`, {cep: cep})
            .then((response) => {         
                setHideResult(false);   
                setCepResult(response.data);
            })
            .catch((err) => {
                if(err.response.status == 406){
                    setHideResult(false);
                    setCepResult({message: 'CEP Inválido'});
                }else{
                    console.error("ops! ocorreu um erro" + err);
                }
           });
      }

      const handleCep = (value) => {
        setCep(value);
        if(value.length<8){
            setHideResult(true);
        }
      }

    return(
    <>
     <div className={styles.container}>
         <div className={styles.title}>
             BUSCAR CEP
         </div>

         <div className={styles.card}>
            <form onSubmit={onBuscarCep}>
                <NumberFormat onValueChange={(e) => handleCep(e.value)} id="cep" className={styles.inputCep} format="#####-###" mask="_" placeholder="0000-000"  />
                <button disabled={cep.length==8 ? false : true} type="submit" className={styles.button} >Buscar CEP</button>
            </form>
         </div>

        <ResultCard hide={hideResult} cepResult={cepResult} />

        <Footer/>
         
       
     </div>
    </>
    )
}

function ResultCard({cepResult, hide}){
    return(
        <div style={{display: hide ? 'none': 'block'}} className={styles.resultCard}>
            {!!cepResult.message && <p style={{color:'red'}}><strong> {cepResult.message}</strong></p>}
            {!!cepResult.cep && <p><strong>CEP: </strong>{cepResult.cep}</p>}
            {!!cepResult.cep && <p><strong>Estado: </strong>{cepResult.uf}</p>}
           {!!cepResult.cep && <p><strong>Cidade: </strong>{cepResult.localidade}</p>}
           {!!cepResult.cep && <p><strong>Logradouro: </strong>{cepResult.logradouro}</p>}
        </div>
    )
}

function Footer(){
    return <div> Feito por Ian Rocha | <a href="https://golaunch.com.br">Go Launch</a> </div>
}