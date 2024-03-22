import "./Register.scss";
import { useHistory } from "react-router-dom";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { registerNewUser } from "../../services/userServies";
const Register = (props) => {
  const [email, setEmail] = useState(""); // casi huc
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultValidInput ={//hieu ung khi kiem gia tri nhap vao
    isVakiEmail:true,
    isValiPhone:true,
    isValiPassword: true,
    isValidConfirmPassword:true
  }
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);// code chay tron tru

  let history = useHistory();
  const handleLogin = () => {
    history.push("/Login");
  };



  // useEffect(() => {
  //   //  axios.get("http://localhost:8080/api/v1/test-api").then(data => {
  //   //     console.log("<<<chek data axios: ", data);//axios la dung api day data len 
  //   //  })
    
  // }, [[]]);

  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);
    if (!email) {
      toast.error("email is req");
      setObjCheckInput({...defaultValidInput,isVakiEmail: false});
      return false;
    }

    let res = /\S+@\S+\.\S+/;
    if (!res.test(email)) {
      toast.error("Please enter a vaild email address");
      setObjCheckInput({...defaultValidInput,isVakiEmail: false});
      return false;
    }
    if (!phone) {
      toast.error("phone number is req");
      setObjCheckInput({...defaultValidInput,isValiPhone: false});
      return false;
    }
    if (!password) {
      toast.error("password is req");
      setObjCheckInput({...defaultValidInput,isValiPassword: false});
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Your password is not the same");
      setObjCheckInput({...defaultValidInput,isValidConfirmPassword: false});
      return false;
    }

    return true;
  };
  
  const handleRegister = async () => {
    let check = isValidInputs();
    
    if(check === true)
    {
     let response = await registerNewUser(email, phone, username, password);
     let serverData = response.data;
     if(+serverData.EC === 0)
     {
      toast.success(serverData.EM);
      history.push("/Login");
     }else{
      toast.error(serverData.EM);

     }
     console.log(">>check renponse: ", response);
    }

  };
  return (
    <div className="register-contanier">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-7 d-none d-sm-block">
            <div className="brand">Hoi dan IT</div>
            <div className="detail">
              Hoi dan IT helps you connect and share with the people in your
              life.
            </div>
          </div>
          <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3 ">
            <div className="brand d-sm-none">Hoi dan IT</div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                className={objCheckInput.isVakiEmail ? 'form-control' : 'form-control is-invalid'}
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone number:</label>
              <input
                type="text"
                className={objCheckInput.isValiPhone ? 'form-control' : 'form-control is-invalid'}
                placeholder="Phone number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>User name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="User name"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className={objCheckInput.isValiPassword ? 'form-control' : 'form-control is-invalid'}
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Re-enter Password:</label>
              <input
                type="password"
                className={objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'}
                placeholder="Re-enter Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => handleRegister()}
            >
              Register{" "}
            </button>

            <hr />
            <div className="text-center">
              <button className="btn btn-success" onClick={() => handleLogin()}>
                Already've an account. Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
