export const phoneRawValue = value => value.replace(/[\()\-\s]/g, '');
export const dateRawValue = value => value.replace(/\//g, '');
export const cpfRawValue = value => value.replace(/[\.\()\-\s]/g, '');
export const phoneWithoutRegionCode = value => phoneRawValue(value).replace(/(\d{2})/, '');
