import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import type { Express } from 'express';

@Injectable()
export class S3Service {
  private readonly s3: S3Client;
  private readonly region: string;
  private readonly bucket: string;

  constructor(private readonly config: ConfigService) {
    this.region = this.config.get<string>('AWS_REGION')!;
    this.bucket = this.config.get<string>('AWS_S3_BUCKET')!;
    const accessKeyId = this.config.get<string>('AWS_ACCESS_KEY_ID')!;
    const secretAccessKey = this.config.get<string>('AWS_SECRET_ACCESS_KEY')!;

    // Debug: 確認 env 讀取狀況
    console.log('[S3Service] init', {
      region: this.region,
      bucket: this.bucket,
      accessKeyId: accessKeyId?.slice(0, 4) + '****',
      secretAccessKey: secretAccessKey ? '***set***' : 'MISSING',
    });

    this.s3 = new S3Client({
      region: this.region,
      credentials: { accessKeyId, secretAccessKey },
    });
  }

  async uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new InternalServerErrorException('No file received');
    }

    const key = `uploads/${Date.now()}-${file.originalname}`;
    console.log('[S3Service] uploading', {
      key,
      mimetype: file.mimetype,
      size: file.size,
    });

    try {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype
        }),
      );

      const url = `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
      console.log('[S3Service] uploaded OK ->', url);

      return { url, key, bucket: this.bucket };
    } catch (err: any) {
      console.error('[S3Service] upload error', err?.Code || err?.name, err?.message);
      throw new InternalServerErrorException(
        'S3 upload failed: ' + (err?.message || 'unknown'),
      );
    }
  }
}