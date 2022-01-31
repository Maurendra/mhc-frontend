import React from "react";

export default ({ showModal, setShowModal, event }) => {
  const formatDate = (dateData) => {
    let date = new Date(JSON.parse(dateData));
    return date.toLocaleDateString("en-US");
  };
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
                  Event Detail
                </h1>
              </div>
              <div className="mb-8">
                <p className="text-sm text-neutral-600 text-justify mb-2">
                  Event Name: {event.event_name}
                </p>
                <p className="text-sm text-neutral-600 text-justify mb-2">
                  Vendor Name: {event.vendor_name}
                </p>
                <p className="text-sm text-neutral-600 text-justify mb-2">
                  Proposed Date: {formatDate(event.proposed_date_1)},{" "}
                  {formatDate(event.proposed_date_2)},{" "}
                  {formatDate(event.proposed_date_3)}
                </p>
                <p className="text-sm text-neutral-600 text-justify mb-2">
                  Confirmed date by vendor:
                  {event.confirm_date
                    ? formatDate(event.confirm_date)
                    : "Not confirmed yet by the vendor"}
                </p>
                <p className="text-sm text-neutral-600 text-justify mb-2">
                  Current Status: {event.status}
                </p>
                <p className="text-sm text-neutral-600 text-justify mb-2">
                  Location: {event.location ? event.location : "-"}
                </p>
                <p className="text-sm text-neutral-600 text-justify mb-2">
                  Note: {event.note ? event.note : "-"}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <div
                  onClick={() => setShowModal(!showModal)}
                  className="bg-neutral-800 border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
                >
                  <p className="font-bold text-neutral-50">Close</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
