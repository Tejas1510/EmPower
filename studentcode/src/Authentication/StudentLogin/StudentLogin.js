import React, { useState } from "react";
import axios from "axios";

function StudentLogin() {
  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/student/login/", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="mt-3 mb-3">
        <div className="col-12 col-md-6 offset-sm-3 container">
          <div className="card">
            <center>
              <h3 className="card-header bg-primary text-white p-3">
                Student Login Form
              </h3>
            </center>
            <div className="card-body">
              <div className="row row-content">
                <div className="col-12">
                  <form onSubmit={submitHandler}>
                    <div className="form-group row">
                      <label
                        htmlFor="email"
                        className="col-md-3 col-form-lable"
                      >
                        Email
                      </label>
                      <div className="col-md-9">
                        <input
                          type="email"
                          value={data.email}
                          onChange={(e) =>
                            setdata({ ...data, email: e.target.value })
                          }
                          className="form-control"
                          id="Location"
                          name="Location"
                          placeholder="Email"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="companyType"
                        className="col-md-3 col-form-lable"
                      >
                        Password
                      </label>
                      <div className="col-md-9">
                        <input
                          type="password"
                          value={data.password}
                          onChange={(e) =>
                            setdata({ ...data, password: e.target.value })
                          }
                          className="form-control"
                          id="companyType"
                          name="companyType"
                          placeholder="Password"
                        />
                      </div>
                    </div>

                    <center>
                      <button className="btn btn-primary col-6" type="submit">
                        Login
                      </button>
                    </center>
                  </form>
                </div>
                <div className="col-12 col-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
