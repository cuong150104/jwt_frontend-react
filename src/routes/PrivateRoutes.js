import { useEffect } from "react";
import {  Route } from 'react-router-dom';
import { useHistory } from "react-router-dom";
const PrivateRoutes = (props) =>{
    let history = useHistory();

    useEffect(() => (props) => {
        let session = sessionStorage.getItem('account');
        if (!session) {
          history.push("/login");
          window.location.reload();
        }
    }, []);

return (
    <>
    <Route path={props.path1} component = {props.component}/>
    </>
)
}

export default PrivateRoutes;