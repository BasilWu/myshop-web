"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
require("dotenv/config");
async function main() {
    const region = process.env.AWS_REGION;
    const bucket = process.env.AWS_S3_BUCKET;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    console.log('[test-s3] env', { region, bucket, accessKeyId: accessKeyId.slice(0, 4) + '****' });
    const s3 = new client_s3_1.S3Client({ region, credentials: { accessKeyId, secretAccessKey } });
    const filePath = path.resolve(process.argv[2] || './test.png');
    const buf = fs.readFileSync(filePath);
    const key = `tests/${Date.now()}-${path.basename(filePath)}`;
    const cmd = new client_s3_1.PutObjectCommand({ Bucket: bucket, Key: key, Body: buf, ContentType: 'image/png' });
    try {
        await s3.send(cmd);
        const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
        console.log('✅ Uploaded:', url);
    }
    catch (e) {
        console.error('❌ Upload failed:', e?.Code || e?.name, e?.message);
    }
}
main();
//# sourceMappingURL=test-s3.js.map