import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {StackScreenProps} from '../navigation';
import {NavigationState} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import colors from '../constants/colors';
import RenderFolderFile from '../components/RenderFolderFile';

const Home = ({route, navigation}: StackScreenProps<'Home'>) => {
  const scrollRef = useRef<ScrollView>(null);
  const [StorageData, setStorageData] = useState<RNFS.ReadDirItem[]>([]);

  const ReadStorage = async () => {
    try {
      const data = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath);
      if (Array.isArray(data)) {
        setStorageData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ReadStorage();
    scrollRef.current?.scrollToEnd({animated: false});
    if (route.params?.name) navigation.setOptions({title: route.params?.name});
  }, [navigation, route.params?.name]);

  const Name = useMemo(() => Math.ceil(Math.random() * 10000), []);

  const NavigationData = useMemo(
    () => navigation.getState(),
    [route, navigation],
  );

  const gotoNewScreen = useCallback(() => {
    navigation.push('Home', {name: Name.toString()});
  }, [Name]);

  const navigateToSpecific = useCallback(
    (item: NavigationState['routes'][0]) => {
      const targetIndex = NavigationData.routes.findIndex(
        route => route.key === item.key,
      );

      if (targetIndex !== -1 && targetIndex < NavigationData.index) {
        navigation.pop(NavigationData.index - targetIndex);
      }
    },
    [NavigationData],
  );

  const renderItem = useCallback(({item}: {item: RNFS.ReadDirItem}) => {
    return <RenderFolderFile data={item} />;
  }, []);

  return (
    <View style={styles.Home}>
      {/* <View>
        <ScrollView horizontal ref={scrollRef}>
          {NavigationData.routes.map((item, index) => (
            <Text
              key={index.toString()}
              style={styles.text}
              onPress={navigateToSpecific.bind(null, item)}>
              {item?.params?.name ? item.params?.name : route.name}
              {'>'}
            </Text>
          ))}
        </ScrollView>
      </View> */}
      <FlatList
        data={StorageData}
        renderItem={renderItem}
        keyExtractor={(_, idx) => `${idx}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Home: {flex: 1, backgroundColor: colors.bg_primary},
  press: {alignSelf: 'center', marginTop: 100},
  text: {marginRight: 10, color: colors.text_primary},
});

export default Home;
