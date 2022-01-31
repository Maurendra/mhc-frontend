import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import ModalAddEvent from "../../components/ModalAddEvent";
import ModalDetailEventCompany from "../../components/ModalDetailEventCompany";
import EventRepositories from "../../config/data/Repositories/EventRepositories";
// import staticData from "../../config/data/static";
import AuthContext from "../../AuthContext";

export default () => {
  const [showModalAdd, setShowModalAdd] = React.useState(false);
  const [showModalDetail, setShowModalDetail] = React.useState(false);
  const [events, setEvents] = React.useState([]);
  const [event, setEvent] = React.useState(null);
  const { auth } = React.useContext(AuthContext);

  const getEvents = async () => {
    const res = await EventRepositories.fetchEvents();
    if (res.data) {
      let ev = res.data;
      let data = [];
      ev.map((event, index) => {
        if (event.company_id == auth.id) {
          data.push(event);
        }
      });

      if (data.length > 0) {
        setEvents(data);
      }
    }
  };

  React.useEffect(async () => {
    await getEvents();
  }, []);

  const formatDate = (dateData) => {
    let date = new Date(JSON.parse(dateData));
    return date.toLocaleDateString("en-US");
  };

  const deleteEvent = async (event) => {
    let submittedData = {
      id: event._id,
    };

    const res = await EventRepositories.deleteEvent(submittedData);
    await getEvents();
  };

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto py-8">
        <div
          onClick={() => setShowModalAdd(!showModalAdd)}
          className="bg-blue-400 hover:bg-blue-800 text-white border-2 border-white rounded-lg py-2 px-4 cursor-pointer w-fit mb-4"
        >
          <p className="font-bold">Create New Event</p>
        </div>
        <table className="shadow-lg bg-white w-full">
          <thead>
            <tr>
              <th className="bg-blue-100 border text-left px-8 py-4">
                Event Name
              </th>
              <th className="bg-blue-100 border text-left px-8 py-4">
                Vendor Name
              </th>
              <th className="bg-blue-100 border text-left px-8 py-4">
                Confirmed Date
              </th>
              <th className="bg-blue-100 border text-left px-8 py-4">Status</th>
              <th className="bg-blue-100 border text-left px-8 py-4">
                Date Created
              </th>
              <th className="bg-blue-100 border text-left px-8 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => {
              return (
                <tr key={`event-company-${index}`}>
                  <td className="border px-8 py-4">{event.event_name}</td>
                  <td className="border px-8 py-4">{event.vendor_name}</td>
                  <td className="border px-8 py-4">
                    {event.confirm_date
                      ? `${formatDate(event.confirm_date)}`
                      : `${formatDate(event.proposed_date_1)} (Proposed Date)`}
                  </td>
                  <td className="border px-8 py-4">{event.status}</td>
                  <td className="border px-8 py-4">
                    {formatDate(event.created_at)}
                  </td>
                  <td className="border px-8 py-4 flex space-x-2">
                    <div
                      onClick={() => {
                        setShowModalDetail(!showModalDetail);
                        setEvent(event);
                      }}
                      className="bg-blue-400 hover:bg-blue-800 text-white border-2 border-white rounded-lg py-2 px-4 cursor-pointer w-fit"
                    >
                      <p className="font-bold">View</p>
                    </div>
                    <div
                      onClick={() => deleteEvent(event)}
                      className="bg-red-400 hover:bg-red-800 text-white border-2 border-white rounded-lg py-2 px-4 cursor-pointer w-fit"
                    >
                      <p className="font-bold">Delete</p>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ModalAddEvent
        showModal={showModalAdd}
        setShowModal={setShowModalAdd}
        getEvents={getEvents}
      />
      <ModalDetailEventCompany
        showModal={showModalDetail}
        setShowModal={setShowModalDetail}
        getEvents={getEvents}
        event={event}
      />
    </>
  );
};
