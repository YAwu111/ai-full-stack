import style from './index.module.css'

export default function LoadingFallback(){
    return (
        <div className={style.container}>
            <div className={style.spinner}>
                <div className={style.circle}></div>
                <div className={`${style.circle} ${style.inner}`}></div>    
            </div>
            <p className={style.text}>Loading...</p>
        </div>
    )
}