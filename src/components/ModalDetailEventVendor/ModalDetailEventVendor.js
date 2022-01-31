import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import EventRepositories from "../../config/data/Repositories/EventRepositories";

export default ({ showModal, setShowModal, event, getEvents }) => {
  const [showModalApprove, setShowModalApprove] = React.useState(false);
  const [showModalReject, setShowModalReject] = React.useState(false);
  const [showMainModal, setShowMainModal] = React.useState(true);
  const [proposedDate1, setProposedDate1] = React.useState(new Date());
  const [proposedDate2, setProposedDate2] = React.useState(new Date());
  const [proposedDate3, setProposedDate3] = React.useState(new Date());
  const [note, setNote] = React.useState("");

  React.useEffect(() => {
    if (event) {
      setProposedDate1(new Date(JSON.parse(event.proposed_date_1)));
      setProposedDate2(new Date(JSON.parse(event.proposed_date_2)));
      setProposedDate3(new Date(JSON.parse(event.proposed_date_3)));
    }
  }, [event]);

  const handleChangeNote = (e) => {
    setNote(e.target.value);
  };

  const reject = async () => {
    let submittedData = {
      id: event._id,
      status: "rejected",
      note: note,
    };

    const res = await EventRepositories.updateEvent(submittedData);
    setShowModalReject(false);
    setShowMainModal(true);
    setShowModal(false);
    await getEvents();
  };

  const approve = async (date) => {
    let submittedData = {
      id: event._id,
      status: "accepted",
      confirm_date: JSON.stringify(date),
    };

    const res = await EventRepositories.updateEvent(submittedData);
    setShowModalApprove(false);
    setShowMainModal(true);
    setShowModal(false);
    await getEvents();
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
              onClick={() => {
                setShowModalApprove(false);
                setShowModalReject(false);
                setShowMainModal(true);
                setShowModal(!setShowModal);
              }}
              className="fixed inset-0 transition-opacity bg-black bg-opacity-75"
              aria-hidden="true"
            ></div>

            {showMainModal ? (
              <>
                <div className="w-2/5 px-8 py-8 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl ">
                  <div className="flex justify-between items-center mb-2">
                    <h1 className="text-lg font-bold text-neutral-800">
                      Event Detail
                    </h1>
                  </div>
                  <p className="text-sm text-neutral-600 text-justify mb-8">
                    You need to request an access to download this file. We need
                    to review your reason and usage of this document. We will
                    notify the request process through registered email.
                  </p>
                  <div className="mb-6">
                    <textarea
                      className="w-full p-4 border-2 bg-neutral-50 rounded-lg text-neutral-600 text-sm"
                      placeholder="Please fill this form"
                    ></textarea>
                  </div>
                  <div className="flex space-x-4 items-end">
                    <div
                      onClick={() => {
                        setShowMainModal(!showMainModal);
                        setShowModalApprove(!showModalReject);
                      }}
                      className="bg-green-800 border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
                    >
                      <p className="font-bold text-neutral-50">Approve</p>
                    </div>

                    <div
                      onClick={() => {
                        setShowMainModal(!showMainModal);
                        setShowModalReject(!showModalReject);
                      }}
                      className="bg-red-800 border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
                    >
                      <p className="font-bold text-neutral-50">Reject</p>
                    </div>
                  </div>
                </div>
              </>
            ) : null}

            {showModalApprove ? (
              <>
                <div className="w-2/5 px-8 py-8 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl ">
                  <div className="flex justify-between items-center mb-2">
                    <h1 className="text-lg font-bold text-neutral-800">
                      Approve Event
                    </h1>
                  </div>
                  <p className="text-sm text-neutral-600 text-justify mb-8">
                    Choose one of the proposed dates below
                  </p>
                  <div className="mb-6">
                    <div className="mb-4">
                      <p className="mb-2">Proposed Date 1</p>
                      <div className="flex justify-between">
                        <div className="w-3/5 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4">
                          <DatePicker
                            selected={proposedDate1}
                            onChange={(date) => setProposedDate1(date)}
                          />
                        </div>
                        <div
                          onClick={() => approve(proposedDate1)}
                          className="bg-green-800 flex justify-center items-center border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
                        >
                          <p className="font-bold text-neutral-50">Approve</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="mb-2">Proposed Date 2</p>
                      <div className="flex justify-between">
                        <div className="w-3/5 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4">
                          <DatePicker
                            selected={proposedDate2}
                            onChange={(date) => setProposedDate2(date)}
                          />
                        </div>
                        <div
                          onClick={() => approve(proposedDate2)}
                          className="bg-green-800 flex justify-center items-center border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
                        >
                          <p className="font-bold text-neutral-50">Approve</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="mb-2">Proposed Date 3</p>
                      <div className="flex justify-between">
                        <div className="w-3/5 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4">
                          <DatePicker
                            selected={proposedDate3}
                            onChange={(date) => setProposedDate3(date)}
                          />
                        </div>
                        <div
                          onClick={() => approve(proposedDate3)}
                          className="bg-green-800 flex justify-center items-center border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
                        >
                          <p className="font-bold text-neutral-50">Approve</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      onClick={() => {
                        setShowMainModal(!showMainModal);
                        setShowModalApprove(!showModalApprove);
                      }}
                      className="bg-blue-800 border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
                    >
                      <p className="font-bold text-neutral-50">Cancel</p>
                    </div>
                  </div>
                </div>
              </>
            ) : null}

            {showModalReject ? (
              <>
                <div className="w-2/5 px-8 py-8 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl ">
                  <div className="flex justify-between items-center mb-2">
                    <h1 className="text-lg font-bold text-neutral-800">
                      Reject Event
                    </h1>
                  </div>
                  <p className="text-sm text-neutral-600 text-justify mb-8">
                    Fill the form below the reason why the event being rejected
                  </p>
                  <div className="mb-6">
                    <textarea
                      className="w-full p-4 border-2 bg-neutral-50 rounded-lg text-neutral-600 text-sm"
                      placeholder="Please fill this form"
                      value={note}
                      onChange={handleChangeNote}
                    ></textarea>
                  </div>
                  <div className="flex space-x-4">
                    <div
                      onClick={() => reject()}
                      className="bg-red-800 border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
                    >
                      <p className="font-bold text-neutral-50">Reject</p>
                    </div>
                    <div
                      onClick={() => {
                        setShowMainModal(!showMainModal);
                        setShowModalReject(!showModalReject);
                      }}
                      className="bg-blue-800 border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
                    >
                      <p className="font-bold text-neutral-50">Cancel</p>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};
