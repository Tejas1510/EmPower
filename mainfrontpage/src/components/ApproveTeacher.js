import React,{useState} from 'react';
import axios from 'axios';

function ApproveTeacher() {

	const [data, setdata] = useState({
        teacher_email:""
        })
   
	
	const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://learnzilla.herokuapp.com/institution/approve-teacher/',data)
        .then(response => {
            console.log(response.data)
            
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
			<center><h3 ClassName="card-header bg-primary text-white p-3">Enter email of teacher you want to approve</h3></center>
			<div className="card-body">
				<div className="row row-content">
					 <div className="col-12">
						 <form  onSubmit={submitHandler}>
							 <div className="form-group row">
								 <label for="email" className="col-md-3 col-form-lable">
									 Email
								 </label>
								 <div className="col-md-9">
									 <input type="email"  value={data.teacher_email} onChange={e => setdata({ ...data, teacher_email: e.target.value})} className="form-control" id="Location" name="Location" placeholder="Email"/>
								 </div>
		 
							 </div>
							 
							
							 <center><button class="btn btn-primary col-6" type="submit">Approve Teacher</button></center>
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

export default ApproveTeacher

