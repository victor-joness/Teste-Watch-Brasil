import { Request, Response } from "express";
import { ReportServices } from "../../core/Services/ReportServices";
import { Report } from "../../core/Entities/Report";
import { sendResponse } from "../../Shared/Utils/ResponseTemplate";

export class ReportController {
  constructor(private reportServices: ReportServices) {}

  async getAllReports(req: Request, res: Response) {
    try {
      const reports = await this.reportServices.getAllReports();
      sendResponse(
        res,
        "success",
        200,
        "Reports retrieved successfully",
        reports
      );
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }

  async getReportById(req: Request, res: Response) {
    try {
        const reportId = parseInt(req.params.id);
        const report = await this.reportServices.getReportById(reportId);
        sendResponse(res, "success", 200, "Report retrieved successfully", report);
    } catch (error: any) {
        sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }

  async createReport(req: Request, res: Response) {
    try {
      const reportData: Report = req.body;
      const newReport = await this.reportServices.createReport(reportData);
      sendResponse(
        res,
        "success",
        201,
        "Report created successfully",
        newReport
      );
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }

  async updateReport(req: Request, res: Response) {
    try {
      const reportId = parseInt(req.params.id);
      const reportData: Report = req.body;
      reportData.Id = reportId;

      const updatedReport = await this.reportServices.updateReport(reportData);
      sendResponse(
        res,
        "success",
        200,
        "Report updated successfully",
        updatedReport
      );
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }

  async deleteReport(req: Request, res: Response) {
    try {
      const reportId = parseInt(req.params.id);
      await this.reportServices.deleteReport(reportId);
      sendResponse(res, "success", 200, "Report deleted successfully", null);
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }
}
