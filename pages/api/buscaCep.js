import axios from 'axios';

export default function handler(req, res) {

    if (req.method === 'POST') {
            axios.get(`https://viacep.com.br/ws/${req.body.cep}/json/`)
            .then((response) => {

                if(!!response.data.erro){
                    res.status(406).json({message: 'CEP Inválido'})
                }else{
                    res.status(200).json(
                        {
                        cep: response.data.cep,
                        logradouro: response.data.logradouro,
                        cidade: response.data.localidade,
                        estado: response.data.uf,
                        })
                }

            })
            .catch((err) => {
              console.error("ops! ocorreu um erro" + err);

           });
      } else {
        res.status(200).json({message: 'Api node.js'})
      }
  } 