import Head from "next/head";
import { Dashboard } from "../components/Dashboard";

const HomePage = () => (
  <>
    <Head>
      <title>Curator Dashboard</title>
      <meta
        name="description"
        content="Monitor Curator runs, cost projections, and dataset health in one view."
      />
    </Head>
    <Dashboard />
  </>
);

export default HomePage;
