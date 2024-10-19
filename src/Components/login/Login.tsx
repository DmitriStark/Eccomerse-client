
// import { useRef, useState, useEffect, useContext, FormEvent } from "react";
// import AuthContext from "../context/AuthProvider";
// import axios from "axios";
// import React from "react";
// import "./login.css";


// const LOGIN_URL = import.meta.env.VITE_Login_URL;

// const Login = () => {
//   const { setAuth } = useContext(AuthContext);
//   const emailRef = useRef<HTMLInputElement>(null);
//   const errRef = useRef<HTMLParagraphElement>(null);

//   const [email, setEmail] = useState<string>(""); // Changed from user to email
//   const [pwd, setPwd] = useState<string>("");
//   const [errMsg, setErrMsg] = useState<string>("");
//   const [success, setSuccess] = useState<boolean>(false);

//   useEffect(() => {
//     emailRef.current?.focus(); // Focus on the email input field
//   }, []);

//   useEffect(() => {
//     setErrMsg("");
//   }, [email, pwd]);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         LOGIN_URL,
//         JSON.stringify({ email: email, password: pwd }), // Updated to send email
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         }
//       );
//       console.log("@@", JSON.stringify(response?.data));
//       const accessToken = response?.data?.token;
//       const roles = response?.data?.roles;
//       setAuth({ email, pwd, roles, accessToken }); // Updated to use email
//       setEmail(""); // Reset email state
//       setPwd(""); // Reset password state
//       setSuccess(true);
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       // type any for handling axios errors
//       if (!err?.response) {
//         setErrMsg("No Server Response");
//       } else if (err.response?.status === 400) {
//         setErrMsg("Missing Email or Password");
//       } else if (err.response?.status === 401) {
//         setErrMsg("Unauthorized");
//       } else {
//         setErrMsg("Login Failed");
//       }
//       errRef.current?.focus();
//     }
//   };

//   return (
//     <>
//       <div className="logContainer">
//         {success ? (
//           <section>
//             <h1>You are logged in!</h1>
//             <br />
//             <p>
//               <a href="#">Go to Home</a>
//             </p>
//           </section>
//         ) : (
//           <section>
//             <p
//               ref={errRef}
//               className={errMsg ? "errmsg" : "offscreen"}
//               aria-live="assertive"
//             >
//               {errMsg}
//             </p>
//             <h1>Sign In</h1>
//             <form onSubmit={handleSubmit}>
//               <label htmlFor="email">Email:</label>{" "}
//               {/* Changed from username to email */}
//               <input
//                 type="email" // Updated input type to email
//                 id="email"
//                 ref={emailRef}
//                 autoComplete="off"
//                 onChange={(e) => setEmail(e.target.value)} // Updated to setEmail
//                 value={email}
//                 required
//               />
//               <label htmlFor="password">Password:</label>
//               <input
//                 type="password"
//                 id="password"
//                 onChange={(e) => setPwd(e.target.value)}
//                 value={pwd}
//                 required
//               />
//               <button>Sign In</button>
//             </form>
//             <p>
//               Need an Account?
//               <br />
//               <span className="line">
//                 <a href="#">Sign Up</a>
//               </span>
//             </p>
//           </section>
//         )}
//       </div>
//     </>
//   );
// };

// export default Login;


import React, { useRef, useState, useEffect, useContext, FormEvent } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "axios";
import "./login.css";

const LOGIN_URL = import.meta.env.VITE_Login_URL;

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const emailRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [email, setEmail] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [errMsg, setErrMsg] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [email, pwd]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ email, password: pwd }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            const accessToken = response?.data?.token;
            const roles = response?.data?.roles;
            setAuth({ email, pwd, roles, accessToken });

            setEmail("");
            setPwd("");
            setSuccess(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing Email or Password");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
            errRef.current?.focus();
        }
    };

    return (
        <div className="logContainer">
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?
                        <span className="line">
                            <a href="#">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </div>
    );
};

export default Login;
