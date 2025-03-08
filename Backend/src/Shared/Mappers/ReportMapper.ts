import { Report } from "../../core/Entities/Report";
export class ReportMapper {
  public static fromReportToDB(report: Report): Report {
    return report;
  }

  public static fromDBtoReport(report: any): Report {
    return new Report(
      report.Id,
      report.Title,
      report.Content,
      report.AuthorId,
      report.TaskIds,
      report.DeletionDate,
      report.ModifiedDate,
      report.CreationDate
    );
  }
}
