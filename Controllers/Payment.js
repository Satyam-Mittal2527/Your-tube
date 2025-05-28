import axios from "axios";
const PAYPAL_API = "https://api-m.sandbox.paypal.com";

async function getAccessToken() {
  console.log("Client_id", process.env.CLIENT_ID );
  console.log("secret", process.env.SECRET);
  const res = await axios({
    url: `${PAYPAL_API}/v1/oauth2/token`,
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: process.env.CLIENT_ID ,
      password: process.env.SECRET,
    },
    data: "grant_type=client_credentials",
  });
  return res.data.access_token;
}
export const PaymentController = async (req, res) => {
  const amount = req.body.amount;
  //     console.log(amount)
  // console.log(req.body)
  console.log(amount);
  try {
    const accessToken = await getAccessToken();

    const order = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amount,
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(order.data.id)
    res.json({ orderID: order.data.id });
  } catch (err) {
    console.error("Error creating order:", err?.response?.data || err.message);
    res.status(500).send("Failed to create order");
  }
};


export const PayConfirmController = async(req,res) => {
    const orderID = req.body.orderID;
    console.log(orderID)
    try {
    const accessToken = await getAccessToken();
    const capture = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(capture.data);
  } catch (err) {
    console.error("Error capturing order:", err?.response?.data || err.message);
    res.status(500).send("Failed to capture order");
  }
}