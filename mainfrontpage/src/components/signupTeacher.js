import React from 'react'


const signupTeacher = () => {
    return (
        <div className="mt-3 mb-3">
            <div className="col-12 col-md-6 offset-sm-3 container">
		<div className="card">
			<center><h3 ClassName="card-header bg-primary text-white p-3">Sign-up Form</h3></center>
			<div className="card-body">
				<div className="row row-content">
					 <div className="col-12">
						 <form>
							 <div className="form-group row">
								 <label for="email" className="col-md-3 col-form-lable">
									 Email
								 </label>
								 <div className="col-md-9">
									 <input type="email" className="form-control" id="Location" name="Location" placeholder="Email"/>
								 </div>
		 
							 </div>
                             <div className="form-group row">
								 <label for="companyName" className="col-md-3 col-form-label">
									 Name
								 </label>
								 <div className="col-md-9">
									 <input type="text" className="form-control" id="companyName" name="companyName" placeholder="Name"/>
								 </div>
							 </div>

							 <div className="form-group row">
								 <label for="name" className=" col-12 col-md-3 col-form-label">
									 Phone Number
								 </label>
								 <div className="col-md-9">
									 <input type="number" className="form-control" id="name" name="name" placeholder="Phone Number"/>
								 </div>
							 </div>

                             <div className="form-group row">
								 <label for="email" className="col-md-3 col-form-lable">
									 Institution Email
								 </label>
								 <div className="col-md-9">
									 <input type="email" className="form-control" id="Location" name="Location" placeholder="Institution Email"/>
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
    )
}

export default signupTeacher
