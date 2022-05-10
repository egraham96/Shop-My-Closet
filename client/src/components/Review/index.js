import React from "react";
import Auth from "../../utils/auth";
//import love from '../../../public/images/heart.jpg';
//import bad from '../../../public/images/Bad.jpg';
import './style.css';

function Review() {
    if (Auth.loggedIn()) {
      return (
        <div id="reviewbox">
          <h2>What did you think of this donut?</h2>
          <button>
            <img src={`https://www.google.com/search?q=heart+emoji&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj-tobK4MD0AhUbHzQIHR6SBs8Q_AUoAXoECAEQAw&biw=1280&bih=577&dpr=1.5#imgrc=XqRyKi-sJZwnvM`} alt="heart emoji" onClick={() => {ReviewForm("love")}}
          />
          </button>
          <button>
            <img src={"https://www.google.com/search?q=thumbs+down+emoji&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj2mvbf4MD0AhU1On0KHXVNCUoQ_AUoAXoECAEQAw&biw=1280&bih=577&dpr=1.5#imgrc=0DvBqaDpl3UnDM"} alt="thumbs down emoji" onClick={() => {ReviewForm("bad")}} />
            </button></div>
      );
    }
  //Need to add "Else" option here telling User to login


function ReviewForm(reaction) {

  const handleSubmit = event => {
      event.preventDefault();
      alert('You have submitted your review.')
    }
  //POST Request Here?! Add a Model for User Reviews associated with user, product ID associated with Review? But do not redirect page?
  
   const message = reaction=== "love" ? "Yay! Please tell us what you liked about it": "Oh no. Please explain what we can do better"
   return (<div className="wrapper">
   <h1>{message}</h1>
   <form onSubmit={handleSubmit}>
     <fieldset>
       <label>
         <p>Name</p>
         <input name="UserReview" />
       </label>
     </fieldset>
     <button type="submit">Submit</button>
   </form>
  </div>
  )
  }}
  
  export default Review;
