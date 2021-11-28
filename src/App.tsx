import React, {useEffect, useState} from "react";
import { ApplicationService } from "./services/application.service";
import { Application } from "./models/Application";

function App() {
  const [apps, setApps] = useState<Application[]>([]);

  useEffect(() => {
    ApplicationService.getAllApplications().then(data => setApps(data));
  }, [])

  return (
    <div>
      <h1>Pharos Coding Exercise</h1>
      {apps.map(app => <div>{app.name}</div>)}
    </div>
  );
}

export default App;
