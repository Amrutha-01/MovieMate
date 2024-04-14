import React from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"
import axios from "axios";
import { setItemInLocalStorage } from "../../../redux/moviesSlice";

export default function Signin() {
  // const [mail, setMail] = useState("");
  // const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // const handleSubmit=(e)=>{
  //   e.preventDefault();
  //   signInWithEmailAndPassword(database, mail, password)
  //   .then(data=>{
  //     data&&console.log(data.user)
  //     navigate('/mainPage')
  //     // data?data.user.displayName:null
  //   }).catch(err=>{console.log(err)});
  // }

  const validationSchema = Yup.object({
    Inemail: Yup.string()
      .email("Invalid email")
      .required("This field is required"),
    InPass: Yup.string()
      .min(6, "Password must be atleast 6 characters")
      .required("This field is required"),
  });

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        Inemail: "",
        InPass: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        try {
          const { Inemail, InPass } = values;
          const formData = {email: Inemail, password: InPass };
          try {
            const response = await axios.post(
              "https://movie-mate-1csd.onrender.comapi/api/auth/login",
              formData,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            console.log('SignIn successful',response.data)
            localStorage.setItem('token',response.data.token)
            // setItemInLocalStorage({key:'token',value:response.data.token})
            navigate('/mainPage')

          } catch (err) {
            console.log("Error signing up",err)
          }
        } catch (error) {
          console.error(error.response.data);
        }
      //   try {
      //     const { Inemail, InPass } = values;
      //     const userCredential = await signInWithEmailAndPassword(
      //       database,
      //       Inemail,
      //       InPass
      //     );

      //     if (userCredential) {
      //       // console.log(userCredential);
      //       navigate("/mainPage");
      //     }
      //   } catch (error) {
      //     console.error("Error creating user:", error.message);
      //   }
      },
    });
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign In</h3>
      <input
        type="email"
        placeholder="Enter your email"
        name="Inemail"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.Inemail}
      />
      {touched.Inemail && errors.Inemail && (
          <span style={{color:"red"}}>{errors.Inemail}</span>
        )}
      <input
        type="password"
        placeholder="Enter your password"
        name="InPass"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.InPass}
      />
      {touched.InPass && errors.InPass && (
          <p style={{color:"red"}}>{errors.InPass}</p>
        )}
      <button type="submit" class="btn btn-success mt-2">
        Sign In
      </button>
    </form>
  );
}
