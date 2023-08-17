import HeaderOnly from "../HeaderOnly/HeaderOnly";

function DefaultLayout({children}) {
    return ( 
        <HeaderOnly>
            {children}
        </HeaderOnly>
     );
}

export default DefaultLayout;