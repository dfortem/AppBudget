import React from "react";
import {Application} from "../models/Application";

const AppCardStyles = {
  margin: '2rem',
  padding: '2rem',
  border: '1px solid red',
  borderRadius: '0.6rem',
  height: '12rem',
  minWidth: '18rem',
  textAlign: 'center' as const,
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'center',
  alignContent: 'center',
}

const AppSpend = {
  margin: '2rem 0',
  textDecoration: 'italic',
}

export type AppCardProps = {
  app: Application
}

export function AppCard({app}: AppCardProps) {

  return (
    <div className="app-card" style={ AppCardStyles }>
      <h2 className="app-name">
        { app.name }
      </h2>
      <div className="app-spend" style={ AppSpend }>
        Total spend: ${ app.spend }
      </div>
    </div>
  );
}