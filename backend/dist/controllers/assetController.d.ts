import { Request, Response } from 'express';
import multer from 'multer';
export declare const upload: multer.Multer;
export declare const uploadAsset: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAssets: (req: Request, res: Response) => Promise<void>;
export declare const deleteAsset: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=assetController.d.ts.map