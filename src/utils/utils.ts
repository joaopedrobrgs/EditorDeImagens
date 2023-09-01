export function hoursMinutesToString(date: Date): string {
  // return `${date.getHours()}:${date.getMinutes()}`
  const str = date.toLocaleTimeString();
  return str.slice(0, str.length - 3);
}

export function hoursMinutesSecondsToString(date: Date): string {
  return date.toLocaleTimeString();
}

export function dateToString(date: Date): string {
  return date.toLocaleDateString();
}

export function dateTimeToString(date: Date): string {
  return date.toLocaleString();
}

export function valueLabelFormat(value: number, suffix: string) {
  return `${value}${suffix}`;
}

export function changeRootVarAtribute(
  rootStyleAtributeValue: string,
  rootStyleAtributeName: string
) {
  document.documentElement.style.setProperty(
    rootStyleAtributeName,
    rootStyleAtributeValue
  );
}

export function calcFontSizeAccordingToWidth(windowWidth: number ,multiplicator: number = 1) {
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
  // if (windowWidth <= 1160) {
  //   return windowWidth * 0.014 * multiplicator;
  // }
  if (windowWidth <= 1384) {
    return windowWidth * 0.01 * multiplicator;
  }
  if (windowWidth <= 1849) {
    return windowWidth * 0.008 * multiplicator;
  } else {
    return 14 * multiplicator;
  }
}

export function getWindowWidth(){
  return window.innerWidth;
}