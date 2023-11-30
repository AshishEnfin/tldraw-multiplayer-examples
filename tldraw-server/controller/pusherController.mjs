

import Pusher from "pusher";

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true,
  });
  
  export const handler = (req, res) => {
    // Website you wish to allow to connect
    console.log("req.bodynew", req.body);
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "POST");
    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
  
    try {
      const socketId = req.body.socket_id;
      const channel = req.body.channel_name;
      const auth = pusher.authenticate(socketId, channel);
      res.send(auth);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };