import Header from "../components/Header/Header";

function HeaderOnly({children}) {
    return ( 
        <div>
           <Header/>
            <div>
                <div>{children}</div>
            </div>
        </div>
     );
}

export default HeaderOnly;