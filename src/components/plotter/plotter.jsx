import React, { useState } from "react";
import Plot from "react-plotly.js";
import { mean, fft, map } from "mathjs";

import { useDispatch, useSelector } from "../../services/hooks";
import { absComplexNumber, downloadTxtFile } from "../../utils/utils";
import { setIsSaved } from "../../services/reducers/data";

const Plotter = () => {
  const dispatch = useDispatch();
  const plotDataUb = useSelector((store) => store.data.dataUb);
  const plotDataIb = useSelector((store) => store.data.dataIb);

  const [y, setY] = useState([]);
  const [x, setX] = useState([]);

  const [xaxis, setXaxis] = useState("");
  const [yaxis, setYaxis] = useState("");

  const type = useSelector((store) => store.data.choosenGraph);
  const isSaved = useSelector((store) => store.data.isSaved);
  React.useEffect(() => {
    if (type) {
      setY([]);
      setX([]);

      // Данные для графика Ik
      if (type === "ik") {
        setY(plotDataIb[0]);
        setX(plotDataIb.map((_, index) => index));

        setXaxis("Время (секунды)");
        setYaxis("Ik");
      }

      // Данные для графика Uk
      if (type === "uk") {
        setY(plotDataUb[0]);
        setX(plotDataUb.map((_, index) => index));

        setXaxis("Время (секунды)");
        setYaxis("Uk");
      }

      // Данные для графика спектра
      if (type === "spectrum") {
        const signal = plotDataIb[1].map(Number).map((val) => [val, 0]);
        let phasors = fft(signal);

        let result = [];

        for (let i = 0; i < phasors.length; i++) {
          result.push(absComplexNumber(phasors[i][0]));
        }

        let freq = [];

        for (let i = 0; i < plotDataIb[1].length; i++) {
          freq.push(i / ((plotDataIb[1].length * 1) / 800));
        }

        const n = phasors.length;

        const halfN = n / 2;

        const shiftedPhasors = new Array(n);
        const shiftedFreq = new Array(n);

        for (let i = 0; i < halfN; i++) {
          shiftedPhasors[i] = phasors[i + halfN];
          shiftedFreq[i] = freq[i + halfN] - 800 / 2;
        }

        for (let i = halfN; i < n; i++) {
          shiftedPhasors[i] = phasors[i - halfN];
          shiftedFreq[i] = freq[i - halfN] - 800 / 2;
        }

        phasors = shiftedPhasors;
        freq = shiftedFreq;

        let firstForty = result.slice(0, 40);
        let restOfArray = result.slice(40);

        result = restOfArray.concat(firstForty);

        firstForty = freq.slice(0, 40);
        restOfArray = freq.slice(40);
        freq = restOfArray.concat(firstForty);

        setY(result);
        setX(freq);
        setXaxis("Частота (Гц)");
        setYaxis("Амплитуда");
        if (!isSaved) {
          downloadTxtFile(result, freq);
          dispatch(setIsSaved());
        }
      }

      // Данные для графика мгновенных мощностей
      if (type === "p") {
        const result = plotDataIb[1]
          .map(Number)
          .map((item, index) => item * plotDataUb[1].map(Number)[index]);
        setY(result);
        setX(plotDataUb.map((_, index) => index));

        setXaxis("Время (секунды)");
        setYaxis("Мгновенная мощность");
      }

      // Данные для графика полных мощностей
      if (type === "s") {
        let s_data = [];

        for (let line_num = 0; line_num < plotDataIb.length; line_num += 10) {
          let ik_data = plotDataIb.slice(line_num, line_num + 10);
          let uk_data = plotDataUb.slice(line_num, line_num + 10);
          let effective_voltage = mean(
            ik_data.map((ik_item) => mean(map(ik_item, (val) => val ** 2)))
          );

          let effective_current = mean(
            uk_data.map((uk_item) => mean(map(uk_item, (val) => val ** 2)))
          );

          let total_power = effective_voltage * effective_current;
          s_data.push(total_power);
        }

        setX(plotDataUb.map((_, index) => index));
        setY(s_data);
        setXaxis("Время (секунды)");
        setYaxis("Полная мощность");
      }
    }
  }, [dispatch, isSaved, plotDataIb, plotDataUb, type]);

  return (
    <>
      <Plot
        data={[
          {
            x: x,
            y: y,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
            name: "Ваша легенда здесь",
          },
        ]}
        layout={{
          width: 900,
          height: 900,
          xaxis: {
            title: xaxis,
          },
          yaxis: {
            title: yaxis,
          },
        }}
      />
    </>
  );
};

export default Plotter;
