import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button } from 'react-native';


WebBrowser.maybeCompleteAuthSession();
const CLIENT_ID = process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID
console.log('CLIENT_ID:', CLIENT_ID);

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/' + CLIENT_ID,
};

console.log(discovery.revocationEndpoint)
export default function App() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'calc.noir'
      }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log(code)
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
