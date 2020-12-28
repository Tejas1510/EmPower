import React,{useState} from 'react';
import axios from 'axios';

function CreateAssignmrnt() {

    const [data, setdata] = useState({
       teacher_email:'',
       classroom_id:'',
       assign_url:''
         })
         
         const submitHandler = (e) => {
             e.preventDefault()
			 axios.post('http://learnzilla.herokuapp.com/classroom/create-new-assign/', data)
			 
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
			<center><h3 ClassName="card-header bg-primary text-white p-3">Create Assignment</h3></center>
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
									 classroom_id
								 </label>
								 <div className="col-md-9">
									 <input type="number" value={data.classroom_id} onChange={e => setdata({ ...data, classroom_id: e.target.value})} className="form-control" id="name" name="name" placeholder="ClassRoom Id (001)"/>
								 </div>
							 </div>

                             <div className="form-group row">
								 <label for="companyName" className="col-md-3 col-form-label">
									 assign_url
								 </label>
								 <div className="col-md-9">
									 <input type="text" value={data.assign_url} onChange={e => setdata({ ...data, assign_url: e.target.value})} className="form-control" id="companyName" name="companyName" placeholder="assign_url"/>
								 </div>
							 </div>
							 
							 <center><button class="btn btn-primary col-6">Create Assignment</button></center>
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

export default CreateAssignmrnt
