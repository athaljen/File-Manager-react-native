'use strict;';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ReadDirItem} from 'react-native-fs';
import colors from '../constants/colors';
import moment from 'moment';

type Props = {
  data: ReadDirItem;
};

const RenderFolderFile = memo(({data}: Props) => {
  return (
    <View style={styles.RenderFolderFile}>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.name}>
        {moment(data.mtime?.getTime()).format('DD MMM YYYY')}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  RenderFolderFile: {flex: 1, marginVertical: 10},
  name: {color: colors.text_primary, fontWeight: '600'},
});

export default RenderFolderFile;
