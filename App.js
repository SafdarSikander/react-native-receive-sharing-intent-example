import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, SafeAreaView} from 'react-native';
import useAppState from 'react-native-appstate-hook';

import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

const App = () => {
  const [files, setFiles] = useState([]);
  const {appState} = useAppState({
    onChange: (newAppState) =>
      console.warn('App state changed to ', newAppState),
    onForeground: () => console.warn('App went to Foreground'),
    onBackground: () => console.warn('App went to background'),
  });

  useEffect(() => {
    ReceiveSharingIntent.getReceivedFiles(
      (files) => {
        setFiles(files);
        console.log(files);
      },
      (error) => {
        console.log(error);
      },
      [appState],
    );

    return () => {
      ReceiveSharingIntent.clearReceivedFiles();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 28, fontWeight: 'bold'}}> Shared Files</Text>
      <FlatList
        data={files}
        renderItem={({item}) => (
          <Text style={styles.item}>
            {item.fileName ? item.fileName : item.weblink}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default App;
