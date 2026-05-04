import 'dotenv/config';
import ngrok from '@ngrok/ngrok';

const portEnv = process.env.PORT ?? '3002';
const port = Number.parseInt(portEnv, 10);
if (!Number.isFinite(port) || port <= 0) {
  console.error('NGROK_FORWARD: PORT must be a positive integer.');
  process.exit(1);
}
if (
  typeof process.env.NGROK_AUTHTOKEN !== 'string' ||
  process.env.NGROK_AUTHTOKEN.trim() === ''
) {
  console.error(
    'NGROK_FORWARD: Set NGROK_AUTHTOKEN in .env (project root).\nGet it: https://dashboard.ngrok.com/get-started/your-authtoken\nSign up / verify email: https://dashboard.ngrok.com/signup',
  );
  process.exit(1);
}
const listener = await ngrok.forward({
  addr: port,
  authtoken_from_env: true,
});
console.log(`Ingress established at: ${listener.url()}`);
process.stdin.resume();
