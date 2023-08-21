import  'bootstrap/dist/css/bootstrap.min.css'
import './GlobalStyle.module.scss';
function GlobalStyle({children}) {
    return ( <>
        {children}
    </> );
}

export default GlobalStyle;