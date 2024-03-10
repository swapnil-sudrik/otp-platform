import { useState } from 'react'
import './App.css'
import OTPInputes from './components/OTPInputes';

function App() {

  const [mobileNumber, setMobileNumber] = useState("");
  const [showOTPPage, setShowOTPPage] = useState(false);
  const [msg , setmsg] = useState(false);
  const [error  , setError] = useState(false);
  const [otp , setOtp] = useState("");

  const onMobileSubmit = (e) => {
    e.preventDefault();
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;
    if(mobileNumber.length <0){
      alert('Enter Your Mobile Number')
      return;
    }
    if (!regex.test(mobileNumber)) {
      alert('Mobile Number is Invalid')
      return;
    }

    setShowOTPPage(true)

    otpGenerator(4);
  }

  const onOtpSubmit = ()=>{
    console.log('Login Success');
    setError(false);
    setmsg(true);
  }

  const onError = ()=>{
    console.log("Otp Not Correct");
    setmsg(false);
    setError(true);
  }

  const otpGenerator = (length)=>{
    let otp="";
    for(let i=0 ; i<length; i++){
        otp +=Math.floor(Math.random() * 10);
      }
     setOtp(otp);
  }

  return (
    <>

      {!showOTPPage ?
        <div className='app'>
          <h1>Enter Your Phone Number</h1>
          <form onSubmit={onMobileSubmit}>
            <input
              type='tel'
              placeholder='Enter your phone Number'
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <br />
            <button type='submit'>Submit</button>
          </form>
        </div>
        :
        <div>
          <h1 style={{color:"white"}}>Enter OTP sent to {mobileNumber}</h1>
          <OTPInputes length={4} onOtpSubmit={onOtpSubmit} myOtp={otp} onError={onError}/>
          <p style={{color:"white"}}>Enter Your OPT To Login</p>
        </div>
      }

      {
        msg &&
        <h1 className='success'>
          Login Success
        </h1>
      }

      {
        error &&
        <h1 className='error'>
          OTP Not Valid.. Please Enter Valid OTP.!!
        </h1>
      }


      <div className="footer">
        &copy; 2024 Your Website
      </div>
    </>
  )
}

export default App
