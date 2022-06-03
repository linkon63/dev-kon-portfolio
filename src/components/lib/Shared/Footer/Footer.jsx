import React from 'react';
import TableSvg from '../../SVG/TableSvg';
import './Footer.scss'
const Footer = () => {
    return (
        <div>
            <footer id="footer-2-cols" class="site-footer">
                <div id="footer-container">

                    <div id="footer-grid">
                        <div id="left-footer-section" class="footer-section">
                            <div id="footer-search">

                                <form action="">
                                    <input type="search" placeholder="Web design" />
                                    <button type="submit">Search</button>
                                </form>
                            </div>
                            <div class="footer-information">
                                <p><img src="https://img.icons8.com/ios-filled/12/999999/marker.png" />30/20, Verkhy street, Moscow, Russia</p>
                                <p><img src="https://img.icons8.com/ios-filled/12/999999/phone.png" />7 (800) 555–35–35</p>
                                <p><img src="https://img.icons8.com/ios-filled/12/999999/mail.png" />noreply@reply.io</p>
                                <p><img src="https://img.icons8.com/ios-filled/12/999999/clock.png" />8:00 AM – 8:00 PM</p>
                            </div>
                        </div>
                        <div id="right-footer-section" class="footer-section">
                            <div class="footer-links">
                                <ul>
                                    <li role="menuitem"><a href="#">Home</a></li>
                                    <li role="menuitem"><a href="#">About</a></li>
                                    <li role="menuitem"><a href="#">Contact Information</a></li>
                                    <li role="menuitem"><a href="#">Terms of Use Legal Information</a></li>
                                    <li role="menuitem"><a href="#">Message Us</a></li>
                                    <li role="menuitem"><a href="#">Leave a Feedback</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div id="copyright-information">
                        <TableSvg />
                        <div id="footer-logo-section ">
                            <div id="footer-logo">
                                <img src="https://raw.githubusercontent.com/taviskaron/2-3-4-column-footers/main/img/logo.png" alt="" />
                            </div>
                        </div>
                        <div id="copyright-text">
                            &copy; Reimu Inc. 2022. All rights reserved.
                        </div>
                        <div id="social-buttons">
                            <img src="https://img.icons8.com/ios-filled/25/999999/facebook--v1.png" /><img src="https://img.icons8.com/ios-filled/25/999999/telegram-app.png" /><img src="https://img.icons8.com/ios-filled/25/999999/pinterest--v1.png" /><img src="https://img.icons8.com/ios-filled/25/999999/instagram--v1.png" />
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default Footer;