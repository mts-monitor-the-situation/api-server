import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiBody, ApiQuery, ApiConsumes } from '@nestjs/swagger';

/**
 * A helper function for generating Swagger decorators in controllers.
 * @param operationDescription - A brief description of the endpoint's purpose.
 * @param paramOptions - An array of parameters for URL path variables.
 * @param queryOptions - An array of parameters for query strings.
 * @param requestBodyDtos - The array of possible DTOs for the request body.
 * @param consumesType - The content type (like 'multipart/form-data')
 */
export function SwaggerEndpoint(
  operationDescription: string,
  paramOptions?: { name: string, description: string, required?: boolean }[],
  queryOptions?: { name: string, description: string, required?: boolean }[],
  requestBodyDto?: any,
  consumesType?: string,
  
) {
  const decorators = [
    ApiOperation({ summary: operationDescription })
  ];

  // Add `@ApiParam` decorators for each specified parameter option
  if (paramOptions) {
    paramOptions.forEach(param => {
      decorators.push(ApiParam({ ...param, required: true }));
    });
  }
  
  // Add `@ApiQuery` decorators for each specified query option
  if (queryOptions) {
    queryOptions.forEach(query => {
      decorators.push(ApiQuery({ ...query, required: false }));
    });
  }

   // Add `@ApiConsumes`
   if (consumesType) {
    decorators.push(ApiConsumes(consumesType));
  }

  // Add `@ApiBody` decorator for the request body, if applicable
  if (requestBodyDto) {
    decorators.push(ApiBody({ type: requestBodyDto }));
  }

  return applyDecorators(...decorators);
}
