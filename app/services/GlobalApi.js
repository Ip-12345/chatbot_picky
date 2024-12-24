const axios = require('axios');

// Update the BASE_URL as needed
const BASE_URL = 'http://192.168.102.96:3000/api/hello';

const getBardApi = async (userMsg) => {
  try {
    // Making the GET request with timeout and encoding the message
    const response = await axios.get(`${BASE_URL}?ques=${encodeURIComponent(userMsg)}`, {
      timeout: 15000, // Timeout set to 5 seconds
    });
    return response.data; // Return the response data
  } catch (error) {
    // Enhanced error logging to capture network-related errors
    if (error.response) {
      console.error('Error Response:', error.response.data);
      console.error('Status Code:', error.response.status);
    } else if (error.request) {
      console.error('No Response from Server:', error.request);
    } else {
      console.error('Request Setup Error:', error.message);
    }
    throw error; // Re-throwing the error to handle it in the calling function
  }
};

module.exports = { getBardApi };
