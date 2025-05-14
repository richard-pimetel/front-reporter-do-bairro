import { useState } from 'react'
import { buscarCoordenadas } from '../../services/Nominatim/buscarCoordenadas'
import './inputEndereco.css'

// Tipo das coordenadas esperadas
type Coordenadas = {
  lat: number
  lon: number
}

// Props do componente
type InputEnderecoProps = {
  setCoordenadas: (coords: Coordenadas) => void
}

function InputEndereco({ setCoordenadas }: InputEnderecoProps) {
  const [endereco, setEndereco] = useState("")

  const handleBuscar = async () => {
    const coords = await buscarCoordenadas(endereco)
    if (coords) {
      setCoordenadas(coords)
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
      <button onClick={handleBuscar}>Buscar</button>
    </div>
  )
}

export default InputEndereco
