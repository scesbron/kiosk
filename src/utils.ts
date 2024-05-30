import { format, parse } from 'date-fns';

export const onlyUnique = <T>(value: T, index: number, array: T[]) => array.indexOf(value) === index;

export const parseApiDate = (dateStr: string) => parse(dateStr, 'yyyy-MM-dd', new Date());
export const formatApiDate = (date: Date) => format(date, 'yyyy-MM-dd');

export const formatDate = (date: Date) => format(date, 'dd/MM/yyyy');
export const formatMonth = (date: Date) => format(date, 'yyyy-MM');
export const formatYear = (date: Date) => format(date, 'yyyy');
