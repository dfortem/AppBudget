import React, { useEffect, useState } from "react";
import { ApplicationService } from "./services/application.service";
import { Application } from "./models/Application";
import { SideNav } from "./components/SideNav";
import './assets/styles/common.css';
import {AppCard} from "./components/AppCard";

const AppStyles = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flex: 1,
}


const AppList = {
  height: 'fit-content',
  maxHeight: 'calc(100% - 4rem)',
  width: '100%',
  padding: '2rem',
  overflow: 'scroll',
  display: 'flex',
  flex: 3,
  flexWrap: 'wrap' as const,
  justifyContent: 'center',
}

function App() {
  const [apps, setApps] = useState<Map<string, Application[]>>(new Map());
  const [bcapKeys, setBcapKeys] = useState<string[]>([]);
  const [selectedApps, setSelectedApps] = useState<Application[]>([]);

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

  useEffect(() => setBcapKeys(Array.from(apps.keys())), [apps]);

  let selectBcap = (name: string) => {
    let relatedKeys = bcapKeys.filter(key => key.includes(name));
    let tempApps: Application[] = [];
    relatedKeys.forEach(key => {
      tempApps = tempApps.concat(...(apps.get(key) || []));
    });
    setSelectedApps(tempApps.sort((a, b) => +a.id.substring(4) - +b.id.substring(4)));
  }


  return (
    <div style={ AppStyles }>
      <SideNav bcap3={ bcapKeys } selectBcap={ selectBcap } />
      <div className="application-list" style={ AppList }>
        { selectedApps.map(app => <AppCard app={ app } key={ app.id } />) }
      </div>
    </div>
  );
}

export default App;
