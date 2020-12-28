import React,{useState} from 'react';
import axios from 'axios';

function MarkAttendance() {

    const [data, setdata] = useState({
       student_id:'',
       classroom_id:'',
       attendance:''
         })
         
         const submitHandler = (e) => {
             e.preventDefault()
             axios.post('http://learnzilla1.herokuapp.com/classroom/markattendance/', data)
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
									 student_id
								 </label>
								 <div className="col-md-9">
									 <input type="number" value={data.student_id} onChange={e => setdata({ ...data, student_id: e.target.value})} className="form-control" id="name" name="name" placeholder="ClassRoom Id (001)"/>
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
									 attendance
								 </label>
								 <div className="col-md-9">
									 <input type="text" value={data.attendance} onChange={e => setdata({ ...data, attendance: e.target.value})} className="form-control" id="companyName" name="companyName" placeholder="Attendance"/>
								 </div>
							 </div>
							 
							 <center><button class="btn btn-primary col-6">Mark attendance</button></center>
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

export default MarkAttendance
