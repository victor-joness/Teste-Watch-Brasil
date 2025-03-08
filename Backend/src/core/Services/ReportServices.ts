import { IReportRepository } from "../Repositories/IRepositores/IReportRepository";
import { Report } from "../Entities/Report";

export class ReportServices {
    constructor(private reportRepository: IReportRepository) {}

    async createReport(reportData: Report): Promise<Report> {
        return await this.reportRepository.create(reportData);
    }

    async getReportById(reportId: number): Promise<Report | null> {
        return await this.reportRepository.getById(reportId);
    }

    async getAllReports(): Promise<Report[]> {
        return await this.reportRepository.getAll();
    }

    async updateReport(reportData: Report): Promise<Report | null> {
        return await this.reportRepository.update(reportData);
    }

    async deleteReport(reportId: number): Promise<boolean> {
        return await this.reportRepository.delete(reportId);
    }
}