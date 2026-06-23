import mongoose from 'mongoose';
declare const Project: mongoose.Model<{
    title: string;
    owner: mongoose.Types.ObjectId;
    defaultPageId: string;
    pages: any[];
    thumbnail: string;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    title: string;
    owner: mongoose.Types.ObjectId;
    defaultPageId: string;
    pages: any[];
    thumbnail: string;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    title: string;
    owner: mongoose.Types.ObjectId;
    defaultPageId: string;
    pages: any[];
    thumbnail: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    title: string;
    owner: mongoose.Types.ObjectId;
    defaultPageId: string;
    pages: any[];
    thumbnail: string;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    title: string;
    owner: mongoose.Types.ObjectId;
    defaultPageId: string;
    pages: any[];
    thumbnail: string;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    title: string;
    owner: mongoose.Types.ObjectId;
    defaultPageId: string;
    pages: any[];
    thumbnail: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    title: string;
    owner: mongoose.Types.ObjectId;
    defaultPageId: string;
    pages: any[];
    thumbnail: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    title: string;
    owner: mongoose.Types.ObjectId;
    defaultPageId: string;
    pages: any[];
    thumbnail: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default Project;
//# sourceMappingURL=Project.d.ts.map