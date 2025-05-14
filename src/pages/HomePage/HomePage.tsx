import { useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Mapa from '../../components/mapa/mapa.tsx'
import InputEndereco from '../../components/inputCoordenadas/inputEndereco.tsx'



function HomePage(){
    const [coordenadas, setCoordenadas] = useState(null)

    return (
        <div>
            <InputEndereco setCoordenadas={setCoordenadas} />
            <Mapa coordenadas={coordenadas} />
        </div>
    )
}

export default HomePage