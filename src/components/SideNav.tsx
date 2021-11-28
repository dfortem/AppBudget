import React, {useEffect, useState} from "react";

const SideNavStyles = {
  height: 'calc(100% - 4rem)',
  padding: '2rem',
  borderRight: '1px solid red',
  overflow: 'scroll',
}
const BcapLevel1 = {
  borderBottom: '1px solid red'
}

let Name = {
  margin: '2rem',
  'white-space': 'pre-wrap',
  cursor: 'pointer',
}

let SelectedName = {
  ...Name,
  color: 'red',
}

export type SideNavProps = {
  bcap3: string[],
  selectBcap: (name: string) => void,
}

export function SideNav({bcap3, selectBcap}: SideNavProps) {
  const [bcap2, setBcap2] = useState<Map<string, string[]>>(new Map());
  const [bcap1, setBcap1] = useState<Map<string, string[]>>(new Map());
  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    let bcap2Map = new Map<string, string[]>();
    bcap3.sort().forEach(name => {
      let bcap2 = name.slice(0, -2);
      let previousData = bcap2Map.get(bcap2) || [];
      bcap2Map.set(bcap2, [...previousData, name]);
    });
    setBcap2(bcap2Map);

    let bcap1Map = new Map<string, string[]>();
    bcap2Map.forEach((list, key, map) => {
      let bcap1 = key.slice(0, -2);
      let previousData = bcap1Map.get(bcap1) || [];
      bcap1Map.set(bcap1, [...previousData, key]);
    });
    setBcap1(bcap1Map);
  }, [bcap3]);

  const clickName = (bcapName: string) => {
    setSelected(bcapName);
    selectBcap(bcapName);
  }

  const navMenu = (bcap1: Map<string, string[]>, bcap2: Map<string, string[]>) => {
    let content: JSX.Element[] = [];
    bcap1.forEach((list, key, map) => {
      content.push(
        <div className="bcap-level1" style={BcapLevel1}>
          <div className="bcap-level1-name"
               style={ selected === key ? SelectedName : Name }
               onClick={e => clickName(key)}>
            { key }
          </div>
          {list.map(bcap2Name => {
            return <div className="bcap-level2">
              <div className="bcap-level2-name"
                   style={ selected === bcap2Name ? SelectedName : Name }
                   onClick={e => clickName(bcap2Name)}>
                { `    ${bcap2Name}` }
              </div>
              <div className="bcap-level3">
                {(bcap2.get(bcap2Name) || []).map(bcap3Name => {
                  return <div className="bcap-level3-name"
                              style={ selected === bcap3Name ? SelectedName : Name }
                              onClick={e => clickName(bcap3Name)}>
                    { `        ${bcap3Name}` }
                  </div>
                })}
              </div>
            </div>
          })}
        </div>
      )
    })
    return content;
  };

  return (
    <div className="side-nav" style={SideNavStyles}>
      {navMenu(bcap1, bcap2)}
    </div>
  );
}