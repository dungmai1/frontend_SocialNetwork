import axios from "axios";

const apiUrl = "https://25887692c8a6c11f.api-us.cometchat.io/v3";
const apiKey = "235b49651a9b27d44190e5bd09f166f4fe67fc47";

class CometChatService {
  CreateUser(data) {
    return axios.post(apiUrl + "/users", data, {
      headers: {
        accept: "application/json",
        apiKey: apiKey,
        "content-type": "application/json",
      },
    });
  }
}

export default new CometChatService();

