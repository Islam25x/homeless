import { useState } from "react";
import AdminNav from "../Headers/AdminNav/AdminNav";
import DashboardTop from "./DashboardTop/DashboardTop";
import LandlordPending from "./LandlordPending/LandlordPending";
import Posts from "./Posts/Posts";
import LineChart from "./LineChart";

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState<string>("welcome");

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "users":
        return <LandlordPending />;
      case "posts":
        return <Posts />;
      default:
        return (
          <div className="LineChart">
            <LineChart />
          </div>

        );
    }
  };

  return (
    <section id='Admin'>
      <div className="Dashboard d-flex">
        <AdminNav activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
        <div className="Dashboard-ctn" style={{ width: '100%' , height:'100vh' }}>
          <DashboardTop />
          {renderActiveComponent()}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
