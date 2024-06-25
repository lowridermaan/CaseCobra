import { db } from '@/db';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    // raw body as text
    const body = await req.text();
    const signature = headers().get('stripe-signature');
    if (!signature) {
      return new Response('Invalid signature', { status: 400 });
    }
    // Check that req come from the payment sys.

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // в случае если клиент оплатил
    if (event.type === 'checkout.session.completed') {
      if (!event.data.object.customer_details?.email) {
        throw new Error('Missing user email');
      }

      const session = event.data.object as Stripe.Checkout.Session;

      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null,
      };

      if (!userId || !orderId) {
        throw new Error('Invalid request metadata');
      }

      const billingAddress = session.customer_details!.address;
      const shippingAddress = session.shipping_details!.address;

      await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          ShippingAdress: {
            create: {
              name: session.customer_details?.name!,
              city: shippingAddress?.city!,
              country: shippingAddress?.country!,
              street: shippingAddress?.line1!,
              postalCode: shippingAddress?.postal_code!,
              state: shippingAddress?.state,
            },
          },
          BillingAdress: {
            create: {
              name: session.customer_details?.name!,
              city: billingAddress?.city!,
              country: billingAddress?.country!,
              street: billingAddress?.line1!,
              postalCode: billingAddress?.postal_code!,
              state: billingAddress?.state,
            },
          },
        },
      });
    }
    return NextResponse.json({ result: event, ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: 'Something went wrong', ok: false },
      { status: 500 }
    );
  }
}
