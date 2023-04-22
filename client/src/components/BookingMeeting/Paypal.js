import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

export default function App({total, tranSuccess, meeting}) {
  return (
    <PayPalScriptProvider options={{ 'client-id': 'AdWlNZUt3tDkWD1rI1bmwWZaGXHD00-HtIuKS0yORiXlpRtiaK-Ex0AY_ykcOTaAWAL9qRI4ChOykcFv' }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total,
                },
                payee: {
                  email_address: meeting.email,
                }
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            // const name = details.payer.name.given_name;
            // alert(`Transaction completed by ${name}`);
            tranSuccess(details.id, meeting)
          });
        }}
      />
    </PayPalScriptProvider>
  );
}
