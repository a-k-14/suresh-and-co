import { Linking } from 'react-native';

export async function callPhone(phone: string) {
  await Linking.openURL(`tel:${phone}`);
}

export async function openEmail(
  to: string,
  subject?: string,
  body?: string,
) {
  const params = new URLSearchParams();
  if (subject) params.append('subject', subject);
  if (body) params.append('body', body);
  const query = params.toString();
  await Linking.openURL(`mailto:${to}${query ? `?${query}` : ''}`);
}

export async function openUrl(url: string) {
  const supported = await Linking.canOpenURL(url);
  if (supported) await Linking.openURL(url);
}

export async function openMaps(address: string) {
  const encoded = encodeURIComponent(address);
  await Linking.openURL(`https://maps.google.com/?q=${encoded}`);
}
