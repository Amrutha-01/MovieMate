import React, { useState } from "react";
import "./signup.css";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Signin from "./signin";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required("This field is required")
      .matches(/^[A-Za-z]+(?:\s+[A-Za-z0-9]+)*$/
      , "Name must start with a letter"),
    email: Yup.string()
      .email("Invalid email")
      .required("This field is required"),
    pass: Yup.string()
      .min(6, "Password must be atleast 6 characters")
      .required("This field is required"),
    confirmPass: Yup.string().min(6).required("This field is required"),
    // .oneOf([Yup.ref("password"), null], "Password must match"),
  });

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        fullName: "",
        email: "",
        pass: "",
        confirmPass: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        try {
          const { email, pass, fullName } = values;
          const formData = { fullName: fullName, email: email, password: pass };
          try {
            const response = await axios.post(
              "https://localhost:5000/api/auth/signup",
              formData, 
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            console.log("SignUp successful", response.data);
            navigate("/mainPage");
          } catch (err) {
            console.log("Error signing up", err);
          }
        } catch (error) {
          console.error(error.response.data);
        }
      },
    });
  
  return (
    <form className="signup" onSubmit={handleSubmit} name="signup">
      <h4>Sign Up Now</h4>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={values.fullName}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {/* <p>{errors.name}</p> */}
      {touched.fullName && errors.fullName && (
        <span style={{ color: "red" }}>{errors.fullName}</span>
      )}
      <br />
      <input
        type="email"
        placeholder="Enter your Email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.email && errors.email && (
        <span style={{ color: "red" }}>{errors.email}</span>
      )}
      <br />
      <input
        type="password"
        placeholder="Enter a strong password"
        name="pass"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.pass}
      />
      {touched.pass && errors.pass && (
        <span style={{ color: "red" }}>{errors.pass}</span>
      )}
      <br />
      <div>
        <input
          type="password"
          placeholder="Enter your password again"
          name="confirmPass"
          id="confirmPass"
          value={values.confirmPass}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.confirmPass && touched.confirmPass ? (
          <span style={{ color: "red" }}>{errors.confirmPass}</span>
        ) : null}
        <br />
      </div>
      <button type="submit" class="btn btn-success mt-2">
        Submit
      </button>
    </form>
  );
}
