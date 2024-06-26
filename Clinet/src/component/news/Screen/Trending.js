import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getNews} from '../NewsHTTP';

const Trending = props => {
  const {navigation} = props;
  const [isLoading, setisLoading] = useState(false);
  const [news, setNews] = useState([]);
  const clickNe = () => {
    navigation.navigate('NewDetail');
  };
  // useeffect la gi?
  // hooks để gọi API lấy data
  // chạy ngay sau khi màn hình render
  // 1. chạy ngay sau khi màn hình render
  // và khi có state thay đổi
  useEffect(() => {
    // lấy tin
    const fetchData = async () => {
      try {
        const response = await getNews();
        setNews(response);

        console.log(response);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    fetchData();
  }, []);

  const renderItem = ({item}) => {
    const {_id, name, price, quantity, description, image} = item;
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Detail', {newsId: _id});
          }}>
          <View style={styles.container_title}>
            <Image style={styles.img} source={{uri: image}} />
            <View style={styles.container_title_content}>
              <Text style={styles.txt_title_bbc2}>Name: {name}</Text>
              <Text style={styles.txt_title}>Price: {price} $</Text>
              <View style={styles.container_title_content2}>
                <View style={styles.container_title_content3}>
                  <View style={styles.container_title_content4}>
                    <Image
                      style={styles.ic_title}
                      source={require('../../../media/ic_bbc.png')}
                    />
                    <Text style={styles.txt_title_bbc}>BBC News</Text>
                  </View>
                  <View style={styles.container_title_content4}>
                    <Image
                      style={styles.ic_title}
                      source={require('../../../media/ic_clock.png')}
                    />
                    <Text
                      style={[
                        styles.txt_title_bbc2,
                        styles.txt_title_trending2,
                      ]}>
                      4h ago
                    </Text>
                  </View>
                </View>

                <View>
                  <Image
                    style={styles.ic_title}
                    source={require('../../../media/....png')}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.conatiner}>
      <View style={styles.conatiner_trending}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
          <Image
            style={styles.ic}
            source={require('../../../media/ic_back.png')}
          />
        </TouchableOpacity>

        <Text style={styles.txt_trending}>Trending</Text>
        <Image
          style={styles.ic}
          source={require('../../../media/ic_outline.png')}
        />
      </View>

      {isLoading == true ? (
        <View style={styles.container_isloading}>
          <ActivityIndicator size="large" color="#fff00" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false} // thanh cuộn
          showsVerticalScrollIndicator={false} // thanh cuộn
          data={news}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      )}
    </View>
  );
};

export default Trending;

const styles = StyleSheet.create({
  container_isloading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt_title: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#000',
  },
  txt_title_bbc2: {
    fontWeight: '400',
  },
  txt_title_bbc: {
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 19.5,
    letterSpacing: 0.12,
    color: '#4E4B66',
  },
  container_title_content4: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    flexDirection: 'row',
  },
  container_title_content3: {
    alignItems: 'flex-start',
    gap: 12,
    flexDirection: 'row',
    marginTop: 4,
  },
  ic_title: {
    width: 14,
    height: 14,
  },
  container_title_content2: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },

  container_title_content: {
    flexDirection: 'column',
    gap: 4,
  },
  img: {
    height: 220,
    width: '100%',
    borderRadius: 6,
    flexShrink: 0,
  },
  container_title: {
    marginTop: 16,
    padding: 8,
    flexDirection: 'column',
    gap: 8,
    borderRadius: 6,
  },
  conatiner_trending: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  txt_trending: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.12,
  },
  conatiner: {
    padding: 24,
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%',
  },
  ic: {
    width: 24,
    height: 24,
  },
});
