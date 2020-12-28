import React,{useState} from 'react';
import axios from 'axios';

function CreateClassroom() {

    const [data, setdata] = useState({
        teacher_email:"",
        standard:"",
        section:"",
        subject:""
        })
        
        const submitHandler = (e) => {
            e.preventDefault()
            axios.post('http://learnzilla1.herokuapp.com/classroom/create/', data)
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
									 teacher_email
								 </label>
								 <div className="col-md-9">
									 <input type="email" value={data.teacher_email} onChange={e => setdata({ ...data, teacher_email: e.target.value})} className="form-control" id="companyName" name="companyName" placeholder="Teacher Email"/>
								 </div>
							 </div>
							 <div className="form-group row">
								 <label for="name" className=" col-12 col-md-3 col-form-label">
									 Standard
								 </label>
								 <div className="col-md-9">
									 <input type="number" value={data.standard} onChange={e => setdata({ ...data, standard: e.target.value})} className="form-control" id="name" name="name" placeholder="Standard"/>
								 </div>
							 </div>

							 <div className="form-group row">
								<label for="text" className="col-md-3 col-form-label">
									Section
								</label>
								<div className="col-md-9">
									<input type="text" value={data.section} onChange={e => setdata({ ...data, section: e.target.value})} className="form-control" id="email" name="email" placeholder="Section"/>
								</div>
							</div>

							 
							 
                            <div className="form-group row">
								<label for="text" className="col-md-3 col-form-label">
									Subject
								</label>
								<div className="col-md-9">
									<input type="text" value={data.subject} onChange={e => setdata({ ...data, subject: e.target.value})} className="form-control" id="email" name="email" placeholder="Subject"/>
								</div>
							</div>

							
							 
							 <center><button class="btn btn-primary col-6">Create ClassRoom</button></center>
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

export default CreateClassroom
