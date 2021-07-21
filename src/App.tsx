import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import {SpamReport} from './types/SpamReport';
import {ReportIssue} from './components/ReportIssue';
import useReportIssueService from './hooks/getReportsHook';
import {Service} from './types/Service';

const App = () => {
  const [reportedIssues, setReportedIssues] = useState<SpamReport[]>([]);

  const service: Service<SpamReport[]> = useReportIssueService();

  useEffect(() => {
    service.status === 'loaded' ? setReportedIssues(service.payload) : [];
  }, [service]);

  const resolveIssue = (index: number): void => {
    const updatedReportedIssues: SpamReport[] = [...reportedIssues];
    updatedReportedIssues.splice(index, 1);
    setReportedIssues(updatedReportedIssues);
  };

  const blockIssue = (index: number): void => {
    const updatedReportedIssues: SpamReport[] = [...reportedIssues];
    updatedReportedIssues[index].resolved =
      !updatedReportedIssues[index].resolved;
    setReportedIssues(updatedReportedIssues);
  };

  const ItemSeparator = () => <View style={styles.itemSeparator} />;

  return (
    <SafeAreaView>
      <StatusBar />

      <View style={styles.container}>
        <Text style={styles.title}>Current Reported Issues:</Text>
        {service.status === 'loading' && <Text>Loading...</Text>}

        <FlatList
          ItemSeparatorComponent={ItemSeparator}
          data={reportedIssues}
          renderItem={({item, index}) => (
            <ReportIssue
              reportedIssue={item}
              index={index}
              onToggleResolved={resolveIssue}
              onToggleBlocked={blockIssue}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
  },
  reportItemContainer: {
    marginTop: 15,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    height: 80,
    width: '100%',
  },
  itemSeparator: {
    height: 2,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  buttonResolve: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
  },
  buttonBlocked: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
  },
  buttonBlock: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
  issueTextBold: {
    fontWeight: '800',
  },
  title: {
    fontSize: 20,
    marginBottom: 40,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: 'purple',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    marginBottom: 10,
  },
  task: {
    width: 200,
  },
  reportContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  reportTextContainer: {
    backgroundColor: 'lightgrey',
    padding: 20,
    width: '100%',
  },
});

export default App;
