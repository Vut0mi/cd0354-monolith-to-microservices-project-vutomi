import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from './config/config';

// ✅ Create S3 client with direct credentials from environment variables
export const s3Client = new S3Client({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
});

// ✅ Generate a signed URL for GET (download)
export async function getGetSignedUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: config.aws.mediaBucket,
    Key: key
  });

  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 60 * 5 // 5 minutes
  });

  return signedUrl;
}

// ✅ Generate a signed URL for PUT (upload)
export async function getPutSignedUrl(key: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: config.aws.mediaBucket,
    Key: key
  });

  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 60 * 5 // 5 minutes
  });

  return signedUrl;
}

