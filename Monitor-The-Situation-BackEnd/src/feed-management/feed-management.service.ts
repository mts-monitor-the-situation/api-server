import { HttpStatus, Injectable } from '@nestjs/common';
import mongoose, { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FeedItemModelSchemaName } from 'src/model-management/feed-mangementmodel';
import { CustomError } from 'src/shared-management/utility/status-code';

@Injectable()
export class FeedManagementService {

    constructor(
         @InjectModel(FeedItemModelSchemaName)
        private readonly FeedItemManagementModel: Model<any>,
    ) { }

    async addFeed(body: any): Promise<any> {
        try {
            const feedItem = new this.FeedItemManagementModel(body);
            await feedItem.save();

            return {
                result: 'Feed added successfully',
                data: true,
                body: feedItem,
                status: HttpStatus.CREATED,
            };
        } catch (error) {
            return {
                result: error.message,
                data: false,
                body: null,
                status:
                    error instanceof CustomError
                        ? error.statusCode
                        : HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async fetchAllFeedItems(
        page: any,
        pageSize: any,
        title: string,
        feedCategories: string,
    ): Promise<any> {
        try {

            console.log(page, pageSize);

            if ((title || feedCategories) && page >= 2) {
                page = 1;
            }

            let baseFilter: any = {};

            if (title) {
                baseFilter.title = { $regex: new RegExp(title, 'i') };
            }
            if (feedCategories) {
                baseFilter['feedCategories.name'] = { $regex: new RegExp(feedCategories, 'i') };
            }

            const skip = (page - 1) * pageSize;
            const limit = pageSize;

            // const sortOrder = sortBy === 'oldest' ? 1 : -1;

            const feeds = await this.FeedItemManagementModel.find(baseFilter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean();


            const totalRecords = await this.FeedItemManagementModel.countDocuments(baseFilter);

            return {
                result: 'Feeds fetched successfully',
                data: true,
                body: feeds,
                currentPage: page,
                totalPages: Math.ceil(totalRecords / pageSize),
                totalRecords,
                status: HttpStatus.OK,
            };

        } catch (error) {
            return {
                result: error.message,
                data: false,
                body: null,
                status:
                    error instanceof CustomError
                        ? error.statusCode
                        : HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }


        async fetchAllFeedLocation(
    ): Promise<any> {
        try {

            const feedsLocation = await this.FeedItemManagementModel.find().select('locations  -_id')
                .lean();

            return {
                result: 'Feeds Location fetched successfully',
                data: true,
                body: feedsLocation,
                status: HttpStatus.OK,
            };

        } catch (error) {
            return {
                result: error.message,
                data: false,
                body: null,
                status:
                    error instanceof CustomError
                        ? error.statusCode
                        : HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    async fetchFeedLocationWithCoordinate(
        latitude: any,
        longitude: any,
    ): Promise<any> {
        try {

            const feedsLocation = await this.FeedItemManagementModel.find().lean();



            return {
                result: 'Feeds Location fetched successfully',
                data: true,
                body: feedsLocation,
                status: HttpStatus.OK,
            };

        } catch (error) {
            return {
                result: error.message,
                data: false,
                body: null,
                status:
                    error instanceof CustomError
                        ? error.statusCode
                        : HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
}
