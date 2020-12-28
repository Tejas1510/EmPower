import React from 'react'


const loginTeacher = () => {
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
								<label for="companyType" className="col-md-3 col-form-lable">
									Password
								</label>
								<div className="col-md-9">
									<input type="email" className="form-control" id="companyType" name="companyType" placeholder="Password"/>
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
    )
}

export default loginTeacher
