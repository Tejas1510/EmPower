import React,{useState} from 'react';
import axios from 'axios';
function UniversitySignUp() {

    const [data, setdata] = useState({
		institution_name:"",
		email: "",
		contact_person:"",
		phone_number:"",
		website:"",
        password: ""
	})
	
	const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://learnzilla.herokuapp.com/institution/register/', data)
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
			<center><h3 ClassName="card-header bg-primary text-white p-3">University Sign-up Form</h3></center>
			<div className="card-body">
				<div className="row row-content">
					 <div className="col-12">
						 <form onSubmit={submitHandler}>
							 <div className="form-group row">
								 <label for="companyName" className="col-md-3 col-form-label">
									 Institute Name
								 </label>
								 <div className="col-md-9">
									 <input type="text" value={data.institution_name} onChange={e => setdata({ ...data, institution_name: e.target.value})} className="form-control" id="companyName" name="companyName" placeholder="Institute Name"/>
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
									Contact Person
								</label>
								<div className="col-md-9">
									<input type="text" value={data.contact_person} onChange={e => setdata({ ...data, contact_person: e.target.value})} className="form-control" id="email" name="email" placeholder="Contact Person"/>
								</div>
							</div>

							 <div className="form-group row">
								 <label for="name" className=" col-12 col-md-3 col-form-label">
									 Phone Number
								 </label>
								 <div className="col-md-9">
									 <input type="number" value={data.phone_number} onChange={e => setdata({ ...data, phone_number: e.target.value})} className="form-control" id="name" name="name" placeholder="Phone Number"/>
								 </div>
							 </div>

							 <div className="form-group row">
								 <label for="emailid" className="col-md-3 col-form-lable">
									 Website
								 </label>
								 <div className="col-md-9">
									 <input type="text" value={data.website} onChange={e => setdata({ ...data, website: e.target.value})} className="form-control" id="emailid" name="emailid" placeholder="Website(http://xyx.com)"/>
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

							
							 
							 <center><button class="btn btn-primary col-6">Create Account</button></center>
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

export default UniversitySignUp
