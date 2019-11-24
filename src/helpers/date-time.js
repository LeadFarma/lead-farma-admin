import "moment-timezone";
import * as moment from "moment";
import "moment/locale/pt-br";

moment.defaultFormat = "YYYY-MM-DDTHH:MM:SS";

/**
 * Conversão de um data UTC para data Local
 * 
 * @example 
 *   exemplo("1971-07-19T17:30:16Z"); // 1971-07-19T14:07:00
 * 
 * @param   {Date} obrigatorio   Parametro obrigatório
 */
export const convertUtcToLocal = _date => {
    return moment(_date)
      .format()
  };

  /**
 * Conversão de uma data Local para UTC
 * 
 * @example 
 *   exemplo("1971-07-19T17:30:16Z"); // 1971-07-19T20:07:00
 * 
 * @param   {Date} obrigatorio   Parametro obrigatório
 */
export const convertLocalToUtc = _date => {
    return moment(_date)
      .tz("utc")
      .toISOString();
  };