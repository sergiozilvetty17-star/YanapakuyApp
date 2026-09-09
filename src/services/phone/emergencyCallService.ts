import { Linking } from 'react-native';

export async function callEmergencyNumber(
  phoneNumber: string
): Promise<boolean> {
  const url = `tel:${phoneNumber}`;

  try {
    const supported = await Linking.canOpenURL(url);

    if (!supported) {
      return false;
    }

    await Linking.openURL(url);
    return true;
  } catch {
    return false;
  }
}