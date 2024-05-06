import React from "react";
import styles from "./app.module.css";
import CustomFileReader from "../file-reader/filre-reader";
import Plotter from "../plotter/plotter";
import { useSelector } from "../../services/hooks";
import Menu from "../menu/menu";

function App() {
  const experimentTime = useSelector((store) => store.data.experimentTime);
  const ibFileName = useSelector((store) => store.data.IbName);
  const ubFileName = useSelector((store) => store.data.UbName);

  React.useEffect(() => {
    console.log(experimentTime);
  }, [experimentTime]);
  return (
    <div className={styles.app}>
      <CustomFileReader />
      <p>Общая продолжительность эксперимента: {experimentTime}</p>
      <p>
        Загружены файлы: {ibFileName} {ubFileName}
      </p>
      <Menu />
      <Plotter />
    </div>
  );
}

export default App;
