import React, { useEffect } from 'react'
import PubSub from 'pubsub-js';
import { useState } from 'react';


function App() {
  const [active, setActive] = useState(true) // set to true in isolation mode
  useEffect(() => {
    const token = PubSub.subscribe('fulfillmentBus', (msg, {activePayment}) => {
      console.log(activePayment);
      setActive(activePayment)
    });

    // Cleanup subscription on unmount
    return () => {
      PubSub.unsubscribe(token);
    };
  }, [active])
  return (
    <div className='bg-white p-3'>
      <h1 className='text-3xl pb-2'>Payment Method</h1>
      {active && <div className='border-t-1 border-gray-300 py-3'>
        <label className='w-full'>Select payment method</label>
      <br/>
        <div className='mt-4'>
          <input type='radio' name='payment' /> <label className='ml-2'>Apple Pay</label><br />
          <input type='radio' name='payment' /> <label className='ml-2'>Google Pay</label><br />
          <input type='radio' name='payment' /> <label className='ml-2'>Sherwin Account</label>
      </div>
      <br/>
      {/* <button className='bg-black rounded-sm text-white p-3 border-0' onClick={handelUpdateMessage}>Save and Continue</button> */}
      </div>}
    </div>
  )
}

export default App