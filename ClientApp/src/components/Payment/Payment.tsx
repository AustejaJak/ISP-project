import React from "react";
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "../../clients/react-query/queryKeys";
import { ordersApi } from "../../clients/api/ordersApi";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET_KEY || "");

type PaymentProps = {
  clientSecret: string;
  handleOrder: () => void;
};

const CheckoutForm: React.FC<{ handleOrderCreation: () => void }> = ({
  handleOrderCreation,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    handleOrderCreation();
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/",
      },
    });

    console.log(result);

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {

      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <div className='m-auto'>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button>Submit</button>
      </form>
    </div>
  );
};

export const Payment: React.FC<PaymentProps> = ({
  clientSecret,
  handleOrder,
}) => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret,
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm handleOrderCreation={handleOrder} />
    </Elements>
  );
};
