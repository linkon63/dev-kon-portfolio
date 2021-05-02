import FacebookIcon from '@material-ui/icons/Facebook';
import { GitHub, Instagram, LinkedIn } from '@material-ui/icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import './Footer.css';
import emailjs from 'emailjs-com';
import { Link } from 'react-router-dom';
const Footer = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);  
        // e.preventDefault();

        emailjs.sendForm('service_rehpsgd', 'template_68rffcs', 'user_ggCoXFFBQMlLb4ywmm9wi')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
            
    }

    function sendEmail(e) {
        e.preventDefault();
    
        emailjs.sendForm('service_rehpsgd', 'template_68rffcs', e.target, 'user_ggCoXFFBQMlLb4ywmm9wi')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset();
          
      }

    return (
        <div>
            {/* <!-- Site footer --> */}
            <footer class="site-footer">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12 col-md-6">
                                <h6 className="text-white mb-3">CONTACT WITH ME</h6>

                                <form className="contact-form" onSubmit={sendEmail}>
                                <input type="hidden" name="contact_number" />
                                <input placeholder="Your Name" type="text" name="user_name" class="form-control p-3 mb-2" />
                                <input placeholder="Your Email" type="text" name="user_email" class="form-control p-3 mb-2" />
                                <textarea placeholder="Your Message" name="message" class="form-control p-3 mb-2" />
                                <input className="btn btn-warning" type="submit" value="Send" />
                                </form>

                                {/* <form onSubmit={handleSubmit(onSubmit)}>
                                    <input placeholder="Name" {...register("user_name",{ required: true })} class="form-control p-3 mb-2" />
                                    <input placeholder="Your Email" {...register("user_email",{ required: true })} class="form-control p-3 mb-2" />
                                    <textarea placeholder="Your Message" {...register("message",{ required: true })} class="form-control p-3 mb-2" />
                                    <input type="submit" className="btn btn-warning" />
                                </form> */}
                            </div>

                            <div class="col-xs-6 col-md-3">
                                <h6>Know for DEV</h6>
                                <ul class="footer-links">
                                    <li><a href="/">JavasScript</a></li>
                                    <li><a href="/">UI Design</a></li>
                                    <li><a href="/">React</a></li>
                                    <li><a href="/">Node JS</a></li>
                                    <li><a href="/">MongoDB</a></li>
                                    <li><a href="/">Express</a></li>
                                </ul>
                            </div>

                            <div class="col-xs-6 col-md-3">
                                <h6>Quick Links</h6>
                                <ul class="footer-links">
                                    <li><a href="/about">About Me</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                    <li><Link to="/blog">Blog</Link></li>
                                    <li><Link to='/resume'>Resume</Link></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    

                    <div class="container">
                        <div class="row">
                            <div class="col-md-8 col-sm-6 col-xs-12">
                                <p class="copyright-text pt-3">Copyright &copy; {new Date().getFullYear()} All Rights Reserved by -
                                    <a href="#">-Dev | KON</a>.
                                </p>
                            </div>

                            <div class="col-md-4 col-sm-6 col-xs-12">
                                <ul class="social-icons">
                                    <li><a href="https://www.linkedin.com/in/md-abdul-ahad-linkon-5988161b8/"><LinkedIn fontSize='large' style={{color:'blue'}}></LinkedIn></a></li>
                                    <li><a href="https://github.com/linkon63"><GitHub fontSize="large" color='disable'></GitHub></a></li>
                                    <li><a href="https://www.facebook.com/lin.kon.63/"><FacebookIcon color="primary" fontSize="large"></FacebookIcon></a></li>
                                    <li><a href="https://www.instagram.com/lin.kon.63/"><Instagram fontSize="large" style={{color:'red'}}></Instagram></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
        </div>
    );
};

export default Footer;