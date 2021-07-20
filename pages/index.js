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

        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response) => {

                setHideResult(false);
    
                if(!!response.data.erro){
                    setCepResult({message: 'CEP Inválido'});
                    // response.status(406).json({message: 'CEP Inválido'})
                }else{
                    console.log(response.data);
                    setCepResult(response.data);
                    // response.status(200).json({cep: response.data})
                }
                
            })
            .catch((err) => {
              console.error("ops! ocorreu um erro" + err);
      
           });

    //     axios.post('/api/buscaCep', {cep: cep})
    //     .then((response) => {
    //         console.log(response)
    //         resolve();
    //     })
    //     .catch((err) => {
    //       console.error("ops! ocorreu um erro" + err);
    //       resolve();
    //    });
    
      }

      const handleCep = (value) => {
        // console.log(value);
        setCep(value);
        if(value.length<8){
            setHideResult(true);
        }
        // console.log(cep.length)
        // console.log(value);
      }

    return(
    <>
     <div className={styles.container}>
         <div className={styles.title}>
             Buscar CEP by Ian
         </div>
         <div className={styles.card}>

            <form onSubmit={onBuscarCep}>
                <NumberFormat onValueChange={(e) => handleCep(e.value)} id="cep" className={styles.inputCep} format="#####-###" mask="_" placeholder="0000-000"  />
                <button disabled={cep.length==8 ? false : true} type="submit" className={styles.button} >Buscar CEP</button>
            </form>

         </div>

        <ResultCard hide={hideResult} cepResult={cepResult} />
         
       
     </div>
    </>
    )
}

function ResultCard({cepResult, hide}){
    return(
        <div style={{display: hide ? 'none': 'block'}} className={styles.card}>
            {!!cepResult.message && <p><strong> {cepResult.message}</strong></p>}
            {!!cepResult.cep && <p><strong>CEP: </strong>{cepResult.cep}</p>}
            {!!cepResult.cep && <p><strong>Estado: </strong>{cepResult.uf}</p>}
           {!!cepResult.cep && <p><strong>Cidade: </strong>{cepResult.localidade}</p>}
           {!!cepResult.cep && <p><strong>Logradouro: </strong>{cepResult.logradouro}</p>}
        </div>
    )
}