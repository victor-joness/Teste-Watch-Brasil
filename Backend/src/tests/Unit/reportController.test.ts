import { ReportController } from "../../Interface/Controllers/ReportController";
import { Report } from "../../core/Entities/Report";
import { IReportRepository } from "../../core/Repositories/IRepositores/IReportRepository";
import { ReportServices } from "../../core/Services/ReportServices";
import { beforeEach, describe, expect, test } from "@jest/globals";
import { Request, Response } from "express";

jest.mock("../../core/Services/ReportServices.ts");

describe("ReportController", () => {
  let reportController: ReportController;
  let reportServiceMock: jest.Mocked<ReportServices>;

  beforeEach(() => {
    const reportRepositoryMock = {} as jest.Mocked<IReportRepository>;
    reportServiceMock = new ReportServices(
      reportRepositoryMock
    ) as jest.Mocked<ReportServices>;
    reportController = new ReportController(reportServiceMock);
  });

  test("deve retornar todos os relatórios", async () => {
    const reports = [
      new Report(
        1,
        "Relatório de desempenho",
        "Descrição do relatório 2",
        1,
        [],
        new Date().toISOString(),
        null,
        null
      ),
      new Report(
        2,
        "Relatório de desempenho",
        "Descrição do relatório 2",
        1,
        [],
        new Date().toISOString(),
        null,
        null
      ),
    ];

    reportServiceMock.getAllReports = jest.fn().mockResolvedValue(reports);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await reportController.getAllReports(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Reports retrieved successfully",
      data: reports,
    });
  });
});
