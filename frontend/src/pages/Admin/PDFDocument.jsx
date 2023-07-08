import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  table: {
    display: 'table',
    width: 'auto',
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 8,
    flexGrow: 1,
  },
});

const PDFDocument = ({ filteredDetails }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Revenue Report</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text>Movie</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>Theater</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>Date</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>Revenue</Text>
          </View>
        </View>
        {filteredDetails.map(([key, revenue]) => {
          const [movie, theater, year, month, day] = key.split('-');
          const formattedDate = `${day}-${month}-${year}`;

          return (
            <View style={styles.tableRow} key={key}>
              <View style={styles.tableCell}>
                <Text>{movie}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{theater}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{formattedDate}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{revenue}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
