const Modal = ({ children, closeModal }) => {
  return (
    <>
      <div className="fixed inset-0 w-full h-full z-50 flex justify-center items-center
                      bg-gray-700 bg-opacity-80">
        <div className="w-4/5 h-4/5 flex justify-center items-center flex-col bg-white relative rounded-2xl">
          <div className="text-3xl absolute top-2 right-4 cursor-pointer" onClick={() => closeModal()}>×</div>

          {children}
        </div>
      </div>
    </>
  )
}

export default Modal;
