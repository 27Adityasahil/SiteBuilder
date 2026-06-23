import mongoose from 'mongoose';
declare const Asset: mongoose.Model<{
    type: string;
    user: mongoose.Types.ObjectId;
    url: string;
    public_id?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    type: string;
    user: mongoose.Types.ObjectId;
    url: string;
    public_id?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    type: string;
    user: mongoose.Types.ObjectId;
    url: string;
    public_id?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    type: string;
    user: mongoose.Types.ObjectId;
    url: string;
    public_id?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    type: string;
    user: mongoose.Types.ObjectId;
    url: string;
    public_id?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    type: string;
    user: mongoose.Types.ObjectId;
    url: string;
    public_id?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    type: string;
    user: mongoose.Types.ObjectId;
    url: string;
    public_id?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    type: string;
    user: mongoose.Types.ObjectId;
    url: string;
    public_id?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default Asset;
//# sourceMappingURL=Asset.d.ts.map