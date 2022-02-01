interface Props {
  missions: {
    id: string;
    mass: number;
  }[];
}

export default function TopMissionsChart(props:  Props): JSX.Element {

  return (
    <div>
      top missions chart
      {JSON.stringify(props.missions, null, 4)}
    </div>
  );

}
