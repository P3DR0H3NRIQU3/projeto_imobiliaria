import styles from '../styles/Search.module.css';


import Header from "../components/Header";
import SearchInput from "../components/SearchInput";
import Filters from "../components/Filters";

export default function Imoveis() {

    return (
        <main className={styles.search}>
            <Header/>
            <div className={styles.cont_search}>
                <SearchInput />
                <div className={styles.cont_filters}>
                    <Filters />
                </div>
            </div>
            <div className={styles.cont_imoveis}>
                
            </div>

        </main>
    )

}