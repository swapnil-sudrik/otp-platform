import { useEffect, useRef, useState } from "react";

const OTPInputes = ({length , onOtpSubmit, myOtp , onError})=>{
    const [otp , setOTP] = useState(new Array(length).fill(""));

    const inputRefs = useRef([]); // use to focus on first input

    useEffect(()=>{
        if(inputRefs.current[0]){
            inputRefs.current[0].focus();
        }
    },[]);

    const handleChange = (index, e)=>{
            const value = e.target.value;
            if (isNaN(value)) return

            const newOtp =[...otp];
            //allow to take only one input
            newOtp[index] = value.substring(value.length - 1);
            setOTP(newOtp);

            //submit trigger
            const combinedOtp = newOtp.join("");
        if(combinedOtp ===myOtp && combinedOtp.length ===length){
         onOtpSubmit();
        }else if(combinedOtp.length ===length){
            onError();
        }


            //move to next input if current input if filled
            if (value && index < length - 1 && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].focus(); 
                console.log('ssss');
            }


    };
    const handleClick = (index)=>{

        //set selection rage only for one digit
        inputRefs.current[index].setSelectionRange(1,1);

    };
    //move focus to the previous input field on enter backspace
    const handleKeyDown = (index , e)=>{
        if(e.key === "Backspace" && !otp[index] && index>0 && inputRefs.current[index - 1]){
            inputRefs.current[index - 1].focus(); 
        }
    };

    return(
        <div>
            
            {
                otp.map((value , index)=>{
                   return <input 
                        key={index}
                        type="text"
                        ref={(input)=> (inputRefs.current[index] = input)}
                        value={value}
                        onChange={(e)=>handleChange(index , e)} //for change input value
                        onClick={()=>handleClick(index)}
                        onKeyDown={(e)=>handleKeyDown(index, e)} // if enter backspace tehn the pointer will go back to privious input
                        className="otp"
                    />
                })
            }
        </div>
     )
};

export default OTPInputes;