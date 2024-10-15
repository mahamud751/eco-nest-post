import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        // Default error response
        let status = 500;
        let message = 'Internal server error';

        // If it's an HttpException, use the provided status and message
        if (exception instanceof HttpException) {
            status = exception.getStatus();

            // Handle the case where getResponse() returns an object or string
            const errorResponse = exception.getResponse();
            if (typeof errorResponse === 'string') {
                message = errorResponse;
            } else if (typeof errorResponse === 'object' && errorResponse !== null) {
                // You can format the object into a string or handle it differently
                message = (errorResponse as any).message || JSON.stringify(errorResponse);
            }
        } else {
            console.error('Unhandled exception:', exception); // Log unhandled exceptions
        }

        // Send the formatted error response
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
        });
    }
}
