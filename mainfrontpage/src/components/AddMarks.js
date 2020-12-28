import React,{useState} from 'react';
import axios from 'axios';

function AddMarks() {

    const [data, setdata] = useState({
       assignment_id:'',
       student_id:'',
       marksobtain:'',
       totalmarks:''
        })
        
        const submitHandler = (e) => {
            e.preventDefault()
            axios.post('http://learnzilla.herokuapp.com/classroom/addmarks/', data)
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
								 <label for="name" className=" col-12 col-md-3 col-form-label">
									 assignment_id
								 </label>
								 <div className="col-md-9">
									 <input type="number" value={data.assignment_id} onChange={e => setdata({ ...data, assignment_id: e.target.value})} className="form-control" id="name" name="name" placeholder="ClassRoom Id (001)"/>
								 </div>
							 </div>
                             <div className="form-group row">
								 <label for="name" className=" col-12 col-md-3 col-form-label">
									 student_id
								 </label>
								 <div className="col-md-9">
									 <input type="number" value={data.student_id} onChange={e => setdata({ ...data, student_id: e.target.value})} className="form-control" id="name" name="name" placeholder="assignment_id (001)"/>
								 </div>
							 </div>
                             <div className="form-group row">
								 <label for="name" className=" col-12 col-md-3 col-form-label">
									 marksobtain
								 </label>
								 <div className="col-md-9">
									 <input type="number" value={data.marksobtain} onChange={e => setdata({ ...data, marksobtain: e.target.value})} className="form-control" id="name" name="name" placeholder="marksobtain"/>
								 </div>
							 </div>
							 <div className="form-group row">
								 <label for="name" className=" col-12 col-md-3 col-form-label">
									 totalmarks
								 </label>
								 <div className="col-md-9">
									 <input type="number" value={data.totalmarks} onChange={e => setdata({ ...data, totalmarks: e.target.value})} className="form-control" id="name" name="name" placeholder="ClassRoom Id (001)"/>
								 </div>
							 </div>
							 
							 <center><button class="btn btn-primary col-6">Add Marks</button></center>
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

export default AddMarks
