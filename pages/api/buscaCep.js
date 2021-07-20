import axios from 'axios';

export default function handler(req, res) {

    if (req.method === 'POST') {
        if(!!req.body.cep){
            axios.get(`https://viacep.com.br/ws/${req.body.cep}/json/`)
            .then((response) => {
    
                if(!!response.data.erro){
                    console.log('ERRLLOU!')
                    res.status(200).json({message: 'CEP Inválido'})
                }else{
                    console.log(response.data)
                    res.status(200).json({cep: response.data})
                }
                
            })
            .catch((err) => {
              console.error("ops! ocorreu um erro" + err);
      
           });
        }else{
            res.status(200).json({message: 'deu mal'})
        }
      } else {
        res.status(200).json({message: 'buscar cep'})
      }
    


    
    
    
    // const getCep = async function() {
    //     const resp = await axios.get(`https://viacep.com.br/ws/${req.body}/json/`)
    //     const data = await resp.data
    
    //   console.log(`Show data fetched. Count: ${data.length}`)
    
    //   return {
    //     data: data
    //   }
    // }
    // getCep();

    // res.status(200).json({message: 'não encontrado'})
  }