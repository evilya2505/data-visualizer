function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.round(seconds % 60);

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function calculateExperimentTime(data) {
  const totalLines = data.length;

  // Рассчитываем количество уникальных строк, учитывая, что каждая третья строка - дубликат, начиная с третьей
  let uniqueLines = 0;
  for (let i = 0; i < totalLines; i++) {
    if ((i + 1) % 3 !== 0) {
      uniqueLines++;
    }
  }

  // Каждая уникальная строка соответствует 0.1 секунды
  const experimentTime = uniqueLines * 0.1;

  return formatTime(experimentTime);
}

export function removeDuplicateLines(data) {
  // Создаем новый массив для хранения результатов
  const filteredData = [];

  // Проходим через каждый элемент массива и добавляем в результат только те элементы,
  // которые не являются дубликатами (каждая третья начиная с третьей)
  data.forEach((item, index) => {
    if ((index + 1) % 2 !== 0 || index === 1) {
      filteredData.push(item);
    }
  });

  return filteredData;
}

export function absComplexNumber(complexNumber) {
  const realPart = complexNumber.re;
  const imaginaryPart = complexNumber.im;
  return Math.sqrt(realPart ** 2 + imaginaryPart ** 2);
}

export function downloadTxtFile(result, freq) {
  const data = result
    .map((value, index) => `${freq[index]}\t${value}`)
    .join("\n");

  const blob = new Blob([data], { type: "text/plain" });

  // Показываем диалоговое окно сохранения
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "data.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Очищаем ссылку
  URL.revokeObjectURL(a.href);
}
