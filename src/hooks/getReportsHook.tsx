import {useEffect, useState} from 'react';
import {Service} from '../types/Service';
import {SpamReport} from '../types/SpamReport';
import reportedIssuesData from '../../data/reports.json';

export interface SpamReports {
  results: SpamReport[];
}

const useReportIssueService = () => {
  const [result, setResult] = useState<Service<SpamReport[]>>({
    status: 'loading',
  });

  useEffect(() => {
    loadReportData()
      .then(spamReport => {
        setResult({
          status: 'loaded',
          payload: spamReport,
        });
      })
      .catch(error => setResult({status: 'error', error}));
  }, []);

  const loadReportData = (): Promise<SpamReport[]> => {
    const reportDataResponse = new Promise(resolve => {
      const reportData = JSON.parse(
        JSON.stringify(reportedIssuesData.elements),
      );
      reportData.forEach((element: SpamReport) => {
        element.blocked = false;
        element.resolved = false;
      });

      resolve(reportData);
    });

    return reportDataResponse;
  };

  return result;
};

export default useReportIssueService;
