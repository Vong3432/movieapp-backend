import { CreatePaymentIntent } from "@/dtos/payment.dto";
import { Body, Controller, HttpCode, Post, Res, UseBefore } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import paymentService from '@/services/payment.service';
import { validationMiddleware } from "@/middlewares/validation.middleware";

@Controller()
export class PaymentsController {
    public paymentService = new paymentService();

    @Post('/payment-sheet')
    @HttpCode(201)
    @UseBefore(validationMiddleware(CreatePaymentIntent, 'body'))
    @OpenAPI({ summary: 'Create a payment intent' })
    async createPaymentIntent(@Body() data: CreatePaymentIntent) {
        const paymentIntent = await this.paymentService.createPaymentIntent(data);
        const ephemeralKey = await this.paymentService.stripe.ephemeralKeys.create(
            { customer: paymentIntent.customer.toString() },
            { apiVersion: this.paymentService.stripeConfig.apiVersion }
        );
        return {
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: paymentIntent.customer.toString(),
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
        }
    }

    @Post('/subscribe')
    @HttpCode(201)
    @OpenAPI({ summary: 'Create a subscription to customer' })
    async createSubscription(@Res() response: any) {
        const subscription = await this.paymentService.createSubscription();
        const ephemeralKey = await this.paymentService.stripe.ephemeralKeys.create(
            { customer: subscription.customer.toString() },
            { apiVersion: this.paymentService.stripeConfig.apiVersion }
        );
        return {
            paymentIntent: subscription["latest_invoice"]["payment_intent"]["client_secret"],
            ephemeralKey: ephemeralKey.secret,
            customer: subscription.customer.toString(),
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
        }
    }
}