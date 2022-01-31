import React from "react";

export default ({ showModal, setShowModal }) => {
  return (
    <>
      {showModal ? (
        <div
          className="fixed inset-0 z-10 overflow-y-auto overscroll-contain"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-center w-full min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div
              onClick={() => setShowModal(!setShowModal)}
              className="fixed inset-0 transition-opacity bg-black bg-opacity-75"
              aria-hidden="true"
            ></div>

            <div className="w-2/5 px-8 py-8 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl ">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-lg font-bold text-neutral-800">
                  Send Request to Download
                </h1>
              </div>
              <p className="text-sm text-neutral-600 text-justify mb-8">
                You need to request an access to download this file. We need to
                review your reason and usage of this document. We will notify
                the request process through registered email.
              </p>
              <div className="mb-6">
                <textarea
                  className="w-full p-4 border-2 bg-neutral-50 rounded-lg text-neutral-600 text-sm"
                  placeholder="Please fill this form"
                ></textarea>
              </div>
              <div className="flex flex-col items-end">
                <div
                  onClick={() => setShowModal(!showModal)}
                  className="bg-neutral-800 border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
                >
                  <p className="font-bold text-neutral-50">Send Request</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
