import { CreatePaymentIntent } from "@/dtos/payment.dto";
import { Stripe } from "stripe";

class PaymentService {
    public stripeConfig: Stripe.StripeConfig = {
        apiVersion: "2020-08-27"
    }
    public stripe = new Stripe(process.env.STRIPE_SECRET_KEY, this.stripeConfig);

    public async createPaymentIntent(body: CreatePaymentIntent): Promise<Stripe.Response<Stripe.PaymentIntent>> {
        // Use an existing Customer ID if this is a returning customer.
        const customer = await this.stripe.customers.create();
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: 1099,
            currency: 'myr',
            customer: customer.id,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return paymentIntent;
    }

    public async createSubscription(): Promise<Stripe.Response<Stripe.Subscription>> {
        // Use an existing Customer ID if this is a returning customer.
        const customer = await this.stripe.customers.create();
        const subscription = await this.stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: "price_1LC2RYI686gPBRMK9WAGDY8m" }],
            payment_behavior: "default_incomplete",
            expand: ["latest_invoice.payment_intent"],
        });

        return subscription
    }
}

export default PaymentService;