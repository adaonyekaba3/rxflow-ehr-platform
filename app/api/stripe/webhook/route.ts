import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import prisma from '@/lib/db'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ message: 'Missing signature' }, { status: 400 })
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object
        
        // Update transaction status
        await prisma.transaction.updateMany({
          where: { stripePaymentId: paymentIntent.id },
          data: {
            paymentStatus: 'COMPLETED',
            stripeReceiptUrl: paymentIntent.charges?.data[0]?.receipt_url,
          },
        })
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object
        
        await prisma.transaction.updateMany({
          where: { stripePaymentId: paymentIntent.id },
          data: { paymentStatus: 'FAILED' },
        })
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { message: 'Webhook handler failed' },
      { status: 400 }
    )
  }
}
