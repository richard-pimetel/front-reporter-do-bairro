// import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Mapa from '../../components/mapa/mapa.tsx'
import InputEndereco from '../../components/InputEndereco/inputEndereco.tsx'



function MapPage(){
    type Coordenadas = {
        lat: number
        lon: number
    }

    const [coordenadas, setCoordenadas] = useState<Coordenadas | undefined>(undefined)


    return (
        <div>
            <InputEndereco setResultadoEndereco={setCoordenadas} />
            <Mapa coordenadas={coordenadas} />
        </div>
    )
}

export default MapPage