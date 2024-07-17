import createHttpError from 'http-errors';
import ApiResponse from '../common/ApiResponse.js';
import logger from '../common/logger.js';
import * as SampleService from './sample.service';
import CreateSampleSchema from './schema/create-sample.schema.js';
import UpdateSampleSchema from './schema/update-sample.schema.js';
import type { Request, Response, NextFunction } from 'express';

// Controller functions to handle incoming requests and interact with the service

async function createSample(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<unknown> {
  try {
    const sampleData = req.body;
    const { error } = CreateSampleSchema.validate(sampleData);
    if (error) {
      logger.error(error.message);
      return next(createHttpError(400, error.message));
    }
    const id = await SampleService.createSample(sampleData);
    res.status(201).json(
      new ApiResponse({
        statusCode: 201,
        success: true,
        message: `Sample created successfully with ID: ${id}`,
        data: await SampleService.getSampleById(id.toString()),
        errors: [],
      }),
    );
  } catch (error) {
    logger.error('[SampleController] Error creating sample');
    res.status(500).json(
      new ApiResponse({
        statusCode: 500,
        success: false,
        message: 'Error creating sample',
        data: null,
        errors: error,
      }),
    );
  }
}

async function getAllSamples(req: Request, res: Response) {
  // Assuming no request body needed
  try {
    const samples = await SampleService.getAllSamples();
    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        success: true,
        message: 'All samples retrieved',
        data: samples,
        errors: [],
      }),
    );
  } catch (error) {
    logger.error('[SampleController] Error getting samples');
    res.status(500).json(
      new ApiResponse({
        statusCode: 500,
        success: false,
        message: 'Error getting samples',
        data: null,
        errors: error,
      }),
    );
  }
}

async function getSampleById(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const sample = await SampleService.getSampleById(id);
    if (!sample) {
      return res.status(404).json(
        new ApiResponse({
          statusCode: 404,
          success: false,
          message: `Sample with id ${id} not found`,
          data: null,
          errors: [],
        }),
      );
    }
    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        success: true,
        message: `Sample with id ${id} retrieved`,
        data: sample,
        errors: [],
      }),
    );
  } catch (error) {
    res.status(500).json(
      new ApiResponse({
        statusCode: 500,
        success: false,
        message: 'Error getting sample',
        data: null,
        errors: error,
      }),
    );
  }
}

async function updateSample(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const updatedData = req.body;
  const { error } = UpdateSampleSchema.validate(updatedData);
  if (error) {
    logger.error(error.message);
    return next(createHttpError(400, error.message));
  }
  try {
    const updateResult = await SampleService.updateSample(id, updatedData);

    if (updateResult.modifiedCount === 0) {
      return res.status(404).json(
        new ApiResponse({
          statusCode: 404,
          success: false,
          message: `Sample with id ${id} not found`,
          data: null,
          errors: [],
        }),
      );
    }

    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        success: true,
        message: `Sample with id ${id} updated successfully`,
        data: updateResult.sample,
        errors: [],
      }),
    );
  } catch (error) {
    res.status(500).json(
      new ApiResponse({
        statusCode: 500,
        success: false,
        message: 'Error updating sample',
        data: null,
        errors: error,
      }),
    );
  }
}

async function deleteSample(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const deleteResult = await SampleService.deleteSample(id);
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json(
        new ApiResponse({
          statusCode: 404,
          success: false,
          message: 'Sample not found',
          data: null,
          errors: [],
        }),
      );
    }
    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        success: true,
        message: 'Sample deleted successfully',
        data: null, // No need to return the deleted sample
        errors: [],
      }),
    );
  } catch (error) {
    res.status(500).json(
      new ApiResponse({
        statusCode: 500,
        success: false,
        message: 'Error deleting sample',
        data: null,
        errors: error,
      }),
    );
  }
}

export {
  createSample,
  getAllSamples,
  getSampleById,
  updateSample,
  deleteSample,
};
