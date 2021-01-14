import React from 'react';
import { Result } from '@zxing/library';
declare const BarcodeScannerComponent: ({ width, height, onUpdate }: {
    width: number;
    height: number;
    onUpdate: (arg0: unknown, arg1?: Result) => void;
}) => React.ReactElement;
export default BarcodeScannerComponent;
