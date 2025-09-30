import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'feed_items',
})
export class FeedItemModel extends Document {
  @Prop({ type: String })
  source: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  link: string;

  @Prop({ type: String })
  pubDate: string;

  @Prop({ type: [String], default: [] })
  categories: string[];

  @Prop({ type: Boolean, default: false })
  geoLocated: boolean;

  @Prop({
    type: [
      {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        placeId: { type: String, required: true },
      },
    ],
    default: [],
  })
  locations: {
    latitude: number;
    longitude: number;
    placeId: string;
  }[];
}

const FeedItemManagementModel = SchemaFactory.createForClass(FeedItemModel);
const FeedItemModelSchemaName = 'feed_items';

export { FeedItemManagementModel, FeedItemModelSchemaName };
