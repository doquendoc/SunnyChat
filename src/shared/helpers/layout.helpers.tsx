import * as React from 'react';

export const itemLayout = (labelCol?: number[], wrapperCol?: number[]) => {
  return {
    labelCol: {
      xl: { span: labelCol ? labelCol[0] : 7 },
      lg: { span: labelCol ? labelCol[1] : 24 },
      md: { span: labelCol ? labelCol[2] : 24 },
      sm: { span: labelCol ? labelCol[3] : 24 },
      xs: { span: labelCol ? labelCol[4] : 24 },
    },
    wrapperCol: {
      xl: { span: wrapperCol ? wrapperCol[0] : 17 },
      lg: { span: wrapperCol ? wrapperCol[1] : 23 },
      md: { span: wrapperCol ? wrapperCol[2] : 24 },
      sm: { span: wrapperCol ? wrapperCol[3] : 24 },
      xs: { span: wrapperCol ? wrapperCol[4] : 24 },
    },
  };
};
export const itl = itemLayout;

export const colLayout = (span?: number[] | any) => {
  const isNumber = typeof span === 'number';
  return !isNumber || !span
    ? {
        xl: span ? span[0] : 7,
        lg: span && span[1] ? span[1] : 12,
        md: span && span[2] ? span[2] : 24,
        sm: span && span[3] ? span[3] : 24,
        xs: span && span[4] ? span[4] : 24,
      }
    : {
        span: 12,
      };
};
export const cl = colLayout;
