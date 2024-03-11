import './Login.scss'
const Login = (props) => {
     return (
        <div className="login-contanier">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-7 d-none d-sm-block">
                        <div className='brand'>
                            Hoi dan IT
                        </div>
                        <div className='detail'>
                        Hoi dan IT helps you connect and share with the people in your life.
                        </div>
                    </div>
                    <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3 ">
                        <div className='brand d-sm-none'>
                            Hoi dan IT
                        </div>
                        <input type = "text" className='form-control' placeholder='Email address or phone number'/>
                        <input type = "password" className='form-control' placeholder='Password'/>
                        <button className='btn btn-primary'>Login </button>
                        <span className='text-center'>
                            <a href='#' className='forgot-password'>Forgot your password? </a>
                            </span>
                        <hr />
                        <div className='text-center'>
                        <button className='btn btn-success'>Create new account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     )
}

export default Login;