import React from "react";

const SliderStyles = {
  width: '100%',
}

const HeaderStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  fontSize: '1.3rem'
};

const LabelStyles = {
  marginBottom: 0,
  fontSize: '1.3rem'
}
const InputStyles = {
  width: '100%',
}

const LegendStyles = {
  margin: '0 0 2rem',
  width: '100%',
  fontStyle: 'italic',
  fontSize: '1.3rem',
  display: 'flex',
  justifyContent: 'space-between',
}

export type SliderProps = {
  label: string,
  min: number,
  max: number,
  value: number,
  updateValue: (value: number) => void,
}

export function Slider({label, min, max, value, updateValue}: SliderProps) {

  return (
    <div className="slider" style={ SliderStyles }>
      <div className="slider-header" style={HeaderStyles}>
        <h5 style={LabelStyles}>{label}</h5>
        <div>{ `$${value}` }</div>
      </div>
      <input style={InputStyles}
             type="range"
             min={min}
             max={max}
             value={value}
             onChange={e => updateValue(+e.target.value)} />
      <div className="labels" style={LegendStyles}>
        <span className="min-label">{ min }</span>
        <span className="max-label">{ max }</span>
      </div>
    </div>
  );
}