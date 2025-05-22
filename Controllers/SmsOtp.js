import axios from "axios"

export const smsOtp = async (req, res) => {
  console.log("In the controller")  
  const {phone} = req.body;
    console.log(phone)
    try {
       const response = await axios.get(
              "https://www.fast2sms.com/dev/bulkV2",
              {
                params: {
                  authorization:
                    "x7dOL9i5MSmeKibU4AlFC9flXaBKKAdnrvHPgYNybGylmC6ZQD0pHdtqVeh3",
                  variables_values: "5599",
                  route: "otp",
                  numbers: phoneNumber,
                },
                headers: {
                  "cache-control": "no-cache",
                },
              }
            );

            console.log("SMS Response:", response.data);
    } catch (error) {
      console.log("smsotyp:",error)
    }
  // const accountSid =process.env.accountSid;
  // console.log(accountSid)
  // const authToken = process.env.authToken;
  // console.log(authToken)
  // const client = twilio(accountSid, authToken);
  // const otp = Math.floor(Math.random() * 100000);
  // try {
  //   client.messages
  //     .create({
  //       body: `${otp}`,
  //       from: "+19207893050",
  //       to: `${phone}`,
  //     })
  //     .then((message) => res
  //     .status(200)
  //     .json({ message: "Otp sent successfully", otp : otp}));
  // } catch (error) {
  //   res.json(400).json("Error sms", error);
  // }
};
