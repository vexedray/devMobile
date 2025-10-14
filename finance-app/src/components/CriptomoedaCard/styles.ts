import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../styles/theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SIZES.medium,
    marginVertical: SIZES.small,
    marginHorizontal: SIZES.medium,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.small,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  code: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '600',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  variationContainer: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    paddingHorizontal: SIZES.small,
    paddingVertical: 4,
  },
  variationText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  positive: {
    color: COLORS.green,
  },
  negative: {
    color: COLORS.red,
  },
});