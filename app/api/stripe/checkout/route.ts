import { NextRequest, NextResponse } from 'next/server'
import { stripe, createPaymentIntent } from '@/lib/stripe'
import prisma from '@/lib/db'
import { generateTransactionNumber } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, total, paymentMethod, patientId, tenantId } = body

    // Create payment intent with Stripe
    const paymentIntent = await createPaymentIntent(total, {
      tenantId,
      patientId,
      transactionNumber: generateTransactionNumber(),
    })

    // Create transaction record in database
    const transaction = await prisma.transaction.create({
      data: {
        transactionNumber: generateTransactionNumber(),
        amount: total - (total * 0.0625), // Subtract tax
        tax: total * 0.0625,
        total,
        paymentMethod: paymentMethod === 'card' ? 'CARD' : 'CASH',
        paymentStatus: 'PENDING',
        stripePaymentId: paymentIntent.id,
        patientId,
        tenantId,
        items: {
          create: items.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.total,
          })),
        },
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      transactionId: transaction.id,
      transactionNumber: transaction.transactionNumber,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { message: 'Failed to create payment' },
      { status: 500 }
    )
  }
}
