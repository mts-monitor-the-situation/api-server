import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { FeedManagementService } from './feed-management.service';
import { SwaggerEndpoint } from 'src/shared-management/utility/swagger-helper';

@Controller('feed-management')
export class FeedManagementController {
     constructor(
        private readonly feedManagementService: FeedManagementService
    ) { }


    @Post('add-feeds')
    @SwaggerEndpoint(
        'Add feeds',
        undefined,
        undefined, // No path parameters needed
    )
    async addFeed(@Body() body: any, @Res() res: any): Promise<any> {
        try {
            const result = await this.feedManagementService.addFeed(body);

            const {
                data,
                result: responseResult,
                body: responseBody,
                status,
            } = result;
            if (data) {
                res.status(status).json({
                    body: responseBody,
                    result: responseResult,
                    isData: data,
                });
            } else {
                throw { message: responseResult, status, data, responseBody };
            }
        } catch (error) {
            const { data, message, responseBody, status } = error;
            res.status(status).json({
                body: responseBody,
                result: message,
                isData: data,
            });
        }
    }

    @Get('fetch-all-feed-items/:page/:pageSize')
    @SwaggerEndpoint(
        'Fetch Feeds',
        [
            { name: 'page', description: 'The page number for pagination' },
            { name: 'pageSize', description: 'The number of items per page' }
        ],
        [
            { name: 'title', description: 'filter with title' },
            { name: 'feedCategories', description: 'filter with feed categories' },
        ],
        undefined
    )

    async fetchAllFeedItems(
        @Param('page') page: number,
        @Param('pageSize') pageSize: number,
        @Query('title') title: string,
        @Query('feedCategories') feedCategories: string,
        @Res() res: any
    ): Promise<any> {
        try {
            const result = await this.feedManagementService.fetchAllFeedItems(
                page,
                pageSize,
                title,
                feedCategories,
            );
            const {
                data,
                result: responseResult,
                body: responseBody,
                currentPage,
                totalPages,
                totalRecords,
                status,
            } = result;
            if (data) {
                res.status(status).json({
                    body: responseBody,
                    result: responseResult,
                    isData: data,
                    currentPage,
                    totalPages,
                    totalRecords,
                });
            } else {
                throw { message: responseResult, status, data, responseBody };
            }
        } catch (error) {
            const { data, message, responseBody, status } = error;
            res.status(status).json({
                body: responseBody,
                result: message,
                isData: data,
            });
        }
    }
} 

