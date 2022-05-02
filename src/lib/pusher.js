import Pusher from "pusher"

export const pusher = new Pusher({
    appId: "1404165",
    key: "c0acae6f17807058144c",
    secret: "e91784f882d008b1a037",
    cluster: "ap1",
    useTLS: true
  });