import { IsNumber } from "class-validator";

export class CreatePaymentIntent {
    @IsNumber()
    public amount: number;
}