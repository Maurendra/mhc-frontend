import Provider from "../Provider";

const UserRepositories = {
  fetchUsers: async function () {
    try {
      const response = await Provider.get(`/users`);
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
  fetchVendor: async function () {
    try {
      const response = await Provider.get(`/users/vendor`);
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

export default UserRepositories;
