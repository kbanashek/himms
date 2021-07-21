import React from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import {styles} from '../App';
import {SpamReport} from '../types/SpamReport';
import {format} from 'date-fns';

export interface ReportIssueProps {
  reportedIssue: SpamReport;
  index: number;
  onToggleResolved: (index: number) => void;
  onToggleBlocked: (index: number) => void;
}

export const ReportIssue: React.FC<ReportIssueProps> = ({
  reportedIssue,
  index,
  onToggleResolved,
  onToggleBlocked,
}) => {
  return (
    <View style={[styles.container, styles.reportContainer]}>
      <View style={[styles.reportTextContainer]}>
        <Text>Issue Number: {index}</Text>
        <Text>Type: {reportedIssue.payload.reportType}</Text>
        <Text>Source: {reportedIssue.payload.source}</Text>
        <Text>State: {reportedIssue.state}</Text>
        <Text>
          Created:{' '}
          {format(new Date(reportedIssue.created), 'MMMM d, yyyy H:mma')}
        </Text>
        {reportedIssue.payload.message && (
          <Text>Message: {reportedIssue.payload.message}</Text>
        )}
      </View>
      <View style={[styles.reportItemContainer]}>
        <TouchableOpacity
          style={
            reportedIssue.resolved ? styles.buttonBlock : styles.buttonBlocked
          }
          onPress={() => {
            onToggleBlocked(index);
          }}>
          <Text>{reportedIssue.resolved ? 'Blocked' : 'Block'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonResolve}
          onPress={() => {
            onToggleResolved(index);
          }}>
          <Text>Resolve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
