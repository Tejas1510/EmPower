import React,{useState} from 'react';
import Myimage from './assets/Myimage.png';
import rishabh from './assets/rishabh.png';
import shreyas from './assets/shreyas.png';
import aditya from './assets/aditya.png';
import SimpleModal from './components/SimpleModal';
import { makeStyles } from '@material-ui/core/styles';
import getModalStyle from './components/getModalStyle';
import { Button,Modal} from 'react-bootstrap';
import axios from 'axios';

import './App.css';
 function App() {

  
      
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
    <div className="container">
      <a className="navbar-brand js-scroll-trigger" href="#page-top">LEARNZILLA</a>
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        Menu
        <i className="fa fa-bars ml-2"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav text-uppercase ml-auto">
          <li className="nav-item">
            <a className="nav-link " href="#services">Services</a>
          </li>
  
          <li className="nav-item">
            <a className="nav-link " href="#team">Team</a>
          </li>
          <li className="nav-item">
            <a className="nav-link " href="#contact">Contact</a>
          </li>
          <li className="nav-item">
        
          <>
      <Button variant="primary" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Login Option</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Button variant="warning" href="https://learnzilla-teacher.netlify.app" target="_blank">Teacher</Button>{' '}
        <Button href="https://learnzilla-student.netlify.app" variant="warning" target="_blank">Student</Button>{' '}
    
        </Modal.Body>
      </Modal>
    </>
            
          </li>
        </ul>
      </div>
    </div>
  </nav>

  
  
    



  <header className="masthead">
    <div className="container">
      <div className="intro-text">
        <div className="intro-lead-in">Welcome To LEARNZILLA</div>
        <div className="intro-heading text-uppercase">It's Nice To Meet You</div>
        <div className="btn-group">
        <a className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="#services">Tell Me More</a>
        <a className="btn btn-primary btn-xl text-uppercase js-scroll-trigger ml-4" href="https://www.youtube.com/" target="_blank">View Demo</a>
        </div>
      </div>
    </div>
  </header>
     

  <section className="page-section" id="services">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="section-heading text-uppercase">Services</h2>
          <h3 className="section-subheading text-muted">We at LEARNZILLA are a robust team of highly talented individuals working in synchronization to achieve our prime goal :  <span className="tagline">Quality and hassel free E-Learning</span></h3>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fa fa-circle fa-stack-2x text-primary"></i>
            <i className="fa fa-university fa-stack-1x fa-inverse"></i>
          </span>
          <h4 className="service-heading">Quality Education Platform</h4>
          <p className="text-muted">We believe in providing Quality and efficient methodology of teaching with ease and user friendly behaviour. </p>
        </div>
        <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fa fa-circle fa-stack-2x text-primary"></i>
            <i className="fa fa-laptop fa-stack-1x fa-inverse"></i>
          </span>
          <h4 className="service-heading">Responsive Design</h4>
          <p className="text-muted">Our website design is fully responsive and uses mobile first approach and renders on all sort of devices.</p>
        </div>
        <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fa fa-circle fa-stack-2x text-primary"></i>
            <i className="fa fa-lock fa-stack-1x fa-inverse"></i>
          </span>
          <h4 className="service-heading">Web Security</h4>
          <p className="text-muted">Security is the key and we all your data is safe with us.</p>
        </div>
      </div>
    </div>
  </section>

  
  

  
  
  
  <section className="bg-light page-section" id="team">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="section-heading text-uppercase">Our Amazing Team</h2>
          <h3 className="section-subheading text-muted">The Visionaries</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3">
          <div className="team-member">
            <img className="mx-auto rounded-circle" src={Myimage} alt=""/>
            <h4>Tejas Tapas</h4>
            <p className="text-muted">Front End Devloper</p>
            <ul className="list-inline social-buttons">
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-facebook-f"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="team-member">
            <img className="mx-auto rounded-circle" src={rishabh} alt=""/>
            <h4>Rishabh Rathi</h4>
            <p className="text-muted">Back End Devloper</p>
            <ul className="list-inline social-buttons">
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-facebook-f"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="team-member">
            <img className="mx-auto rounded-circle" src={shreyas} alt=""/>
            <h4>Shreyas Barve</h4>
            <p className="text-muted">Front End Devloper</p>
            <ul className="list-inline social-buttons">
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-facebook-f"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="team-member">
            <img className="mx-auto rounded-circle" src={aditya} alt=""/>
            <h4>Aditya Morankar</h4>
            <p className="text-muted">Backend End Devloper</p>
            <ul className="list-inline social-buttons">
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-facebook-f"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>
      
      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <p className="large text-muted">A highly motivated team with an ambition to provide quality education to all parts of country following the motto education for all.</p>
        </div>
      </div>
    </div>
  </section>

  
  <section className="py-5">
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-sm-6">
          <a href="#something">
            <img className="img-fluid d-block mx-auto" src="img/logos/envato.jpg" alt=""/>
          </a>
        </div>
        <div className="col-md-3 col-sm-6">
          <a href="#something">
            <img className="img-fluid d-block mx-auto" src="img/logos/designmodo.jpg" alt=""/>
          </a>
        </div>
        <div className="col-md-3 col-sm-6">
          <a href="#something">
            <img className="img-fluid d-block mx-auto" src="img/logos/themeforest.jpg" alt=""/>
          </a>
        </div>
        <div className="col-md-3 col-sm-6">
          <a href="#something">
            <img className="img-fluid d-block mx-auto" src="img/logos/creative-market.jpg" alt=""/>
          </a>
        </div>
      </div>
    </div>
  </section>

  
  <section className="page-section" id="contact">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="section-heading text-uppercase">Contact Us</h2>
          <h3 className="section-subheading text-muted">We will always be happy to serve you</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <form id="contactForm" name="sentMessage" novalidate="novalidate">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input className="form-control" id="name" type="text" placeholder="Your Name *" required="required" data-validation-required-message="Please enter your name."/>
                  <p className="help-block text-danger"></p>
                </div>
                <div className="form-group">
                  <input className="form-control" id="email" type="email" placeholder="Your Email *" required="required" data-validation-required-message="Please enter your email address."/>
                  <p className="help-block text-danger"></p>
                </div>
                <div className="form-group">
                  <input className="form-control" id="phone" type="tel" placeholder="Your Phone *" required="required" data-validation-required-message="Please enter your phone number."/>
                  <p className="help-block text-danger"></p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <textarea className="form-control" id="message" placeholder="Your Message *" required="required" data-validation-required-message="Please enter a message."></textarea>
                  <p className="help-block text-danger"></p>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="col-lg-12 text-center">
                <div id="success"></div>
                {/* <button id="sendMessageButton"  className="btn btn-primary btn-xl text-uppercase" type="submit"><a Send Message</button> */}
                <a className="btn btn-primary btn-xl text-uppercase js-scroll-trigger ml-4" href="https://mail.google.com/mail/u/2/#inbox" target="_blank">Send Message</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  
    </div>
  );
}

export default App;

