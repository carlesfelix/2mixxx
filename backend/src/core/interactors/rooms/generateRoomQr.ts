import PDFDocument from 'pdfkit';
import { Writable } from 'stream';
import QRCode from 'qrcode';
import environment from '../../../environment';

type GenerateRoomQrProps = {
  roomCode: string;
  stream: Writable;
  docHeader: string;
};
const generateRoomQr = async (
  props: GenerateRoomQrProps
): Promise<void> => {
  const { roomCode, stream, docHeader } = props;
  const doc = new PDFDocument({
    size: 'A4',
    info: {
      Title: `Room QR (${roomCode})`
    }
  });
  doc.pipe(stream);
  try {
    doc.fontSize(40);
    doc.font('Helvetica-Bold');
    const contentWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    doc.text(docHeader, {
      align: 'center',
      width: contentWidth
    });
    doc.moveDown();
    const qrImage = await QRCode.toDataURL(
      `${environment.WEB_ORIGIN}/?roomCode=${roomCode}`,
      { width: 300, margin: 0, scale: 1 }
    );
    doc.image(qrImage,
      undefined,
      300,
      {
        align: 'center',
        valign: 'center',
        fit: [ contentWidth, 300 ]
      }
    );
    doc.save();
    doc.end();
  } catch {
    doc.end();
  }
};

export default generateRoomQr;
