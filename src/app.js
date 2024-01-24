import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import envGetter from "./common/env/envGetter.js";
import { globalErrhandler } from "./common/middlewares/globalErrHandler.js";
import Routes from "./routers/router.js";
import { dbConnection } from "./utils/dbConnect.js";
import { notFound } from "./common/middlewares/notFound.js";
import Stripe from "stripe";
dotenv.config();
class App {
  app;
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    this.errorHandler();
  }
  middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }
  routes() {
    this.app.use("/api/v1", Routes);
    //Stripe webhook
    const stripe = new Stripe(envGetter.getPaymentSecretKey());
    // This is your Stripe CLI webhook secret for testing your endpoint locally.
    const endpointSecret = envGetter.getEndPointSecret();
    this.app.post(
      "/webhook",
      express.raw({ type: "application/json" }),
      async (request, response) => {
        const sig = request.headers["stripe-signature"];
        let event;
        try {
          event = stripe.webhooks.constructEvent(
            request.body,
            sig,
            endpointSecret
          );
        } catch (err) {
          response.status(400).send(`Webhook Error: ${err.message}`);
          return;
        }
        // Handle the event
        if (event.type === "checkout.session.completed") {
          const session = event.data.object;
          const { order_id } = session.metadata;
          const paymentStatus = session.payment_status;
          const paymentMethod = session.payment_method_types[0];
          const totalPrice = session.amount_total;
          const currency = session.currency;
          const order = await Order.findByIdAndUpdate(
            JSON.parse(order_id),
            {
              paymentStatus,
              paymentMethod,
              totalPrice: totalPrice / 100,
              currency,
            },
            { new: true }
          );
          console.log(order);
        } else return;
        response.send();
      }
    );
    this.app.use("*", notFound);
  }
  errorHandler() {
    this.app.use(globalErrhandler);
  }

  async listen() {
    dbConnection();
    const HOST = envGetter.getHost();
    const PORT = envGetter.getPort();
    this.app.listen(PORT, () =>
      console.log(`server listening at ${HOST}:${PORT}`)
    );
  }
}
export default new App();
