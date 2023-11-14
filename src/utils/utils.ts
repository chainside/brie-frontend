import * as countries from 'i18n-iso-countries'
import * as lang from 'i18n-iso-countries/langs/it.json'
import { add, differenceInCalendarDays, differenceInMonths } from 'date-fns';
import { TradeTrendsInterface } from '../services/Dashboard/api';

countries.registerLocale(lang)
export const month = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"]


export function codeTranslator(e = "") {
  return countries.getName(e.trim(), "it")
}

export const DataHistogramChartYFormater = (value: number) => {
  if (value > 1000) {
    return (value / 1000).toString() + 'K';
  } else {
    return value.toString();
  }
}

export const DataHistogramChartXFormater = (start: Date, end: Date) => {
  if (differenceInMonths(end, start) <= 3) {
    return (value: number) => {
      const d = new Date(value)
      return d.getDate() + " " + month[d.getMonth()]
    }
  }
  else {
    return (value: number) => {
      const d = new Date(value)
      return month[d.getMonth()]
    }
  }
}

export function createDataForHistogram(data: TradeTrendsInterface[], startDate: Date, endDate: Date) {
  if (differenceInMonths(endDate, startDate) <= 3) {
    return data
  }
  else {
    let res: TradeTrendsInterface[] = []
    data.forEach(element => {
      let tmp = new Date(element.ms)
      if (res.filter((e) => {
        let tmpData = new Date(e.ms)
        return (tmpData.getMonth() === tmp.getMonth() && tmpData.getFullYear() === tmp.getFullYear())

      }).length === 0) {
        res.push({ ...element })
      }
      else {
        res[res.length - 1].count += element.count
      }

    });

    return res
  }

}

export function subtractYears(date: Date, years: number) {
  const dateCopy = new Date(date);

  dateCopy.setFullYear(date.getFullYear() - years);

  return dateCopy;
}

export const getTicks = (startDate: Date, endDate: Date, num: number) => {
  const diffDays = differenceInCalendarDays(endDate, startDate);

  let current = startDate,
    velocity = Math.round(diffDays / (num - 1));

  const ticks = [startDate.getTime()];

  for (let i = 1; i < num - 1; i++) {
    ticks.push(add(current, { days: i * velocity }).getTime());
  }

  ticks.push(endDate.getTime());
  ticks.forEach((element, index) => {
    let d = new Date(element)
    if (index !== 0) {
      d.setDate(1)
    }
    ticks[index] = d.getTime()
  });
  return ticks;
};

export const DataAreaChartYFormater = (value: number) => {
  return value + "t"
}

export const DataAreaChartXFormater = (value: number) => {
  const d = new Date(value)
  return d.getFullYear() + " " + month[d.getMonth()]

}

export function getMonthDifference(startDate: Date, endDate: Date) {
  return (
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear())
  );
}

export const COLORS = ['#BAE6FF', '#F5A5F6', '#03CEA4', '#F79F79', '#F5907A', '#F5DD7A', '#A7F57A', '#7AF5DF', '#CC7AF5', '#7AF5F5', '#F57AB2'];

const ALPHA_NUMERIC_DASH_REGEX = /^[+]?\d+([.]\d+)?$/;

export const reg = new RegExp(ALPHA_NUMERIC_DASH_REGEX);


export function getEnumValue(enumSrc: Record<string, string>, key?: string) {
  if (key && Object.keys(enumSrc).includes(key)) {
    return enumSrc[key as keyof typeof enumSrc]
  }
  else {
    return key
  }
}