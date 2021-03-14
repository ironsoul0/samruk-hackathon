import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { DateUtils } from "react-day-picker";
import dateFnsFormat from "date-fns/format";
import dateFnsParse from "date-fns/parse";
import ruLocale from "date-fns/locale/ru";
import "moment/locale/ru";

import classes from "./DayPicker.module.css";

const FORMAT = "MM/dd/yyyy";

function parseDate(str, format, locale) {
  const parsed = dateFnsParse(str, format, new Date(), { locale });

  if (DateUtils.isDate(parsed)) {
    return parsed;
  }

  return undefined;
}

function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}

const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const WEEKDAYS_LONG = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

const WEEKDAYS_SHORT = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

function DayPicker({ onDayChange }) {
  return (
    <div className={classes.root}>
      <label for="dayPicker">Выберите дату отправления:</label>
      <DayPickerInput
        onDayChange={onDayChange}
        formatDate={formatDate}
        format={FORMAT}
        parseDate={parseDate}
        placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
        className={classes.dayPicker}
        dayPickerProps={{
          locale: ruLocale,
          months: MONTHS,
          weekdaysLong: WEEKDAYS_LONG,
          weekdaysShort: WEEKDAYS_SHORT,
        }}
      />
    </div>
  );
}

export default DayPicker;
