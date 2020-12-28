import React,{useState} from 'react';
import axios from 'axios';

function TeacherSignup() {

    const [data, setdata] = useState({
		institution_email:"",
		email: "",
		name:"",
		phone_number:"",
        password: ""
	})
	
	const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://learnzilla.herokuapp.com/teacher/register/', data)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <div className="mt-3 mb-3">
            <div className="col-12 col-md-6 offset-sm-3 container">
		<div className="card">
			<center><h3 ClassName="card-header bg-primary text-white p-3">Teacher Sign-up Form</h3></center>
			<div className="card-body">
				<div className="row row-content">
					 <div className="col-12">
						 <form onSubmit={submitHandler}>
							 <div className="form-group row">
								 <label for="companyName" className="col-md-3 col-form-label">
									 institution_Email
								 </label>
								 <div className="col-md-9">
									 <input type="email" value={data.institution_email} onChange={e => setdata({ ...data, institution_email: e.target.value})} className="form-control" id="companyName" name="companyName" placeholder="Institute Email"/>
								 </div>
							 </div>
							 <div className="form-group row">
								 <label for="email" className="col-md-3 col-form-lable">
									 Email
								 </label>
								 <div className="col-md-9">
									 <input type="email" value={data.email} onChange={e => setdata({ ...data, email: e.target.value})} className="form-control" id="Location" name="Location" placeholder="Email"/>
								 </div>
		 
							 </div>
							 <div className="form-group row">
								<label for="text" className="col-md-3 col-form-label">
									Name
								</label>
								<div className="col-md-9">
									<input type="text" value={data.name} onChange={e => setdata({ ...data, name: e.target.value})} className="form-control" id="email" name="email" placeholder="Contact Person"/>
								</div>
							</div>

							 <div className="form-group row">
								 <label for="name" className=" col-12 col-md-3 col-form-label">
									 Mobile Number
								 </label>
								 <div className="col-md-9">
									 <input type="number" value={data.phone_number} onChange={e => setdata({ ...data, phone_number: e.target.value})} className="form-control" id="name" name="name" placeholder="Phone Number"/>
								 </div>
							 </div>

							 
							 <div className="form-group row">
								<label for="companyType" className="col-md-3 col-form-lable">
									Password
								</label>
								<div className="col-md-9">
									<input type="password" value={data.password} onChange={e => setdata({ ...data, password: e.target.value})} className="form-control" id="companyType" name="companyType" placeholder="Password"/>
								</div>
		
							</div>

							
							 
							 <center><button class="btn btn-primary col-6">Login</button></center>
						 </form>
					 </div>
					  <div class="col-12 col-md">
					 </div>
				</div>
			</div>
		</div>
	</div>
        </div>
        </div>
    )
}

export default TeacherSignup
