import { loadStripe } from "@stripe/stripe-js";


export const stripePromise = loadStripe(
  // process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  "pk_test_51LhhLMDkYmEn2CDOfSZ8hSP0qK22xYveCrgjsgJUJx5Rh4DhbIqDLKRRopLt6rZByS8HWYQvk4KvGakSmvo3DIiq00hGpX1Y53"
);