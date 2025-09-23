import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

async function main() {
  const region = process.env.AWS_REGION!;
  const bucket = process.env.AWS_S3_BUCKET!;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;
  console.log('[test-s3] env', { region, bucket, accessKeyId: accessKeyId.slice(0, 4) + '****' });

  const s3 = new S3Client({ region, credentials: { accessKeyId, secretAccessKey } });

  const filePath = path.resolve(process.argv[2] || './test.png');
  const buf = fs.readFileSync(filePath);

  const key = `tests/${Date.now()}-${path.basename(filePath)}`;
  const cmd = new PutObjectCommand({ Bucket: bucket, Key: key, Body: buf, ContentType: 'image/png' });

  try {
    await s3.send(cmd);
    const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
    console.log('✅ Uploaded:', url);
  } catch (e: any) {
    console.error('❌ Upload failed:', e?.Code || e?.name, e?.message);
  }
}

main();