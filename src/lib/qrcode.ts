
import { QRCodeCanvas } from 'qrcode.react';

export const generateQRCode = (data: string, size = 128): JSX.Element => {
  return (
    <QRCodeCanvas
      value={data}
      size={size}
      bgColor={"#ffffff"}
      fgColor={"#000000"}
      level={"H"}
      includeMargin={false}
    />
  );
};
