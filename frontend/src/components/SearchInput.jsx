import styles from '../styles/SearchInput.module.css';

import { useSearchParams } from "react-router-dom";
import { Search, MapPin, BedDouble } from 'lucide-react';


export default function SearchInput() {
    const [searchParams, setSearchParams] = useSearchParams();
    
    function adicionarNaUrl(nome, valorInput) {
        valorInput = valorInput.toLowerCase()
        setSearchParams({inp:valorInput})
    }
    return (
        <div className={styles.cont_input}>
            <MapPin color='#1A1A1A' />
            <input className={styles.input} type="text" onBlur={e => adicionarNaUrl("inp", e.target.value)} placeholder='Qualquer lugar em Osasco, SP' />
        </div>
    )
}