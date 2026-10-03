import React, { useState } from 'react';
import Post from '../components/post';

const Home = () => {
  const [activeAccordion, setActiveAccordion] = useState('');
  const [showAlert, setShowAlert] = useState(true);

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? '' : id);
  };

  return (
    <div className="w3-container w3-content" style={{ maxWidth: '1400px', marginTop: '80px' }}>
      <div className="w3-row">
        {/* Left Column */}
        <div className="w3-col m3">
          {/* Profile */}
          <div className="w3-card w3-round w3-white">
            <div className="w3-container">
             <h4 className="w3-center">My Profile</h4>
             <p className="w3-center"><img src="https://www.w3schools.com/w3images/avatar3.png" className="w3-circle" style={{height:'106px', width:'106px'}} alt="Avatar" /></p>
             <hr />
             <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i> Designer, UI</p>
             <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> London, UK</p>
             <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> April 1, 1988</p>
            </div>
          </div>
          <br />
          
          {/* Accordion */}
          <div className="w3-card w3-round">
            <div className="w3-white">
              <button onClick={() => toggleAccordion('Demo1')} className={`w3-button w3-block w3-left-align ${activeAccordion === 'Demo1' ? 'w3-theme-d1' : 'w3-theme-l1'}`}><i className="fa fa-circle-o-notch fa-fw w3-margin-right"></i> My Groups</button>
              <div id="Demo1" className={`w3-container ${activeAccordion === 'Demo1' ? 'w3-show' : 'w3-hide'}`}>
                <p>Some text..</p>
              </div>
              <button onClick={() => toggleAccordion('Demo2')} className={`w3-button w3-block w3-left-align ${activeAccordion === 'Demo2' ? 'w3-theme-d1' : 'w3-theme-l1'}`}><i className="fa fa-calendar-check-o fa-fw w3-margin-right"></i> My Events</button>
              <div id="Demo2" className={`w3-container ${activeAccordion === 'Demo2' ? 'w3-show' : 'w3-hide'}`}>
                <p>Some other text..</p>
              </div>
              <button onClick={() => toggleAccordion('Demo3')} className={`w3-button w3-block w3-left-align ${activeAccordion === 'Demo3' ? 'w3-theme-d1' : 'w3-theme-l1'}`}><i className="fa fa-users fa-fw w3-margin-right"></i> My Photos</button>
              <div id="Demo3" className={`w3-container ${activeAccordion === 'Demo3' ? 'w3-show' : 'w3-hide'}`}>
                <div className="w3-row-padding">
                  <br />
                  <div className="w3-half"><img src="https://www.w3schools.com/w3images/lights.jpg" style={{width:'100%'}} className="w3-margin-bottom" alt="Lights"/></div>
                  <div className="w3-half"><img src="https://www.w3schools.com/w3images/nature.jpg" style={{width:'100%'}} className="w3-margin-bottom" alt="Nature"/></div>
                  <div className="w3-half"><img src="https://www.w3schools.com/w3images/mountains.jpg" style={{width:'100%'}} className="w3-margin-bottom" alt="Mountains"/></div>
                  <div className="w3-half"><img src="https://www.w3schools.com/w3images/forest.jpg" style={{width:'100%'}} className="w3-margin-bottom" alt="Forest"/></div>
                  <div className="w3-half"><img src="https://www.w3schools.com/w3images/nature.jpg" style={{width:'100%'}} className="w3-margin-bottom" alt="Nature"/></div>
                  <div className="w3-half"><img src="https://www.w3schools.com/w3images/snow.jpg" style={{width:'100%'}} className="w3-margin-bottom" alt="Snow"/></div>
                </div>
              </div>
            </div>      
          </div>
          <br />
          
          {/* Interests */} 
          <div className="w3-card w3-round w3-white w3-hide-small">
            <div className="w3-container">
              <p>Interests</p>
              <p>
                <span className="w3-tag w3-small w3-theme-d5">News</span>
                <span className="w3-tag w3-small w3-theme-d4">W3Schools</span>
                <span className="w3-tag w3-small w3-theme-d3">Labels</span>
                <span className="w3-tag w3-small w3-theme-d2">Games</span>
                <span className="w3-tag w3-small w3-theme-d1">Friends</span>
                <span className="w3-tag w3-small w3-theme">Games</span>
                <span className="w3-tag w3-small w3-theme-l1">Friends</span>
                <span className="w3-tag w3-small w3-theme-l2">Food</span>
                <span className="w3-tag w3-small w3-theme-l3">Design</span>
                <span className="w3-tag w3-small w3-theme-l4">Art</span>
                <span className="w3-tag w3-small w3-theme-l5">Photos</span>
              </p>
            </div>
          </div>
          <br />
          
          {/* Alert Box */}
          {showAlert && (
            <div className="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
              <span onClick={() => setShowAlert(false)} className="w3-button w3-theme-l3 w3-display-topright">
                <i className="fa fa-remove"></i>
              </span>
              <p><strong>Hey!</strong></p>
              <p>People are looking at your profile. Find out who.</p>
            </div>
          )}
        </div>
        
        {/* Middle Column */}
        <div className="w3-col m7">
          <div className="w3-row-padding">
            <div className="w3-col m12">
              <div className="w3-card w3-round w3-white">
                <div className="w3-container w3-padding">
                  <h6 className="w3-opacity">Social Media template by w3.css</h6>
                  <p contentEditable="true" className="w3-border w3-padding" suppressContentEditableWarning={true}>Status: Feeling Blue</p>
                  <button type="button" className="w3-button w3-theme"><i className="fa fa-pencil"></i>  Post</button> 
                </div>
              </div>
            </div>
          </div>
          
          {/* Use the React Post component instead of the static HTML */}
          <div className="w3-container w3-margin w3-white w3-card w3-round">
            <Post />
          </div>

        </div>
        
        {/* Right Column */}
        <div className="w3-col m2">
          <div className="w3-card w3-round w3-white w3-center">
            <div className="w3-container">
              <p>Upcoming Events:</p>
              <img src="https://www.w3schools.com/w3images/forest.jpg" alt="Forest" style={{width:'100%'}} />
              <p><strong>Holiday</strong></p>
              <p>Friday 15:00</p>
              <p><button className="w3-button w3-block w3-theme-l4">Info</button></p>
            </div>
          </div>
          <br />
          
          <div className="w3-card w3-round w3-white w3-center">
            <div className="w3-container">
              <p>Friend Request</p>
              <img src="https://www.w3schools.com/w3images/avatar6.png" alt="Avatar" style={{width:'50%'}} /><br />
              <span>Jane Doe</span>
              <div className="w3-row w3-opacity">
                <div className="w3-half">
                  <button className="w3-button w3-block w3-green w3-section" title="Accept"><i className="fa fa-check"></i></button>
                </div>
                <div className="w3-half">
                  <button className="w3-button w3-block w3-red w3-section" title="Decline"><i className="fa fa-remove"></i></button>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="w3-card w3-round w3-white w3-padding-16 w3-center">
            <p>ADS</p>
          </div>
          <br />
          <div className="w3-card w3-round w3-white w3-padding-32 w3-center">
            <p><i className="fa fa-bug w3-xxlarge"></i></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
