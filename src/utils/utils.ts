//Função que retorna as horas e os minutos com base em um dado do tipo "Date" passado como parâmetro:
export function hoursMinutesToString(date: Date): string {
  // return `${date.getHours()}:${date.getMinutes()}`
  const str = date.toLocaleTimeString();
  return str.slice(0, str.length - 3);
}

//Função que retorna as horas, minutos e segundos com base em um dado do tipo "Date" passado como parâmetro:
export function hoursMinutesSecondsToString(date: Date): string {
  return date.toLocaleTimeString();
}

//Função que transforma um dado do tipo "Date" em uma string com apenas a data:
export function dateToString(date: Date): string {
  return date.toLocaleDateString();
}

//Função que transforma um dado do tipo "Date" em uma string com data e hora:
export function dateTimeToString(date: Date): string {
  return date.toLocaleString();
}

//Função que pega um valor e uma medida (passada como string) e transformam em uma string unica:
export function valueLabelFormat(value: number, measure: string) {
  return `${value}${measure}`;
}

//Função que auxilia a interação com valores CSS que foram rooteados:
export function changeRootVarAtribute(
  rootStyleAtributeValue: string,
  rootStyleAtributeName: string
) {
  document.documentElement.style.setProperty(
    rootStyleAtributeName,
    rootStyleAtributeValue
  );
}

//Função que retorna o tamanho de uma fonte de acordo com a largura da janela do navegador:
export function calcFontSizeAccordingToWidth(
  windowWidth: number,
  multiplicator: number = 1
) {
  if (windowWidth <= 275) {
    return windowWidth * 0.035 * multiplicator;
  }
  if (windowWidth <= 306) {
    return windowWidth * 0.04 * multiplicator;
  }
  if (windowWidth <= 379) {
    return windowWidth * 0.035 * multiplicator;
  }
  if (windowWidth <= 486) {
    return windowWidth * 0.03 * multiplicator;
  }
  if (windowWidth <= 549) {
    return windowWidth * 0.025 * multiplicator;
  }
  if (windowWidth <= 819) {
    return windowWidth * 0.018 * multiplicator;
  }
  if (windowWidth <= 975) {
    return windowWidth * 0.015 * multiplicator;
  }
  if (windowWidth <= 1384) {
    return windowWidth * 0.01 * multiplicator;
  }
  if (windowWidth <= 1849) {
    return windowWidth * 0.008 * multiplicator;
  } else {
    return 14 * multiplicator;
  }
}

//Função que retorna a largura atual da janela:
export function getWindowWidth() {
  return window.innerWidth;
}

//Função que retorna a altura atual da janela:
export function getWindowHeight() {
  return window.innerHeight;
}
