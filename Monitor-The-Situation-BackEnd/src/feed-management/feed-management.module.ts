import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedItemManagementModel, FeedItemModelSchemaName } from 'src/model-management/feed-mangementmodel';
import { FeedManagementController } from './feed-management.controller';
import { FeedManagementService } from './feed-management.service';

@Module({
    imports: [
        MongooseModule.forFeature( 
            [
              { 
                name: FeedItemModelSchemaName, 
                schema: FeedItemManagementModel 
              },
            ]
          ),
      ],
    controllers: [FeedManagementController],
    providers: [FeedManagementService],
})
export class FeedManagementModule {}
