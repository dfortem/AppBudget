import React, { useEffect, useState } from "react";
import { ApplicationService } from "./services/application.service";
import { Application } from "./models/Application";
import { SideNav } from "./components/SideNav";
import './assets/styles/common.css';

const AppStyles = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flex: 1,
}

function App() {
  const [apps, setApps] = useState<Map<string, Application[]>>(new Map());

  useEffect(() => {
    ApplicationService.getAllApplications().then(data => {
      let appMap: Map<string, Application[]> = new Map();
      data.forEach(app => {
        let key = app.BCAP3;
        let initialData = appMap.get(key) || [];
        appMap.set(key, [...initialData, app]);
      });
      setApps(appMap);
    });
  }, [])

  let selectBcap = (name: string) => {console.log(name);}

  return (
    <div style={AppStyles}>
      <SideNav bcap3={ Array.from(apps.keys()) } selectBcap={selectBcap} />
      <div className="application-list">

      </div>
    </div>
  );
}

export default App;
