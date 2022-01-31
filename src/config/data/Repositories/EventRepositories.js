import Provider from "../Provider";

const EventRepositories = {
  fetchEvents: async function () {
    try {
      const response = await Provider.get(`/events`);
      return {
        error: false,
        data: response.data,
      };
    } catch (error) {
      return {
        error: true,
        message: Provider.readError(error),
      };
    }
  },
  createEvent: async function (query = {}) {
    try {
      const response = await Provider.post("/events", query);
      return {
        error: false,
        data: response.data,
      };
    } catch (error) {
      return {
        error: true,
        message: Provider.readError(error),
      };
    }
  },
  updateEvent: async function (query = {}) {
    try {
      const response = await Provider.put("/events", query);
      return {
        error: false,
        data: response.data,
      };
    } catch (error) {
      return {
        error: true,
        message: Provider.readError(error),
      };
    }
  },
  deleteEvent: async function (query = {}) {
    try {
      const response = await Provider.post("/events/delete", query);
      return {
        error: false,
        data: response.data,
      };
    } catch (error) {
      return {
        error: true,
        message: Provider.readError(error),
      };
    }
  },
};

export default EventRepositories;
