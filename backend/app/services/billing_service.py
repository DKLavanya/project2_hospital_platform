import random
import datetime

def generate_invoice_number() -> str:
    # Generates a unique invoice number like INV-20260622-XXXX
    date_str = datetime.datetime.now().strftime("%Y%m%d")
    random_digits = "".join(str(random.randint(0, 9)) for _ in range(4))
    return f"INV-{date_str}-{random_digits}"

def process_mock_payment(amount: float, payment_method: str) -> dict:
    # Simulates connecting to Stripe/Razorpay and getting a transaction back
    # In a real environment, you'd use stripe.PaymentIntent.create()
    txn_id = f"txn_{random.randbytes(12).hex()}"
    return {
        "success": True,
        "transaction_id": txn_id,
        "amount": amount,
        "payment_method": payment_method,
        "payment_date": datetime.datetime.utcnow()
    }
