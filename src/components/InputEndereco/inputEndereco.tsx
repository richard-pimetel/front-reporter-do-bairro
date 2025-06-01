import { useState } from 'react'
import buscarCoordenadasComEndereco from '../../services/Nominatim/buscarCoordenadas'
import './inputEndereco.css'

// Props esperadas do componente
type InputEnderecoProps = {
  setResultadoEndereco: (resultado: any) => void // agora usa a função certa
}

function InputEndereco({ setResultadoEndereco }: InputEnderecoProps) {
  const [endereco, setEndereco] = useState("")

  const handleBuscar = async () => {
    const resultado = await buscarCoordenadasComEndereco(endereco)
    

    if (resultado) {
      setEndereco(resultado.display_name)
      console.log("Resultado completo:", resultado)
      setResultadoEndereco(resultado) 
    } else {
      alert("Endereço não encontrado.")
    }
  }

  return (
    <div>
      <input
        type="text"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
        placeholder="Digite o endereço"
      />
      <button onClick={handleBuscar}>Verificar Endereço</button>
    </div>
  )
}

export default InputEndereco
