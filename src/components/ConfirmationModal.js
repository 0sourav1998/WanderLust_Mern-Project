import React from 'react'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 flex flex-col items-center justify-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-[350px] bg-slate-800 p-6 rounded-md gap-4">
        <div className='flex flex-col'>
            <p className='text-white text-xl mb-3'>{modalData?.text1}</p>
            <p className='text-white text-xl mb-4'>{modalData?.text2}</p>
        </div>
        <div className='flex'>
            <button onClick={modalData?.btn1Handler} className='bg-slate-600 p-2 text-white rounded-md mr-8'>{modalData?.btn1Text}</button>
            <button onClick={modalData?.btn2Handler} className="bg-yellow-500 p-2 text-black rounded-md">{modalData?.btn2Text}</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
