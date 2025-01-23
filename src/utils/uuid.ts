import { v1 } from "uuid";

export function generateUuid(): Buffer {
  const uuid = v1();
  const uuidBuffer = Buffer.alloc(16);
  for (let i = 0; i < 16; i++) {
    uuidBuffer[i] = parseInt(uuid.substring(i * 2, i * 2 + 2), 16);
  }
  return uuidBuffer;
}

export function generateUuidStr(): string {
  return uuidStringify(generateUuid());
}

export function uuidStringify(uuid: Buffer): string {
  let str = '';
  for (let i = 0; i < uuid.length; i++) {
    let hex = uuid[i].toString(16);
    if (hex.length === 1) {
      hex = '0' + hex;
    }
    str += hex;
  }
  // 格式化为 UUID 字符串
  return `${str.substring(0, 8)}-${str.substring(8, 12)}-${str.substring(12, 16)}-${str.substring(16, 20)}-${str.substring(20)}`;
}

export function uuidParse(uuid: string): Buffer {
  const sanitizedUuid = uuid.replace(/-/g, '');
  const uuidBuffer = Buffer.alloc(16);
  for (let i = 0; i < 16; i++) {
    uuidBuffer[i] = parseInt(sanitizedUuid.substring(i * 2, i * 2 + 2), 16);
  }
  return uuidBuffer;
}
