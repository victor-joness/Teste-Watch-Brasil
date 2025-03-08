import { reportsTable } from "../../Infrastructure/database/schemas/reportsTable";
import { ReportMapper } from "../../Shared/Mappers/ReportMapper";
import { Report } from "../Entities/Report";
import { BaseRepository } from "./BaseRepository";
import { IReportRepository } from "./IRepositores/IReportRepository";

export class ReportRepository
  extends BaseRepository<Report>
  implements IReportRepository
{
  constructor() {
    super(reportsTable, {
      fromEntityToDB: ReportMapper.fromReportToDB,
      fromDBToEntity: ReportMapper.fromDBtoReport,
    });

    this.table = reportsTable;
    this.mapper = {
      fromEntityToDB: ReportMapper.fromReportToDB,
      fromDBToEntity: ReportMapper.fromDBtoReport,
    };
  }
}