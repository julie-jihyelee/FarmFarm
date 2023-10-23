import React from 'react'
import { ReactComponent as Commubtn1} from "../assets/images/commubtn1.svg";
import { ReactComponent as Commubtn2} from "../assets/images/commubtn2.svg";
import { ReactComponent as Commubtn3} from "../assets/images/commubtn3.svg";

const Communitybtn = () => {

    
  return (
    <div className='commubtnAll'>
         <Commubtn1 className='commubtn1'/>
         <Commubtn2 className='commubtn2'/>
         <Commubtn3 className='commubtn3'/>
    </div>
  )
}

export default Communitybtn