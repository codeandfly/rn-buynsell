import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import AppText from '../components/AppText';
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import ContactSellerForm from '../components/ContactSellerForm';

function ListingDetailsScreen({ route }) {
  const listing = route.params;
  console.log(listing.images[0]);
  return (
    <KeyboardAvoidingView
      behavior="position"
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
    >
      <Image
        style={styles.image}
        preview={{ uri: listing.images[0].thumbnailUrl }}
        tint="light"
        uri={listing.images[0].url}
      />
      <View style={styles.detaitsContainer}>
        <AppText style={styles.title}>{listing.title}</AppText>
        <AppText style={styles.price}>${listing.price}</AppText>
        <View style={styles.userContainer}>
          <ListItem
            image={require('../assets/louis.png')}
            title="Louis Wong"
            subTitle="3 Listings"
          />
        </View>
        <ContactSellerForm listing={listing} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  detaitsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  price: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 8,
  },
  userContainer: {
    marginVertical: 20,
  },
});

export default ListingDetailsScreen;
