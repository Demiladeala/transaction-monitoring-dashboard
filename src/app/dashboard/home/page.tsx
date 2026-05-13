import Dashboard from "./components/dashboard";

const LOADING_MIN_DURATION_MS = 2500;

export default async function DashboardHomePage() {
  await new Promise((resolve) => setTimeout(resolve, LOADING_MIN_DURATION_MS));
  return <Dashboard />;
}
