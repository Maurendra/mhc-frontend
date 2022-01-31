import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import AuthContext from "../../AuthContext";
import EventRepositories from "../../config/data/Repositories/EventRepositories";
import UserRepositories from "../../config/data/Repositories/UserRepositories";

export default ({ showModal, setShowModal, getEvents }) => {
  const [proposedDate1, setProposedDate1] = React.useState(new Date());
  const [proposedDate2, setProposedDate2] = React.useState(new Date());
  const [proposedDate3, setProposedDate3] = React.useState(new Date());
  const [location, setLocation] = React.useState("");
  const [eventName, setEventName] = React.useState("");
  const [vendors, setVendors] = React.useState([]);
  const [vendor, setVendor] = React.useState(null);
  const { auth } = React.useContext(AuthContext);

  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleChangeEventName = (event) => {
    setEventName(event.target.value);
  };

  const handleChangeVendor = (e) => {
    setVendor(JSON.parse(e.target.value));
  };

  const getVendor = async () => {
    const res = await UserRepositories.fetchVendor();
    if (res.data) {
      if (res.data.length > 0) {
        setVendors(res.data);
        setVendor(res.data[0]);
      }
    }
  };

  const submitData = async () => {
    let submittedData = {
      company_id: auth.id,
      vendor_id: vendor._id,
      vendor_name: vendor.name,
      event_name: eventName,
      proposed_date_1: JSON.stringify(proposedDate1),
      proposed_date_2: JSON.stringify(proposedDate2),
      proposed_date_3: JSON.stringify(proposedDate3),
      confirm_date: null,
      status: "active",
      created_at: JSON.stringify(new Date()),
      location: location,
    };
    const res = await EventRepositories.createEvent(submittedData);
    setShowModal(!showModal);
    await getEvents();
  };

  React.useEffect(async () => {
    await getVendor();
  }, []);
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

            <div className="w-3/5 px-8 py-8 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl ">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-lg font-bold text-neutral-800">
                  Create New Event
                </h1>
              </div>
              <div className="mb-4">
                <div className="mb-4">
                  <p className="mb-2">Company Name</p>
                  <div className="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4">
                    <input
                      type="text"
                      className="text-black placeholder-gray-300 text-base leading-6 flex-1 bg-neutral-50 border-none focus:outline-none"
                      value={auth.name}
                      disabled
                      // onChange={handleChangeUsername}
                    ></input>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="mb-2">Proposed Date 1</p>
                  <div className="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4">
                    <DatePicker
                      selected={proposedDate1}
                      onChange={(date) => setProposedDate1(date)}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <p className="mb-2">Proposed Date 2</p>
                  <div className="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4">
                    <DatePicker
                      selected={proposedDate2}
                      onChange={(date) => setProposedDate2(date)}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <p className="mb-2">Proposed Date 3</p>
                  <div className="w-full py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4">
                    <DatePicker
                      selected={proposedDate3}
                      onChange={(date) => setProposedDate3(date)}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <p className="mb-2">Proposed Locations</p>
                  <div className="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4">
                    <input
                      type="text"
                      className="text-black placeholder-gray-300 text-base leading-6 flex-1 bg-neutral-50 border-none focus:outline-none"
                      value={location}
                      onChange={handleChangeLocation}
                    ></input>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="mb-2">Event Name</p>
                  <div className="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4">
                    <input
                      type="text"
                      className="text-black placeholder-gray-300 text-base leading-6 flex-1 bg-neutral-50 border-none focus:outline-none"
                      value={eventName}
                      onChange={handleChangeEventName}
                    ></input>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="mb-2">Vendor</p>
                  <select
                    onChange={handleChangeVendor}
                    className="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4"
                  >
                    {vendors.map((ven, index) => (
                      <option
                        key={`vendor-${index}`}
                        value={JSON.stringify(ven)}
                      >
                        {ven.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div
                  onClick={submitData}
                  className="bg-neutral-800 border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
                >
                  <p className="font-bold text-neutral-50">Submit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
