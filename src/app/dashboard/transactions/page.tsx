import Transactions from "./components/transactions";

const LOADING_MIN_DURATION_MS = 2500;

export default async function TransactionsPage() {
  await new Promise((resolve) => setTimeout(resolve, LOADING_MIN_DURATION_MS));
  return <Transactions />;
}
